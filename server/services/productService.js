const { product } = require('../models');
const { Op, Sequelize } = require('sequelize');
const { Review, User } = require('../models');

exports.getCategories = async () => {
    // Category attribute is an array of categories
    const products = await product.findAll({
        attributes: ['category'],
        raw: true
    });
    const categories = [...new Set(products.map(product => product.category).flat())];
    return categories;
};

// Merging both pagination and filter functionality
exports.getProductsByQuery = (queryData) => {
    const { pagination, filter } = queryData;

    const dbFilter = {}
    // Pagination
    if (pagination) {
        if (pagination.currentPage && pagination.pageSize) {
            dbFilter.offset = (pagination.currentPage - 1) * pagination.pageSize;
            dbFilter.limit = pagination.pageSize;
        }
    }
    // Search and dbFilter
    if (filter) {
        dbFilter.where = {};
        if (filter.name && filter.name.length > 0) {
            dbFilter.where.name = { [Op.iLike]: `%${filter.name}%` };
        }
        if (filter.description && filter.description.length > 0) {
            dbFilter.where.description = { [Op.iLike]: `%${filter.description}%` };
        }
        if (filter.minPrice && filter.minPrice >= 0) {
            dbFilter.where.price = { ...dbFilter.where.price, [Op.gte]: filter.minPrice };
        }
        if (filter.maxPrice && filter.maxPrice >= 0) {
            dbFilter.where.price = { ...dbFilter.where.price, [Op.lte]: filter.maxPrice };
        }
        if (filter.category) {
            // Whether an array or a string of categories joined by commas, convert to an array of categories
            const categories = Array.isArray(filter.category)
                ? filter.category
                : (typeof filter.category === 'string'
                    ? filter.category.split(',').map(cat => cat.trim())
                    : []);
            let op = Op.contains; // Default operator
            if (filter.category_op) {
                if (filter.category_op == 'contains') {
                    op = Op.contains;
                } else if (filter.category_op == 'overlap') {
                    op = Op.overlap;
                }
            }

            if (categories.length > 0) {
                dbFilter.where.category = {
                    [op]: Sequelize.literal(`ARRAY['${categories.join("','")}']::varchar[]`)
                };
            }
        }
        //dbFilter.order = [['id', 'ASC']];
        if (filter.sort && filter.sortOrder) {
            if (filter.sort == 'default') {
                dbFilter.order = [['id', 'ASC']];
            } else {
                dbFilter.order = [[filter.sort, filter.sortOrder.toUpperCase()]];
            }
        }

        // Exclude the current product
        if (filter.excludeId) {
            dbFilter.where.id = { [Op.ne]: filter.excludeId };  // Usually we want to exclude the current product
        }
    }

    return product.findAndCountAll(dbFilter);
}

exports.getProductReviewsById = async (productId, page = 1, pageSize = 5) => {
    const reviewsResult = await Review.findAndCountAll({
        where: { productId },
        include: [{
            model: User,
            attributes: ['id', 'name']
        }],
        order: [['createdAt', 'DESC']],
        offset: (page - 1) * pageSize,
        limit: pageSize,
        raw: true,
    });
    console.log(reviewsResult);
    return reviewsResult;
};

exports.getAllProducts = () => {
    return product.findAll(); // Fetch all products from the database
};

exports.getProductById = (id) => {
    return product.findByPk(id); // Use Product (uppercase) here
};

exports.updateProduct = async (prod) => {
    try {
        await product.update(prod, { where: { id: prod.id } });
        return 0;
    } catch (error) {
        return -1;
    }
}

exports.deleteProduct = async (id) => {
    try {
        await product.destroy({
            where: {
                id: id,
            },
        });
        return 0;
    }
    catch (error) {
        console.log(error.message || error);
        return -1;
    }
}

exports.createProduct = async (prod) => {
    try {
        if (prod.price) {
            prod.price = parseFloat(prod.price);
        }
        console.log(prod);
        await product.create(prod);
        return 0;
    } catch (error) {
        if (error instanceof Sequelize.ValidationError) {
            console.error('Validation errors:', error.errors.map(err => err.message));
        } else {
            console.error('Unexpected error:', error);
        }
    }
}

exports.getProductReviewByReviewId = async (reviewId) => {
    return Review.findByPk(reviewId);
};

exports.createProductReview = async (review) => {
    try {
        review.helpfulCount = 0;
        review.notHelpfulCount = 0;

        await Review.create(review);
        return 0;
    } catch (error) {
        console.log(error.message || error);
        return -1;
    }
}

exports.updateProductReview = async (review) => {
    try {
        await Review.update(review, { where: { id: review.id } });
        return 0;
    } catch (error) {
        console.log(error.message || error);
        return -1;
    }
};