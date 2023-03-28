import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginComponent from './components/login/login.component';
import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';
import MyAccountPage from './components/myAccountPage/myAccountPage.component';
import MyDashBoard from './components/myDashboard/myDashboard.component';
import ProductDetailPage from './components/productDetailPage/productDetailPage.component';
import AccountDetail from './components/accountDetail/accountDetail.component';
import HomePage from './components/homePage/homePage.component';
import CatePage from './components/catePage/catePage.component';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findCartByUserId } from './actions/cart';
import CartPage from './components/cartPage/cartPage.component';
import CheckoutPage from './components/checkoutPage/checkoutPage.component';
import OrderReceivedPage from './components/orderReceivedPage/orderReceivedPage';
import MyOrders from './components/myOrder/myOrders';
import ViewOrder from './components/viewOrder/viewOrder';
import RegisterPageComponent from './components/registerPage/registerPage';

function App() {
  const { user, isLoggedIn } = useSelector((state) => state.users)
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch();

  useEffect(()=>{
    if(isLoggedIn){
      const handleFetchCart = async () => {
        await dispatch(findCartByUserId(user._id))
      }
      handleFetchCart()
        .then(() => {

        })
        .catch(() => {});
    }
  },[])

  return (
    <div className="App">
      <Header />
      <div className='body'>
        <Routes>
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<RegisterPageComponent />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order-received" element={<OrderReceivedPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/my-account" element={<MyAccountPage />} >
            <Route path='' element={<MyDashBoard />}/>
            <Route path='dashboard' element={<MyDashBoard />}/>
            <Route path='edit-account' element={<AccountDetail />}/>
            <Route path='my-order' element={<MyOrders />}/>
            <Route path='view-order/:order_id' element={<ViewOrder />}/>
          </Route>
          <Route path="/product-category"  >
            <Route path=':cate' element={<CatePage />}/>
          </Route>
          <Route path="/product/:slug" element={<ProductDetailPage />} >
          </Route>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
