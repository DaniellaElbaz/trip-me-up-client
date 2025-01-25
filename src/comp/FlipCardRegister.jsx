import React, { useState } from "react";
import { TEInput, TERipple } from "tw-elements-react";
import Avatar from "./Avatar";
import CONFIG from "../config";


function FlipCardRegister({ onBack }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${CONFIG.SERVER_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name:name, email:email, username:username, password:password }),
      });

      if (response.ok) {
        const userData = await response.json();
        console.log(userData);
        onBack();
      } else {
        const error = await response.text();
        alert(`Register failed: ${error}`);
      }
    } catch (err) {
      console.error("Error during register:", err);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
 
      <div className="p-8">
        <div className="text-center">
          <Avatar />
          <h4 className="mb-12 mt-4 pb-1 text-xl font-semibold">Trip me UP!</h4>
        </div>
        <form onSubmit={handleRegisterSubmit}>
          <p className="mb-4">Please register your account</p>
          <TEInput
            type="text"
            label="Name"
            className="mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <TEInput
            type="email"
            label="Email"
            className="mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="mb-12 pb-1 pt-1 text-center">
            <TERipple rippleColor="light" className="w-full">
              <button
                type="submit"
                className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white"
                style={{
                  background: "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                }}
              >
                Register
              </button>
            </TERipple>
          </div>
          <div className="text-center">
            <TERipple rippleColor="light">
              <button
                type="button"
                className="inline-block rounded border-2 px-6 pb-[6px] pt-2 text-sm font-bold uppercase leading-normal text-transparent"
                onClick={onBack}
                style={{
                  background:
                    "linear-gradient(to right, #ff7e5f, #feb47b, #fcb045)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  borderImageSlice: 1,
                }}
              >
                Back to Login
              </button>
            </TERipple>
          </div>
        </form>
      </div>
   
  );
}

export default FlipCardRegister;

