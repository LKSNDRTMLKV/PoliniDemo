import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import DescriptionIcon from '@mui/icons-material/Description';
import GroupIcon from '@mui/icons-material/Group';
import RateReviewIcon from '@mui/icons-material/RateReview';

export const menuItems = [
    {
        name: "Машки",
        path: "/",
        items: [
            {
                name: "Кондури",
                path: "/products?sex=male&category=shoes",
            },
            {
                name: "Патики",
                path: "/products?sex=male&category=sneakers",
            },
            {
                name: "Чизми",
                path: "/products?sex=male&category=boots",
            },
            {
                name: "Елегантни",
                path: "/products?sex=male&category=elegant",
            },
            {
                name: "Сандали",
                path: "/products?sex=male&category=sandals",
            },
            {
                name: "Мокасини",
                path: "/products?sex=male&category=moccasins",
            },
            {
                name: "Папучи",
                path: "/products?sex=male&category=slippers",
            },
            {
                name: "Водоотпорни",
                path: "/products?sex=male&category=waterproof",
            },
            {
                name: "Сите",
                path: "/products?sex=male",
            },
        ]
    },
    {
        name: "Женски",
        path: "",
        items: [
            {
                name: "Кондури",
                path: "/products?sex=female&category=shoes",
            },
            {
                name: "Патики",
                path: "/products?sex=female&category=sneakers",
            },
            {
                name: "Чизми",
                path: "/products?sex=female&category=boots",
            },
            {
                name: "Елегантни",
                path: "/products?sex=female&category=elegant",
            },
            {
                name: "Сандали",
                path: "/products?sex=female&category=sandals",
            },
            {
                name: "Мокасини",
                path: "/products?sex=female&category=moccasins",
            },
            {
                name: "Папучи",
                path: "/products?sex=female&category=slippers",
            },
            {
                name: "Водоотпорни",
                path: "/products?sex=female&category=waterproof",
            },
            {
                name: "Високи Потпетници",
                path: "/products?sex=female&category=high-heels",
            },
            {
                name: "Сите",
                path: "/products?sex=female",
            },
        ]
    },
    {
        name: "Детски",
        path: "",
        items: [
            {
                name: "Кондури",
                path: "/products?sex=children&category=shoes",
            },
            {
                name: "Патики",
                path: "/products?sex=children&category=sneakers",
            },
            {
                name: "Чизми",
                path: "/products?sex=children&category=boots",
            },
            {
                name: "Сите",
                path: "/products?sex=children",
            },
        ]
    },
    {
        name: "Брендови",
        path: "",
        items: [
            {
                name: "Denouee",
                path: "/products?brand=denouee",
            },
            {
                name: "Franzini",
                path: "/products?brand=franzini",
            },
            {
                name: "Gioseppo Man",
                path: "/products?brand=gioseppo-men",
            },
            {
                name: "Gioseppo Woman",
                path: "/products?brand=gioseppo-women",
            },
            {
                name: "Hispanitas",
                path: "/products?brand=hispanitas",
            },
            {
                name: "Imac",
                path: "/products?brand=imac",
            },
            {
                name: "Kebo",
                path: "/products?brand=kebo",
            },
            {
                name: "Lady Shoes",
                path: "/products?brand=lady-shoes",
            },
            {
                name: "Lamica",
                path: "/products?brand=lamica",
            },
            {
                name: "Lodi",
                path: "/products?brand=lodi",
            },
            {
                name: "Napoleoni",
                path: "/products?brand=napoleoni",
            },
            {
                name: "Nuova Cuoieria",
                path: "/products?brand=nuova-cuoieria",
            },
            {
                name: "Parrotto",
                path: "/products?brand=parrotto",
            },
            {
                name: "S & G Boots and Shoes",
                path: "/products?brand=s&g-boots-and-shoes",
            },
            {
                name: "Salamander",
                path: "/products?brand=salamander",
            },
            {
                name: "Status",
                path: "/products?brand=status",
            },
            {
                name: "T-Progetto",
                path: "/products?brand=t-progetto",
            },
            {
                name: "Unisa",
                path: "/products?brand=unisa",
            },
        ]
    },
    {
        name: "Додатоци",
        path: "",
        items: [
            {
                name: "Машки Каиши",
                path: "/products?sex=male&category=belts",
            },
            {
                name: "Женски Каиши",
                path: "/products?sex=female&category=belts",
            },
            {
                name: "Машки Ташни",
                path: "/products?sex=male&category=bags",
            },
            {
                name: "Женски Ташни",
                path: "/products?sex=female&category=belts",
            },
            {
                name: "Сите",
                path: "/products?category=belts%26bags",
            },
        ]
    },
    // {
    //     name: "Попусти",
    //     path: "/discounts",
    // },
    // {
    //     name: "За Нас",
    //     path: "",
    // },
    // {
    //     name: "Контакт",
    //     path: "",
    // },
]

// export const settingItems = [
//     {
//         icon: mode === "light" ? <Brightness3Icon /> : <Brightness7Icon />,
//         name:
//     },
// ]

export const accountItems = [
    {
        name: "Најава",
        path: "/login",
    },
    // {
    //     name: "Регистрација",
    //     path: "/register",
    // }
]

export const adminItems = [
    {
        name: "dashboard",
        path: "/admin/dashboard",
        icon: <DashboardIcon color="toggledPrimarySecondary" />,
        items:[{
            name: "table",
            path: "/admin/dashboard",
        },
        {
            name:"charts",
            path:"/admin/charts"
        }
    ]
    },
    {
        name: "products",
        path: "/admin/products",
        icon: <InventoryIcon color="toggledPrimarySecondary" />,
        items: [
            {
                name:"list",
                path:"/admin/products",
            },
            {
                name:"new",
                path:"/admin/product/new",
            },
            {
                name:"update",
                path:"/admin/product/"
            }
        ]
    },

    {
        name:"orders",
        icon: <DescriptionIcon color="toggledPrimarySecondary" />,
        items: [
            {
                name:"list",
                path:"/admin/orders",
            },
            {
                name:"new",
                path:"/admin/order/new"
            },
            {
                name:"update",
                path:"/admin/order/",
            },
            
        ]
    },

    {
        name: "users",
        icon: <GroupIcon color="toggledPrimarySecondary" />,
        items: [
            {
                name: "list",
                path: "/admin/users",
            },
            {
                name: "new",
                path: "/admin/users/new",
            },
            {
                name:"update",
                path:"/admin/user/",
            }
        ]
    },
    {
        name: "reviews",
        icon: <RateReviewIcon color="toggledPrimarySecondary" />,
        items: [
            {
                name: "list",
                path: "/admin/reviews",
            }
        ]
    },
]