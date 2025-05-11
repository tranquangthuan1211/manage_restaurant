const express = require('express');
const path = require('path');
const { sequelize } = require('./models');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const indexRoutes = require('./routes/indexRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const teamRoutes = require('./routes/teamRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const contactRoutes = require('./routes/contactRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

const adminRoutes = require('./routes/admin/adminRoutes');
const adminOrdersRouter = require('./routes/admin/adminOrders');


const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport Config
require('./config/passport')(passport);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


// After session middleware
app.use(flash());

// Global variables
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

app.set(expressLayouts);
app.set('layout', './layouts/page_layout'); // Default layout
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', indexRoutes)
app.use('/about', aboutRoutes);
app.use('/team', teamRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/testimonial', testimonialRoutes);
app.use('/contact', contactRoutes);
app.use('/service', serviceRoutes);
app.use('/booking', bookingRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);
app.use('/orders', orderRoutes);
app.use('/admin', adminRoutes);
app.use(express.static('public'));
app.use('/admin', adminOrdersRouter);
app.get("/", indexRoutes);

const PORT = process.env.PORT || 10000;

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});