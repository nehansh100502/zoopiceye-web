
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './AuthContext.jsx';
import { CartProvider } from './CartContext.jsx';
import { OrderProvider } from './orderContext';

import Layout from './Layout.jsx';
import Home from './components/Home/home.jsx';
import Contact from './components/ContactForm/contact.jsx';
import Login from './components/LoginForm/login.jsx';
import Signup from './components/SignupForm/signup.jsx';
import SpectacleList from './components/Collections/spectacleList.jsx';
import SpectacleDetail from './components/Collections/spectacleDetails.jsx';
import Offer from './components/Offers/offer.jsx';
import Cart from './components/Cart/cart.jsx';
import CartCard from './components/Cart/cartCard.jsx';
import Profile from './components/Header/profile.jsx';
import UserProfile from './components/Header/userProfile.jsx';
import Wishlist from './components/Wishlisht/wishlisht.jsx';
import WishlistCard from './components/Wishlisht/wishlishtCard.jsx';
import SpinWheel from './components/Offers/spinWheel.jsx';
import VirtualTryOn from './components/TryOnFace/VirtualTryOn.jsx';
import RecommendedProducts from './components/Recommended/BrowseHistory.jsx';
import LoyaltyProgram from './components/LoyaltyProgram/LoyaltyProgram.jsx';
import Quiz from './components/Quiz/quiz.jsx';
import Model from './model.jsx';
import OrderDetails from './components/OrderDetails/OrderDetails.jsx';
import About from './components/AboutUs/About.jsx';
import StoreLocator from './components/LocationStore/storeLocator.jsx';
import Carousel from './components/Home/carousel.jsx';
import ErrorBoundary from './errorboundary.jsx';
import Checkout from './components/Collections/checkout.jsx';
import Blog from './components/Blog/blog.jsx';
import OrderList from './components/OrderDetails/orderList.jsx';
import FetchOrderButton from './components/OrderDetails/fetchOrder.jsx';
import OrderConfirmation from './components/Collections/orderConfirm.jsx';
import PaymentMethod from './components/Payment/paymentMethod.jsx';
import ImageCarousel from './components/Home/imageCarousel.jsx';
import BookSlot from './components/EyetestBooking/bookslote.jsx';
import ReviewCard from './components/Home/reviewCard.jsx';
import OurTeam from './components/AboutUs/ourTeam.jsx';
import PaymentProcess from './components/Payment/paymentProcess.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'Contact', element: <Contact /> },
      { path: 'Login', element: <Login /> },
      { path: 'Signup', element: <Signup /> },
      { path: 'Profile', element: <Profile /> },
      { path: 'UserProfile', element: <UserProfile /> },
      { path: 'SpectacleList', element: <SpectacleList /> },
      { path: 'SpectacleDetail/:id', element: <SpectacleDetail /> },
      { path: 'Offer', element: <Offer /> },
      { path: 'Cart', element: <Cart /> },
      { path: 'CartCard', element: <CartCard /> },
      { path: 'Wishlist', element: <Wishlist /> },
      { path: 'WishlistCard', element: <WishlistCard /> },
      { path: 'SpinWheel', element: <SpinWheel /> },
      { path: 'VirtualTryOn', element: <VirtualTryOn /> },
      { path: 'RecommendedProducts', element: <RecommendedProducts /> },
      { path: 'LoyaltyProgram', element: <LoyaltyProgram /> },
      { path: 'Quiz', element: <Quiz /> },
      { path: 'Model', element: <Model /> },
      { path: 'orders/:orderId', element: <OrderDetails /> },
      { path: 'About', element: <About /> },
      { path: 'Carousel', element: <Carousel /> },
      { path: 'Checkout', element: <Checkout /> },
      { path: 'Blog', element: <Blog /> },
      { path: 'OrderList', element: <OrderList /> },
      { path: 'FetchOrder', element: <FetchOrderButton /> },
      { path: 'orders/:orderId', element: <OrderConfirmation /> },
      // Corrected PaymentMethod and PaymentProcess route paths
      { path: 'payment-method/:orderId', element: <PaymentMethod /> },
      { path: 'imageCarousel', element: <ImageCarousel /> },
      { path: 'Book-Slot', element: <BookSlot /> },
      { path: 'reviewCard', element: <ReviewCard /> },
      { path: 'Our-Team', element: <OurTeam /> },
      { path: 'payment-method/:orderId', element: <PaymentProcess /> },  // Corrected route

      {
        path: 'StoreLocator',
        element: (
          <ErrorBoundary>
            <StoreLocator />
          </ErrorBoundary>
        ),
      },
      { path: '*', element: <div>404 Not Found</div> },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <RouterProvider router={router} />
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
