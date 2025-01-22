import React, { useState } from "react";
import { TEInput, TERipple } from "tw-elements-react";
import Avatar from "./Avatar";
import CONFIG from "../config";

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async (e) => {
  e.preventDefault(); // Prevent default form submission behavior

  try {
    const response = await fetch(`${CONFIG.SERVER_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      data.userId = 1; // TODO: temp until server returns userid, REMOVE!
      if (onLogin) {
        onLogin(data);
      }
    } else {
      console.error("Login failed");
      const errorData = await response.json();
      console.error("Error details:", errorData);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};


  return (
    <div className="px-4 md:px-0 lg:w-6/12">
      <div className="md:mx-6 md:p-12">
        {/* Logo */}
        <div className="text-center">
          <Avatar />
          <h4 className="mb-12 mt-4 pb-1 text-xl font-semibold">
            Trip me UP!
          </h4>
        </div>

        <form onSubmit={handleSubmit}>
          <p className="mb-4">Please login to your account</p>

          {/* Username input */}
          <TEInput
            type="text"
            label="Username"
            className="mb-4"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></TEInput>

          {/* Password input */}
          <TEInput
            type="password"
            label="Password"
            className="mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></TEInput>

          {/* Submit button */}
          <div className="mb-12 pb-1 pt-1 text-center">
            <TERipple rippleColor="light" className="w-full">
              <button
                className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                type="submit"
                style={{
                  background:
                    "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                }}
              >
                Log in
              </button>
            </TERipple>
          </div>

          {/* Register button */}
          <div className="flex items-center justify-between pb-6">
            <p className="mb-0 mr-2">Don't have an account?</p>
            <TERipple rippleColor="light">
            <button
                type="button"
                className="inline-block rounded border-2 px-6 pb-[6px] pt-2 text-sm font-bold uppercase leading-normal text-transparent bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text border-gradient-to-r from-orange-500 via-pink-500 to-purple-500 transition duration-150 ease-in-out hover:scale-105 focus:outline-none"
                style={{
                borderImageSlice: 1,
                }}
                >
                Register
              </button>
            </TERipple>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
