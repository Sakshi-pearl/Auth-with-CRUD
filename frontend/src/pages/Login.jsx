// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import { handleError, handleSuccess } from "../utils";

// function Login() {
//   const [loginInfo, setLoginInfo] = useState({
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     console.log(name, value);
//     const copyLoginInfo = { ...loginInfo };
//     copyLoginInfo[name] = value;
//     setLoginInfo(copyLoginInfo);
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const { email, password } = loginInfo;
//     if (!email || !password) {
//       return handleError("email and password are required");
//     }
//     try {
//       const url = `http://localhost:6767/auth/login`;
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(loginInfo),
//       });
//       const result = await response.json();
//       const { success, message, jwtToken, name, error } = result;

//       if (success) {
//         handleSuccess(message);
//         localStorage.setItem("token", jwtToken);
//         localStorage.setItem("loggedInUser", JSON.stringify({ name }));
//         setTimeout(() => {
//           navigate("/dashboard");
//         }, 1000);
//       } else if (error) {
//         const details = error?.details[0].message;
//         handleError(details);
//       } else if (!success) {
//         handleError(message);
//       }
//       console.log(result);
//     } catch (err) {
//       handleError(err);
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Login</h1>
//       <form onSubmit={handleLogin}>
//         <div>
//           <label htmlFor="email">Email</label>
//           <input
//             onChange={handleChange}
//             type="email"
//             name="email"
//             placeholder="Enter your email..."
//             value={loginInfo.email}
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password</label>
//           <input
//             onChange={handleChange}
//             type="password"
//             name="password"
//             placeholder="Enter your password..."
//             value={loginInfo.password}
//           />
//         </div>
//         <button type="submit">Login</button>
//         <span>
//           Does't have an account ?<Link to="/signup">Signup</Link>
//         </span>
//       </form>
//       <ToastContainer />
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password)
      return handleError("email and password are required");

    try {
      const res = await fetch("http://localhost:6767/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo),
      });
      const { success, message, jwtToken, name, error } = await res.json();

      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", JSON.stringify({ name }));
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        handleError(error?.details?.[0]?.message || message);
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-xl px-12 py-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-lg font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email..."
              value={loginInfo.email}
              onChange={handleChange}
              className="w-full text-lg p-2.5 border-b-2 border-gray-400 focus:outline-none focus:border-emerald-600 placeholder:text-xs placeholder:italic"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-lg font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password..."
              value={loginInfo.password}
              onChange={handleChange}
              className="w-full text-lg p-2.5 border-b-2 border-gray-400 focus:outline-none focus:border-emerald-600 placeholder:text-xs placeholder:italic"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white text-lg py-2 rounded-md transition-colors"
          >
            Login
          </button>

          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-emerald-600 hover:underline">
              Signup
            </Link>
          </p>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
}
