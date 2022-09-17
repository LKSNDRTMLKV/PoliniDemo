const API = {
    url: process.env.REACT_APP_API_URL,

    paths: {

        app: {
            home: "/",
            not_found: "*",
            login: "/login",
            register: "/register",
            not_logged:"/not_logged",
            restricted:"/restricted",
            account: "/account",
            cart:"/cart",
            notifications:"/notifications",
            favourites:"/favourites",
            contact:"/contact",
            products: "/products",
            productsQuery: "/products/:query",
            product: "/product",
            productId: "/product/:id",
            password: {
                forgot: "/password/forgot",
                reset: "/password/reset",
                update: "/password/update",
            },
            checkout: "/checkout",
        },

        // categories: {
        //     men: {
        //         shoes: "/men/shoes",
        //         sneakers: "/men/sneakers",
        //         boots: "/men/boots",
        //         elegant: "/men/elegant",
        //         sandals: "/men/sandals",
        //         moccasins: "men/moccasins",
        //         slippers: "/men/slippers",
        //         waterproof: "/men/waterproof",
        //         all: "men/all",
        //     },
        //     women: {
        //         shoes: "/women/shoes",
        //         sneakers: "/women/sneakers",
        //         boots: "/women/boots",
        //         elegant: "/women/elegant",
        //         sandals: "/women/sandals",
        //         moccasins: "women/moccasins",
        //         slippers: "/women/slippers",
        //         waterproof: "/women/waterproof",
        //         highHeels: "/women/high-heels",
        //         all: "women/all",
        //     },
        //     children: {
        //         shoes: "/children/shoes",
        //         sneakers: "/children/sneakers",
        //         boots: "/children/boots",
        //         all: "/children/all",
        //     },
        //     brands: {
        //         denouee: "/brand/denouee",
        //         franzini: "/brand/franzini",
        //         gioeppoMen: "/brand/gioseppo-men",
        //         gioeppoWomen: "/brand/gioseppo-women",
        //         hispanitas: "/brand/hispanitas",
        //         imac: "/brand/imac",
        //         kebo: "/brand/kebo",
        //         ladyShoes: "/brand/lady-shoes",
        //         lamica: "/brand/lamica",
        //         lodi: "/brand/lodi",
        //         napoleoni: "/brand/napoleoni",
        //         nuova: "/brand/nuova-cuoieria",
        //         parrotto: "/brand/parrotto",
        //         s_g: "/brand/s&g-boots-and-shoes",
        //         salamander: "/brand/salamander",
        //         status: "/brand/status",
        //         tProgetto: "/brand/t-progetto",
        //         unisa: "/brand/unisa",

        //     }
        // },
        footer: {
            about:"/information/about-us",
            delivery:"/information/delivery",
            privacy: "/information/privacy",
            use:"information/terms-of-use",
            cookies:"/information/cookies",
            marketing:"/information/marketing",
            reclamation:"/information/reclamation",

            brands:"products/manufacturers",
            gift: "/voucher",
            affiliate: "/affiliate",
            special: "/products/special",
            map: "/information/map",
            invoices:"/account/invoices",
            order:"/account/order-history",
            bulletin:"/information/bulletin",


        },

        admin: {
            dashboard:"/admin/dashboard",
            charts: "/admin/charts",
            products: "/admin/products",
            product: "/admin/product/",
            product_new: "/admin/product/new",
            product_id: "/admin/product/:id",
            orders: "/admin/orders",
            order: "/admin/order",
            order_new: "/admin/order/new",
            order_id: "/admin/order/:id",
            users: "/admin/users",
            user: "/admin/user",
            user_new: "/admin/user/new",
            user_id: "/admin/user/:id",
            reviews: "/admin/reviews",
            review: "/admin/review",
            review_id: "/admin/review/:id"
        }
    }
}

export default API;