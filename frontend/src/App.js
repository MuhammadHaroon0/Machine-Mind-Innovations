import "./App.css";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import ServicesMain from "./components/ServicesMain";
import ProductsMain from "./components/ProductsMain";
import Careers from "./components/Careers";
import Service from "./components/Service";
import Dashboard from "./components/Dashboard";
import useStore from './store/store'
import { useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorPage from "./components/ErrorPage";
import Cookies from "js-cookie";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
  const setIsLoggedIn=useStore(state=>state.setIsLoggedIn)
  const hamburger = () => {
    var elem = document.getElementById("menu-btn");
    var nav = document.getElementById("menu");
    elem.classList.toggle("open");
    nav.classList.toggle("flex");
    nav.classList.toggle("hidden");
  };

  const {getAllServices,getAllProducts,getAllReviews}=useStore()
    useEffect(()=>{
        const res=async()=>{
          await getAllServices() 
          await getAllProducts() 
          await getAllReviews()

        }
        res()        
    },[getAllServices,getAllProducts,getAllReviews])

    useEffect(() => {
      if(Cookies.get('jwt'))
      setIsLoggedIn(true)
      else
      setIsLoggedIn(false)
    }, [setIsLoggedIn]);


  return (
    <>
      <Navbar hamburger={hamburger}/>
      <Routes>
        <Route exact element={<Home />} path="/" />
        <Route exact element={<About />} path="/about" />
        <Route exact element={<ServicesMain />} path="/services" />{" "}
        {/* Main page of services */}
        <Route exact element={<Service />} path="/serv" />{" "}
        {/* Individual page of service */}
        <Route exact element={<ProductsMain />} path="/products" />
        <Route exact element={<Contact />} path="/contact" />
        <Route exact element={<Careers />} path="/careers" />
        <Route exact element={ <Login />} path="/login" />
        <Route exact element={ <ForgotPassword />} path="/forgotPassword" />
        <Route exact element={ <ResetPassword />} path="/resetPassword/:token" />
        <Route exact element={<Signup />} path="/signup" />
        <Route exact element={<Service />} path="/services/:id" />
        <Route exact path="/dashboard" element={<ProtectedRoute>
        <Dashboard />
        </ProtectedRoute>}/>
        {/* ---------------- Routes that does not exist -------------------------- */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
