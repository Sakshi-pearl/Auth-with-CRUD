// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import { handleError, handleSuccess } from "../utils";

// function Signup() {
//   const [signupInfo, setSignupInfo] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     console.log(name, value);
//     const copySignupInfo = { ...signupInfo };
//     copySignupInfo[name] = value;
//     setSignupInfo(copySignupInfo);
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     const { name, email, password } = signupInfo;
//     if (!name || !email || !password) {
//       return handleError("name, email and password are required");
//     }
//     try {
//       const url = `http://localhost:6767/auth/signup`;
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(signupInfo),
//       });
//       const result = await response.json();
//       const { success, message, error } = result;
//       if (success) {
//         handleSuccess(message);
//         setTimeout(() => {
//           navigate("/login");
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
//       <h1>Signup</h1>
//       <form onSubmit={handleSignup}>
//         <div>
//           <label htmlFor="name">Name</label>
//           <input
//             onChange={handleChange}
//             type="text"
//             name="name"
//             autoFocus
//             placeholder="Enter your name..."
//             value={signupInfo.name}
//           />
//         </div>
//         <div>
//           <label htmlFor="email">Email</label>
//           <input
//             onChange={handleChange}
//             type="email"
//             name="email"
//             placeholder="Enter your email..."
//             value={signupInfo.email}
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password</label>
//           <input
//             onChange={handleChange}
//             type="password"
//             name="password"
//             placeholder="Enter your password..."
//             value={signupInfo.password}
//           />
//         </div>
//         <button type="submit">Signup</button>
//         <span>
//           Already have an account ?<Link to="/login">Login</Link>
//         </span>
//       </form>
//       <ToastContainer />
//     </div>
//   );
// }

// export default Signup;



import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

export default function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password)
      return handleError("Name, email, and password are required");

    try {
      const res = await fetch("http://localhost:6767/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupInfo),
      });

      const { success, message, error } = await res.json();

      if (success) {
        handleSuccess(message);
        setTimeout(() => navigate("/login"), 1000);
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
        <h1 className="text-2xl font-bold mb-6 text-center">Signup</h1>

        <form onSubmit={handleSignup} className="space-y-6">
          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-lg font-medium mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name..."
              value={signupInfo.name}
              onChange={handleChange}
              autoFocus
              className="w-full text-lg p-2.5 border-b-2 border-gray-400 focus:outline-none focus:border-emerald-600 placeholder:text-xs placeholder:italic"
            />
          </div>

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
              value={signupInfo.email}
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
              value={signupInfo.password}
              onChange={handleChange}
              className="w-full text-lg p-2.5 border-b-2 border-gray-400 focus:outline-none focus:border-emerald-600 placeholder:text-xs placeholder:italic"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white text-lg py-2 rounded-md transition-colors"
          >
            Signup
          </button>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-emerald-600 hover:underline">
              Login
            </Link>
          </p>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
}
