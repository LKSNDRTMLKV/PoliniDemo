import Product from '../models/productModel.js';
import catchAsyncErrors from '../middleware/catchAsyncErrors.js';
import ErrorHandler from '../utils/errorHandler.js';
import successHandler from '../utils/successHandler.js';
import ApiFeatures from '../utils/apiFeatures.js';
import cloudinary from 'cloudinary';



//Create --Admin
const createProduct = catchAsyncErrors(async (req, res, next) => {
    

    let images = [];
    let imagesCloud = [];

    if(typeof req.body.images === 'string'){
        images.push(req.body.images);
    }
    else {
        images = req.body.images;
    }

    for(let i = 0; i < images.length; i++) {
        const cloud = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
        });

        imagesCloud.push({
            public_id: cloud.public_id,
            url: cloud.secure_url,
        });
    }

    req.body.images = imagesCloud;
    req.body.user = req.user.id;

    const product = await Product.create(req.body);



    res.status(201).json({
        success: true,
        product
    })
})

const getProducts = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 12;
    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
    let products = await apiFeature.query;
    
    let filteredProductsCount = products.length;

    let paginationCount = Math.ceil(productsCount / resultPerPage);

    res.status(200).json({
        success: true,
        productsCount,
        resultPerPage,
        paginationCount,
        filteredProductsCount,
        products,
    })

})

//Get All --Admin
const getAllProducts = catchAsyncErrors(async (req, res, next) => {
    const products = await Product.find();
    // successHandler(res,200,products);
    res.status(200).json({
        success: true,
        message: `Currently there are ${products.length} products`,
        products
    })
})

//Get One
const getProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404))

    }
    res.status(200).json({
        success: true,
        product
    })

})

//Update --Admin

const updateProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!product) {
        // return res.status(500).json({
        //     success: false,
        //     message: "Product not found"
        // })
        return next(new ErrorHandler("Product not found", 404))
    }
    res.status(200).json({
        success: true,
        message: "Product updated successfully",
        product
    })
})

// Delete --Admin

const deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
        // return res.status(500).json({
        //     success: false,
        //     message: "Product not found"
        // })
        return next(new ErrorHandler("Product not found"), 404);
    }
    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    });
});

const reviewProduct = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId, } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString());

    if (isReviewed) {
        product.reviews.forEach(rev => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.rating = rating;
                rev.comment = comment;
            }
        })
    }
    else {
        product.reviews.push(review);
        product.numberOfReviews = product.reviews.length;
    }

    let sum = 0;

    product.reviews.forEach(rev => {
        sum += rev.rating;
    })
    product.rating = sum / product.reviews.length;


    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        reviews: product
    });
});

const getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product not found"), 404);
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    });
});

const deleteProductReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product not found"), 404);
    }

    const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString());

    let sum = 0;
    reviews.forEach(rev => {
        sum += rev.rating;
    })

    let rating = 0;
    if(reviews.length !== 0) {
        rating = sum / reviews.length;
    }

    const numberOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
        req.query.productId, {
        reviews,
        rating,
        numberOfReviews,
    }, {
        new: true,
        runValidators: true,
    })

    res.status(200).json({
        success: true,
    });
});

const productController = {
    getProducts,
    getAllProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    reviewProduct,
    getProductReviews,
    deleteProductReview
};

export default productController;