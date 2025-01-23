import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoginForm from "../comp/LoginForm";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (userData) => {
    console.log("User logged in:", userData);
    localStorage.setItem("user_id", userData.userId);
    const redirectPath = location.state?.from?.pathname || "/";
    navigate(redirectPath);
  };

    return (
      <section className="flex items-center justify-center min-h-screen bg-neutral-200 dark:bg-neutral-700">
        <div className="container p-10">
          <div className="flex h-full items-center justify-center text-neutral-800 dark:text-neutral-200">
            <div className="w-full max-w-3xl">
              <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                <div className="g-0 lg:flex ">
                  {/* Left column */}
                  <LoginForm onLogin={handleLogin} />
  
                  {/* Right column */}
                  <div
                    className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                    style={{
                      background:
                        "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                    }}
                  >
                    <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                      <h4 className="mb-6 text-xl font-semibold">
                      Discover the future of personalized travel planning
                      </h4>
                      <p className="text-base">
                      Welcome to your personalized travel planning platform! Plan and organize perfect itineraries tailored to your preferences with the help of advanced technologies and smart services
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  export default Login;