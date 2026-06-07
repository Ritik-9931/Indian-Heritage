import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../redux/slices/authSlice";



const Register = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();



  const { loading, error, user } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });



  const {
    name,
    email,
    password,
    confirmPassword,
  } = formData;



  const [passwordError, setPasswordError] = useState("");



  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };



  // HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    // CHECK PASSWORD MATCH
    if (password !== confirmPassword) {
      return setPasswordError("Passwords do not match");
    }

    setPasswordError("");



    dispatch(
      registerUser({
        name,
        email,
        password,
      })
    );
  };



  // REDIRECT AFTER REGISTER
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">

        {/* TITLE */}
        <div className="text-center mb-6">

          <h1 className="text-3xl font-bold text-gray-800">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Join the India Temple Heritage Portal
          </p>

        </div>



        {/* API ERROR */}
        {
          error && (
            <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )
        }



        {/* PASSWORD ERROR */}
        {
          passwordError && (
            <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">
              {passwordError}
            </div>
          )
        }



        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* NAME */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}

              placeholder="Enter your full name"

              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
            />

          </div>



          {/* EMAIL */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}

              placeholder="Enter your email"

              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
            />

          </div>



          {/* PASSWORD */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}

              placeholder="Enter your password"

              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
            />

          </div>



          {/* CONFIRM PASSWORD */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}

              placeholder="Confirm your password"

              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
            />

          </div>



          {/* BUTTON */}
          <button
            type="submit"

            disabled={loading}

            className="w-full bg-orange-500 hover:bg-orange-600 transition-all duration-300 text-white py-3 rounded-xl font-semibold"
          >
            {
              loading ? "Creating Account..." : "Register"
            }
          </button>

        </form>



        {/* LOGIN LINK */}
        <p className="text-center text-sm text-gray-600 mt-6">

          Already have an account?

          <Link
            to="/login"

            className="text-orange-500 font-semibold ml-1 hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Register;