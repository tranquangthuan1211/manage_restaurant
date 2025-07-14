const userService = require('../services/userService');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models').User;
const { Op } = require('sequelize');
const { Cart } = require('../models')

exports.authenticateUser = async (req, res, next) => {
  passport.authenticate('local', async(err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    console.log("User: ", user);
    const existingCart = await Cart.findOne({ where: { userId: user.id } });
    console.log("Existing cart: ", existingCart);
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Internal server error' });
      }
      if (user.status === 'inactive') {
        return res.status(401).json({ message: 'User is inactive' });
      }
      
      return res.status(200).json({ success: true, user: user });
    });
  })(req, res, next);
}

exports.registerUser = async (req, res) => {
  const formDataObject = req.body;
  const err = { name: '', email: '', password: '', confirmPassword: '' };

  // Preprocess
  if (formDataObject.name) {
    formDataObject.name = formDataObject.name.trim();
  }
  if (formDataObject.email) {
    formDataObject.email = formDataObject.email.trim();
  }

  // Validation
  if (!formDataObject.name || formDataObject.name === '') {
    err.name = 'Name is required';
    return res.status(400).json(err); // Use return here
  }

  if (!formDataObject.email || formDataObject.email === '') {
    err.email = 'Email is required';
    return res.status(400).json(err); // Use return here
  }

  if (!formDataObject.password || formDataObject.password === '') {
    err.password = 'Password is required';
    return res.status(400).json(err); // Use return here
  }

  if (formDataObject.password && formDataObject.password.length < 6) {
    err.password = 'Password must be at least 6 characters';
    return res.status(400).json(err); // Use return here
  }

  if (!formDataObject.confirmPassword || formDataObject.confirmPassword === '') {
    err.confirmPassword = 'Password confirmation is required';
    return res.status(400).json(err); // Use return here
  }

  if (formDataObject.password !== formDataObject.confirmPassword) {
    err.confirmPassword = 'Password confirmation does not match';
    return res.status(400).json(err); // Use return here
  }

  try {
    const existingUser = await userService.findUserByEmail(formDataObject.email);
    if (existingUser) {
      err.email = "Email is already in use";
      return res.status(400).json(err);
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(formDataObject.password, salt);

    const userData = { name: formDataObject.name, email: formDataObject.email, hashedPassword: hashedPassword,role:"admin" }
    await userService.createUser(userData);

    // Send the success page as a response
    // Won't work, can't render on a fetch request
    return res.status(200).json({ message: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userService.findUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}

exports.updateUserById = async (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  if (updatedUser.id && updatedUser.id !== userId) {
    return res.status(400).json({ message: 'Bad request' });
  }
  try {
    if (await userService.updateUserById(userId, updatedUser) < 0) {
      return res.status(500).json({ message: 'Error updating user' });
    }
    return res.status(200).json({ message: 'User updated' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}

exports.changePassword = async (req, res) => {
  try {
    const userId = req.params.id;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    if (oldPassword == newPassword) {
      return res.status(500).json({ message: 'New password cannot be the same as the old password' });
    }
    const user = await userService.findUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    const updatedUser = { password: hashedPassword };
    if (await userService.updateUserById(userId, updatedUser) < 0) {
      return res.status(500).json({ message: 'Error updating user' });
    }
    return res.status(200).json({ message: 'Password updated' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};


exports.getUserAccounts = async (req, res) => {
  try {
    const { page = 1, status } = req.query;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'DESC';
    // search by name or email
    const search = req.query.search;

    const dbFilter = {};
    dbFilter.where = {};
    if (status) {
      dbFilter.where.status = status;
    }
    if (search) {
      dbFilter.where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } }
      ];
    }
    dbFilter.order = [[sort, order]];
    dbFilter.limit = limit;
    dbFilter.offset = offset;

    const usersResult = await User.findAndCountAll(dbFilter);
    const totalUsers = usersResult.count;
    const users = usersResult.rows;

    const totalPages = Math.ceil(totalUsers / limit);

    if (req.xhr) {
      return res.json({ users, totalPages, currentPage: page });
    }

    const queryData = { page, limit };
    if (status) {
      queryData.status = status;
    }
    if (sort){
      queryData.sort = sort;
    }
    if (order){
      queryData.order = order;
    }
    if (search){
      queryData.search = search;
    }


    const queryString = new URLSearchParams(queryData).toString();

    res.render("admin/accounts", {
      users: users,
      title: "Admin Accounts",
      layout: "./layouts/admin/admin_page_layout",
      totalPages,
      currentPage: page,
      queryData: queryData,
      queryString: queryString,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.updateAccountStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    if (userId === req.user.id) {
      return res.status(400).json({ message: 'Cannot update your own status' });
    }
    const status = req.body.status;
    const updatedUser = { status: status };
    if (await userService.updateUserById(userId, updatedUser) < 0) {
      console.log("Error updating user");
      return res.status(500).json({ message: 'Error updating user' });
    }
    return res.status(200).json({ message: 'User updated' });
  } catch (err) {
    console.error("Error: ", err);
    return res.status(500).json({ message: 'Server error' });
  }
}