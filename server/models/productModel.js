import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
    },
    description: {
        type: String,
        required: [true, "Please enter product description"],
    },
    price: {
        type: Number,
        required: [true, "Please enter product price"],
        maxLength: [8, "Price cannot exceed 8 characters"]
    },
    discount: {
        type: Number,
        default: 0,
        maxLength: 2
    },

    rating: {
        type: Number,
        default: 0,
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],
    category: {
        type: String,
        required: [true, "Please enter product category"],
    },
    brand: {
        type: String,
        required: [true, "Please enter product brand"],
    },
    sizes: {
        type: Array,
        required: true,
    },
    sex: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: [true, "Please enter product stock"],
        maxLength: [4, "Stock cannot exceed 4 characters"],
        default: 1,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            }
        }
    ],
    numberOfReviews: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel;