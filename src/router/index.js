import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Header from '../views/Header.vue'
import LoginPage from '../views/LoginPage.vue'
import RegistrationPage from '../views/RegistrationPage.vue'
import AddMobile from '../views/AddMobile.vue'
import UpdateMobile from '../views/UpdateMobile.vue'
import UpdateLaptop from '../views/UpdateLaptop.vue'
import Product from '../views/Product.vue'
import AddProduct from '../views/AddProduct.vue'
import AddLaptop from '../views/AddLaptop.vue'
import Fashion from '../views/Fashion.vue'
import Footware from '../views/Footware.vue'
import MyAccount from '../views/MyAccount.vue'
import MyOrders from '../views/MyOrders.vue'
import AllProduct from '../views/AllProduct'
import Logout from '../views/Logout'
import MyCart from '../views/MyCart'
import MobileDetalis from '../views/MobileDetalis'
import LaptopDetalis from '../views/LaptopDetalis'
import AdminSignup from '../views/AdminSignup'
import AdminLogin from '../views/AdminLogin'
import PageNotFound from '../views/PageNotFound'
import orderDetails from '../views/orderDetails'
import Signup from '../views/Signup'
import ConfirmDialog from '../dialog/ConfirmDialog'
import register from '../views/register'
import AorderDetails from '../views/AorderDetails'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'register',
    component: register
  },
 
  {
    path: '/about',
    name: 'About',
   component: About
  },
  {
    path: '/confirmorder',
    name: 'ConfirmDialog',
   component: ConfirmDialog
  },
  {
    path:'/adminsignup',
    name:'AdminSignup',
    component:AdminSignup
  },
  {
    path:'/aorderdetails',
    name:'AorderDetails',
    component:AorderDetails
  },
  {
    path: '/header',
    name: 'Header',
   component: Header
  },
  {
    path: '/login',
    name: 'LoginPage',
   component: LoginPage
  },
  {
    path: '/adminlogin',
    name: 'AdminLogin',
   component: AdminLogin
  },
  {
    path: '/register',
    name: 'RegistrationPage',
   component: RegistrationPage
  },
  {
    path: '/signupdemo',
    name: 'Singup',
   component: Signup
  },
  {
    path: '/addmobile',
    name: 'AddMobile',
   component: AddMobile,
   meta :{ Isadminrequriedauth: true }
  },
  {
    path: '/mobilelist',
    name: 'MobileDetalis',
   component: MobileDetalis
  },
  {
    path: '/updatemobile/:id',
    name: 'UpdateMobile',
   component: UpdateMobile,
   meta :{ Isadminrequriedauth: true }
  },
  {
    path: '/updatelaptop/:id',
    name: 'UpdateLaptop',
   component: UpdateLaptop,
   meta :{ Isadminrequriedauth: true }
  },
  {
    path: '/product',
    name: 'Product',
   component: Product
  },
  {
    path: '/addproduct',
    name: 'AddProduct',
   component: AddProduct
  },
  {
    path: '/addlaptop',
    name: 'AddLaptop',
   component:AddLaptop,
   meta :{ Isadminrequriedauth: true }
  },
  {
    path: '/laptop',
    name: 'LaptopDetalis',
   component:LaptopDetalis
  },
  {
    path: '/fashion',
    name: 'Fashion',
   component: Fashion
  },
  {
    path: '/footware',
    name: 'Footware',
   component: Footware
  },
  {
    path: '/myaccount',
    name: 'MyAccount',
   component: MyAccount ,
   meta :{ Isrequriedauth: true }
  },
  {
    path: '/productlist',
    name: 'AllProduct',
   component: AllProduct,
   meta :{ Isadminrequriedauth: true }
  },
  {
    path: '/mycart',
    name: 'MyCart',
   component: MyCart,
   meta :{ Isrequriedauth: true }
  },
  {
    path: '/myorders',
    name: 'MyOrders',
   component: MyOrders,
   meta :{ Isrequriedauth: true }
  },
  {
    path: '/orderdetails',
    name: 'orderDetails',
   component : orderDetails,
   meta :{ Isrequriedauth: true }
  },
  {
    path: '/logout',
    name: 'Logout',
   component: Logout
  },
  {
    path: '/:catchAll(.*)',
    name: 'PageNotFound',
    component: PageNotFound
 }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some( record => record.meta.Isrequriedauth))
   {  
     if (localStorage.getItem("jwt") === null) {
       next({name:'LoginPage'})
     }
     else {
        next();
     }
  } else {
     next();
  }
})
router.beforeEach((to, from, next) => {
  if (to.matched.some( record => record.meta.Isadminrequriedauth))
   {  
     if (localStorage.getItem("jwtadmin") === null) {
       next({name:'AdminLogin'})
     }
     else {
        next();
     }
  } else {
     next();
  }
})


export default router
