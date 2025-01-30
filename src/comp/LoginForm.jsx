import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TEInput, TERipple } from "tw-elements-react";
import Avatar from "./Avatar";
import CONFIG from "../config";
import FlipCardRegister from "./FlipCardRegister";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [isFlipped, setIsFlipped] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch(`${CONFIG.SERVER_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username:username, password:password }),
        credentials: "include",
      });

      if (response.ok) {
        const userData = await response.json();
        sessionStorage.setItem("userData", JSON.stringify(userData.userdata));
        const redirectPath = location.state?.from?.pathname || "/";
        navigate(redirectPath);
      } else {
        const error = await response.text();
        alert(`Login failed: ${error}`);
      }
    } catch (err) {
      console.error("Error during login:", err);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <div
      style={{
        perspective: "1000px", // Adds 3D perspective
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "400px",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          position: "relative",
        }}
      >
        {/* Front Side (Login Form) */}
        <div
          style={{
            backfaceVisibility: "hidden",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "#fff",
            borderRadius: "10px",
          }}
        >
          <div className="p-8">
            <div className="text-center">
              <Avatar />
              <h4 className="mb-12 mt-4 pb-1 text-xl font-semibold">Trip me UP!</h4>
            </div>
            <form onSubmit={handleSubmit}>
              <p className="mb-4">Please login to your account</p>
              <TEInput
                type="text"
                label="Username"
                className="mb-4"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TEInput
                type="password"
                label="Password"
                className="mb-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="text-center mb-4">
                <TERipple rippleColor="light" className="w-full">
                  <button
                    type="submit"
                    className="w-full rounded px-6 py-2.5 text-xs font-medium uppercase text-white"
                    style={{
                      background:
                        "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                    }}
                  >
                    Login
                  </button>
                </TERipple>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">Don't have an account?</p>
                <TERipple rippleColor="light">
                  <button
                    type="button"
                    className="inline-block rounded border-2 px-6 pb-[6px] pt-2 text-sm font-bold uppercase leading-normal text-transparent"
                    style={{
                      background: "linear-gradient(to right, #ff7e5f, #feb47b)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                    onClick={handleFlip}
                  >
                    Register
                  </button>
                </TERipple>
              </div>
            </form>
          </div>
        </div>

        {/* Back Side (Register Form) */}
        <div
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            width: "100%",
            height: "100%",
            background: "#fff",
            borderRadius: "10px",
          }}
        >
          <FlipCardRegister onBack={handleFlip} />
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
