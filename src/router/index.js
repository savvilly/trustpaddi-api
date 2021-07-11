import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Signup_seller from "../views/Signup_seller.vue";
import Signup_buyer from "../views/Signup_buyer.vue";
import Signin from "../views/Signin.vue";
import Forgot_password from "../views/Forgot_password.vue";
import Otp from "../views/Otp.vue";
import About from "../views/About.vue";
import Faq from "../views/Faq.vue";
import Good_and_prodict_buyer from "../views/Good_and_prodict_buyer.vue";
import Seller_Email from "../components/good_and_prodict_buyer/components/Seller_Email.vue";
import Seller_phone_number from "../components/good_and_prodict_buyer/components/Sellers_phone_number.vue";
import Product_name from "../components/good_and_prodict_buyer/components/Product_name.vue";
import Product_price from "../components/good_and_prodict_buyer/components/Product_price.vue";
import Product_description from "../components/good_and_prodict_buyer/components/Product_description.vue";
import Condition from "../components/good_and_prodict_buyer/components/Condition.vue";
import Handle_delivery from "../components/good_and_prodict_buyer/components/Handle_delivery.vue";
import Delivery_info from "../views/Delivery_info.vue";
import Delivery_info_product_name from "../components/delivery_info/components/Product_name.vue";
import Product_size from "../components/delivery_info/components/Product_size.vue";
import Product_image from "../components/delivery_info/components/Product_image.vue";
import Residential_address from "../components/delivery_info/components/Residential_address.vue";
import State_address from "../components/delivery_info/components/State_address.vue";
import Good_and_prodict_seller from "../views/Good_and_prodict_seller.vue";
import Buyers_email from "../components/good_and_prodict_seller/components/Buyers_email.vue";
import Buyers_phone from "../components/good_and_prodict_seller/components/Buyers_phone.vue"
import Buyers_transaction_title from "../components/good_and_prodict_seller/components/Transction_title.vue"
import Buyers_product_description from "../components/good_and_prodict_seller/components/Buyers_product_description.vue"
import Buyers_agreed_price from "../components/good_and_prodict_seller/components/Agreed_price.vue"
import Buyers_product_photo from "../components/good_and_prodict_seller/components/Buyers_product_photo.vue"
import Buyers_product_condition from "../components/good_and_prodict_seller/components/Buyers_product_condition.vue"
import Buyers_product_image from "../components/good_and_prodict_seller/components/Buyers_product_image.vue"
import custumer_crypto from "../views/Custumer_crypto.vue"
import Traders_email from "../components/custumer_crypto/components/Traders_email.vue"
import Traders_phone from "../components/custumer_crypto/components/Traders_phone.vue"
import Traders_currency from "../components/custumer_crypto/components/Traders_currency.vue"
import Traders_amount from "../components/custumer_crypto/components/Traders_amount.vue"
import Traders_price from "../components/custumer_crypto/components/Traders_price.vue"
import Traders_transaction_duration from "../components/custumer_crypto/components/Traders_transaction_duration.vue"
import Traders_wallet_address from "../components/custumer_crypto/components/Traders_wallet_address.vue"
import Trader_crypto from "../views/Trader_crypto.vue"

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/signup_seller",
        name: "signup_seller",
        component: Signup_seller,
    },
    {
        path: "/signup_buyer",
        name: "Signup_buyer",
        component: Signup_buyer,
    },
    {
        path: "/signin",
        name: "signin",
        component: Signin,
    },
    {
        path: "/forgot_password",
        name: "forgot_password",
        component: Forgot_password,
    },
    {
        path: "/otp",
        name: "Otp",
        component: Otp,
    },
    {
        path: "/faq",
        name: "faq",
        component: Faq,
    },
    {
        path: "/good_and_product_buyer",
        name: "good_and_prodict_buyer",
        component: Good_and_prodict_buyer,
        children: [{
                path: "",
                name: "seller email",
                component: Seller_Email,
            },
            {
                path: "seller_phone_number",
                name: "seller phone number",
                component: Seller_phone_number,
            },
            {
                path: "product_name",
                name: "seller phone number",
                component: Product_name,
            },
            {
                path: "product_price",
                name: "product price",
                component: Product_price,
            },
            {
                path: "product_description",
                name: "product description",
                component: Product_description,
            },
            {
                path: "condition",
                name: "product condition",
                component: Condition,
            },
            {
                path: "handle_delivery",
                name: "handle delivery",
                component: Handle_delivery,
            },
        ],
    },
    {
        path: "/delivery_info",
        name: "delivery_info",
        component: Delivery_info,
        children: [{
                path: "",
                name: "delivery info product name",
                component: Delivery_info_product_name,
            },
            {
                path: "product_size",
                name: "product size",
                component: Product_size,
            },
            {
                path: "product_image",
                name: "product image",
                component: Product_image,
            },
            {
                path: "residential_address",
                name: "residential address",
                component: Residential_address,
            },
            {
                path: "state_address",
                name: "state address",
                component: State_address,
            },
        ],
    },
    {
        path: "/good_and_prodict_seller",
        name: "good and prodict seller",
        component: Good_and_prodict_seller,
        children: [{
                path: "",
                name: "buyers email",
                component: Buyers_email,
            },
            {
                path: "buyers_phone",
                name: "buyers phone",
                component: Buyers_phone,
            },
            {
                path: "transaction_title",
                name: "buyers transaction title",
                component: Buyers_transaction_title,
            },
            {
                path: "buyers_product_description",
                name: "buyers product description",
                component: Buyers_product_description,
            },
            {
                path: "buyers_agreed_price",
                name: "buyers agreed price",
                component: Buyers_agreed_price,
            },
            {
                path: "buyers_product_photo",
                name: "buyers product photo",
                component: Buyers_product_photo,
            },
            {
                path: "buyers_product_condition",
                name: "buyers product condition",
                component: Buyers_product_condition,
            },
            {
                path: "buyers_product_image",
                name: "buyers product image",
                component: Buyers_product_image,
            },
        ],
    },
    {
        path: "/custumer_crypto",
        name: "trade crypto",
        component: custumer_crypto,
        children: [{
            path: "",
            name: "traders email",
            component: Traders_email
        }, {
            path: "traders_phone",
            name: "traders phone",
            component: Traders_phone
        }, {
            path: "traders_currency",
            name: "traders currency",
            component: Traders_currency
        }, {
            path: "traders_amount",
            name: "traders amount",
            component: Traders_amount
        }, {
            path: "traders_price",
            name: "traders price",
            component: Traders_price
        }, {
            path: "traders_transaction_duration",
            name: "traders transaction duration",
            component: Traders_transaction_duration
        }, {
            path: "traders_wallet_address",
            name: "traders wallet address",
            component: Traders_wallet_address
        }]
    },
    {
        path: "/trader_crypto",
        name: "trader_crypto",
        component: Trader_crypto,
    },
    {
        path: "/about",
        name: "About",
        component: About,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;