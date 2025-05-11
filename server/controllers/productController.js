const productService = require('../services/productService');
const querystring = require('querystring');
const cartService = require('../services/cartService');
const cloudinary = require('cloudinary').v2;

exports.getProducts = async (req, res) => {
    const queryData = this.formQueryData(req);
    const resultProducts = await productService.getProductsByQuery(queryData);
    queryData.pagination.totalPages = Math.ceil(resultProducts.count / queryData.pagination.pageSize);
    const products = resultProducts.rows;
    const filterQueryString = querystring.stringify(queryData.filter);
    const categories = await productService.getCategories();
    let layout = "layouts/layout"; // Default is customer
    let url = "pages/products/index"; // Default is customer
    if (req.isAuthenticated() && req.user.role === "admin") {
        if (req.originalUrl === "/products") {
            layout = "layouts/layout";
            url = "pages/products/index";
        } else {
            layout = 'layouts/admin/admin_page_layout';
            url = 'admin/products/index';
        }
    }
    res.render(url, { title: 'Products', layout: layout, products: products, queryData: queryData, filterQueryString: filterQueryString, categories: categories });
}

exports.formQueryData = (req) => {
    const defaultPageSize = (req.isAuthenticated() && req.user.role === "admin") ? 8 : 8;
    const queryData = {
        pagination: {
            currentPage: req.query.page ? parseInt(req.query.page) : 1,
            pageSize: req.query.pageSize ? parseInt(req.query.pageSize) : defaultPageSize,
            totalPages: 0
        },
        filter: {
            minPrice: req.query.minPrice ? parseFloat(req.query.minPrice) : -1,
            maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice) : -1,
            description: req.query.description ? req.query.description : "",
            name: req.query.name ? req.query.name : "",
            category: req.query.category ? req.query.category : "",
            category_op: req.query.category_op ? req.query.category_op : "contains",
            sort: req.query.sort ? req.query.sort : "default",
            sortOrder: req.query.sortOrder ? req.query.sortOrder : "asc"
        }
    };
    // Preprocess the query data
    // Swap minPrice and maxPrice if minPrice > maxPrice
    if (queryData.filter.minPrice >= 0 && queryData.filter.maxPrice >= 0 && queryData.filter.minPrice > queryData.filter.maxPrice) {
        const temp = queryData.filter.minPrice; queryData.filter.minPrice = queryData.filter.maxPrice; queryData.filter.maxPrice = temp;
    }
    return queryData;
}

exports.getProductsAjax = async (req, res) => {
    const queryData = this.formQueryData(req);
    const resultProducts = await productService.getProductsByQuery(queryData);
    queryData.pagination.totalPages = Math.ceil(resultProducts.count / queryData.pagination.pageSize);
    const products = resultProducts.rows;
    return res.status(200).json({ pagination: queryData.pagination, products: products });
}

exports.getProduct = async (req, res) => {
    console.log("Get product by id: " + req.params.id);
    const product = await productService.getProductById(req.params.id);
    // Get the first 10 reviews of the product
    const reviews = (await productService.getProductReviewsById(req.params.id, 1, 10)).rows;
    // There would be fields like "User.id" and "User.name" -> "userId" and "userIname"
    reviews.forEach(review => {
        review.userId = review['User.id'];
        review.userName = review['User.name'];
    });

    product.reviews = [];

    const maxRecommendations = 10;

    const queryData = {
        pagination: {
            currentPage: 1,
            pageSize: maxRecommendations,
            totalPages: 0
        },
        filter: {
            excludeId: product.id,
            category: product.category,
            category_op: "overlap"
        }
    };
    queryData.filter.excludeId = product.id;

    const recommendations = (await productService.getProductsByQuery(queryData)).rows;

    // Admin page
    if (req.isAuthenticated() && req.user.role === "admin") {
        res.render('admin/products/show', {
            title: product.name,
            product: product,
            layout: 'layouts/admin/admin_page_layout',
            recommendations: recommendations
        });
        return
    }
    res.render('pages/products/show', {
        title: product.name,
        product: product,
        layout: 'layouts/layout',
        recommendations: recommendations
    });
}

exports.updateProduct = async (req, res) => {
    try {
        const product = req.body;
        console.log(JSON.stringify(product, null, 2));
        if (productService.updateProduct(product) < 0) {
            res.status(400).json({
                error: "Bad Request"
            });
            return;
        }
        res.status(200).json({
            error: "OK"
        })
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        if (await productService.deleteProduct(id) < 0) {
            res.status(400).json({
                error: "Bad Request"
            });
            return;
        }
        res.status(200).json({
            error: "OK"
        })
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

exports.createProduct = async (req, res) => {
    try {
        const product = req.body;
        if (await productService.createProduct(product) < 0) {
            res.status(400).json({
                error: "Bad Request"
            });
            return;
        }
        res.status(200).json({
            error: "OK"
        })
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

exports.getSignature = async (req, res) => {
    try {
        const timestamp = Math.round(new Date().getTime() / 1000);
        const signature = cloudinary.utils.api_sign_request(
            {
                timestamp: timestamp
            },
            cloudinary.config().api_secret
        );
        res.status(200).json({ timestamp, signature });
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
};

exports.postProductReview = async (req, res) => {
    try{
        const review = req.body;
        review.productId = req.params.id;
        review.userId = req.user.id;
        if (await productService.createProductReview(review) < 0) {
            res.status(400).json({
                error: "Bad Request"
            });
            return;
        }
        res.status(200).json({
            error: "OK"
        })
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

exports.updateProductReviewHelpfulness = async (req, res) => {
    try {
        const {isHelpful} = req.body;
        const reviewId = req.params.id;

        console.log(JSON.stringify(isHelpful, null, 2));
        const review = await productService.getProductReviewByReviewId(reviewId);
        if (isHelpful){
            review.helpfulCount += 1;
        }
        else{
            review.notHelpfulCount += 1;
        }
        console.log(JSON.stringify(review, null, 2));
        review.save();

        res.status(200).json({
            error: "OK"
        })
    } catch (error) {
        console.log(error.message || error);
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
};