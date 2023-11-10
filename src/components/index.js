import Blogs from "./Home/Blogs";
import Carousel from "./Home/Carousel";
import Categorybtn from "./Home/Categorybtn";
import Home from "./Home/Home";

// Layout
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Button from "./layout/Button";

// registration
import Form from "./registration/Form"; 
import Login from "./registration/Login";
import Signup from "./registration/Signup";

// conf
import conf from "../conf/conf";

// store
import store from "../store/store";
import authSlice from "../store/authSlice";

// appwrite
import authService from "../appwrite/auth";
import service from "../appwrite/config";



import RTE from "../RTE";
import Select from "../Select";



export default { Button,Navbar, Footer, Blogs, Carousel, Categorybtn, Home, Form, Login, Signup, conf, store, authSlice, authService, service,RTE,Select };    