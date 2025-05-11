const cartService = require('../services/cartService');

exports.getCart = async (req, res) => {
    // Check for authenticated user
    if (!req.isAuthenticated()) {
        return res.render('pages/users/unauthenticated', { title: 'Unauthenticated' });
    }

    const cart = await cartService.getCart(req.user.id);
    const totalPrice = await cartService.totalPrice(req.user.id);
    
    console.log(JSON.stringify(cart, null, 2));
    res.render('pages/products/cart', { title: 'Cart', cart : cart, totalPrice : totalPrice});
}

exports.increaseQuantity = async (req, res) => {
    const { productId } = req.body;
    try {
        const newQuantity = await cartService.increaseQuantity(req.user.id, productId);
        if (newQuantity < 0){
            return res.status(500).json('Error descreasing quantity');
        }
        const totalPrice = await cartService.totalPrice(req.user.id);
        if (totalPrice <0 ){
            return res.status(500).json('Error re-calculating total price');
        }
        res.status(200).json({quantity: newQuantity,  totalPrice : totalPrice });
    } catch (err) {
        console.error('Error increasing quantity:', err);
        res.status(500).send('Internal Server Error');
    }
};
  
exports.removeFromCart = async (req, res) => {
    console.log(req.body);
    const { productId } = req.body;
    try {
        console.log(`Removing product ${productId} from cart on behalf of user ${req.user.id}`);
        await cartService.removeFromCart(req.user.id, productId);
        const totalPrice = await cartService.totalPrice(req.user.id);
        console.log(`Total: ${totalPrice}`);
        if (totalPrice < 0){
            return res.status(500).json("Error removing item from cart");
        }
        res.status(200).json({ totalPrice : totalPrice });
    }
    catch (err) {
        console.error('Error removing product from cart:', err);
        res.status(500).json('Internal Server Error');
    }
};
  
exports.decreaseQuantity = async (req, res) => {
    const { productId } = req.body;
    try {
        const newQuantity=  await cartService.decreaseQuantity(req.user.id, productId);
        if (newQuantity < 0){
            return res.status(500).json('Error descreasing quantity');
        }
        const totalPrice = await cartService.totalPrice(req.user.id);
        if (totalPrice < 0 ){
            return res.status(500).json('Error re-calculating total price');
        }
        res.status(200).json({quantity: newQuantity,  totalPrice : totalPrice });
    } catch (err) {
        console.error('Error decreasing quantity:', err);
        return res.status(500).json('Internal Server Error');
    }
};

exports.countAll = async (req, res) => {
    if (!req.isAuthenticated()){
        return res.status(401).json('Please sign in to add products to cart');
    }

    try {
        const result = {
            count : await cartService.countAll(req.user.id),
        }
        return res.status(200).json(result);
    } catch (err) {
        console.error('Error counting products in cart:', err);
        res.status(500).send('Internal Server Error');
    }
};

exports.addToCart = async (req, res) => {
    if (!req.isAuthenticated()){
        return res.status(401).json('Please sign in to add products to cart');
    }

    const productId = parseInt(req.body.productId);
    console.log(productId)
    try {
        await cartService.addProductToCart(req.user.id, productId, 1);
        const result = {
            count : await cartService.countAll(req.user.id),
        }
        return res.status(200).json(result);
    } catch (err) {
        console.error('Error adding product to cart:', err);
        res.status(500).send('Internal Server Error');
    }
}


