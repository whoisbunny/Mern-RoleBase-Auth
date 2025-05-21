import React, { useContext } from "react";
import Header from "../components/Header";
import LoginForm from "../components/login-form";
import DarkModeContext from "../components/DarkModeContext";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";

const Login = () => {
  const { dark } = useContext(DarkModeContext);
  const {pathname} = useLocation()
  const isAdminLogin = pathname === "/admin-login";
  return (
    <>
      <div
        className={`${
          dark ? "dark min-h-screen" : "min-h-screen"
        } bg-gray-100 dark:bg-gray-900 flex flex-col justify-between w-full`}
      >
        <Header />
        <div className="text-center   ">
          <h4 className="font-2xl dark:text-gray-50 font-semibold">Sign in As {isAdminLogin ? "Admin":"Customer"}</h4>
          <div className="text-slate-500  text-base">
            Sign in to your account
          </div>
        </div>
        <LoginForm />
        <Footer />
      </div>
    </>
  );
};

export default Login;
