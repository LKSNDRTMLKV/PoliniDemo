import Product from '../models/productModel.js';
import catchAsyncErrors from '../middleware/catchAsyncErrors.js';
import ErrorHandler from '../utils/errorHandler.js';
import successHandler from '../utils/successHandler.js';
import ApiFeatures from '../utils/apiFeatures.js';
import cloudinary from 'cloudinary';
import messageHandler from '../utils/messageHandler.js';

const {
    PRODUCT_CREATE,
    PRODUCT_FOUND,
    PRODUCTS_FOUND,
    PRODUCT_NOT_FOUND,
    PRODUCT_LENGTH,
    PRODUCT_UPDATE,
    PRODUCT_DELETE,
    REVIEW,
    REVIEW_LENGTH,
    REVIEW_DELETE
} = messageHandler.productMessages;

//Create --Admin
const createProduct = catchAsyncErrors(async (req, res, next) => {
    let images = [];
    let imagesCloud = [];

    if (typeof req.body.images === 'string') {
        images.push(req.body.images);
    }
    else {
        images = req.body.images;
    }

    for (let i = 0; i < images.length; i++) {
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

    successHandler(res, 201, product, PRODUCT_CREATE);
});

const getProducts = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 12;
    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
    // .pagination(resultPerPage);


    apiFeature.pagination(resultPerPage);

    let products = await apiFeature.query;
    let filteredProductsCount = products.length;

    let paginationCount = Math.ceil(filteredProductsCount / resultPerPage);

    successHandler(res, 200, {
        products,
        productsCount,
        resultPerPage,
        paginationCount,
        filteredProductsCount,
    }, PRODUCTS_FOUND);
})

//Get All --Admin
const getAllProducts = catchAsyncErrors(async (req, res, next) => {
    const products = await Product.find();

    successHandler(res, 200, products, PRODUCT_LENGTH(products.length));
});

//Get One
const getProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler(PRODUCT_NOT_FOUND(req.params.id), 404))
    }

    successHandler(res, 200, product, PRODUCT_FOUND);
})

//Update --Admin
const updateProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!product) {
        return next(new ErrorHandler(PRODUCT_NOT_FOUND(req.params.id), 404))
    }

    successHandler(res, 200, product, PRODUCT_UPDATE);
})

// Delete --Admin
const deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
        return next(new ErrorHandler(PRODUCT_NOT_FOUND(req.params.id), 404));
    }

    successHandler(res, 200, product, PRODUCT_DELETE);
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

    successHandler(res, 200, product.reviews, REVIEW)
});

const getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler(PRODUCT_NOT_FOUND(req.query.productId), 404));
    }

    successHandler(res, 200,  product.reviews, REVIEW_LENGTH( product.reviews.length));
});

const deleteProductReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler(PRODUCT_NOT_FOUND(req.query.productId), 404));
    }

    const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString());
    const numberOfReviews = reviews.length;

    let sum = 0;
    reviews.forEach(rev => {
        sum += rev.rating;
    });

    let rating = 0;
    if (numberOfReviews !== 0) {
        rating = sum / numberOfReviews;
    }

    await Product.findByIdAndUpdate(
        req.query.productId, {
        reviews,
        rating,
        numberOfReviews,
    }, {
        new: true,
        runValidators: true,
    });

    successHandler(res, 200, product.reviews, REVIEW_DELETE);
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