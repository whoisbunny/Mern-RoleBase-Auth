import React, { useContext } from "react";
import Header from "../components/Header";
import DarkModeContext from "../components/DarkModeContext";
import Footer from "../components/Footer";
import SignUpForm from "../components/signup-form";

const Signup = () => {
  const { dark } = useContext(DarkModeContext);
  return (
    <>
      <div
        className={`${
          dark ? "dark min-h-screen" : "min-h-screen"
        } bg-gray-100 dark:bg-gray-900 flex flex-col justify-between w-full`}
      >
        <Header />
        <div className="text-center   ">
          <h4 className="font-2xl dark:text-gray-50 font-semibold">Sign Up</h4>
          <div className="text-slate-500  text-base">
            Sign up to your account
          </div>
        </div>
        <SignUpForm />
        <Footer />
      </div>
    </>
  );
};

export default Signup;
