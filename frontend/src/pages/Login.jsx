import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../redux/slices/authSlice";

import { GoogleLogin } from "@react-oauth/google";

import { googleLogin } from "../redux/slices/authSlice";

import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // HANDLE FORM SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        loginUser({
          email,
          password,
        }),
      ).unwrap();

      toast.success("Login successFul");
      navigate("/");
    } catch (error) {
      toast.error(error);
    }
  };

  // REDIRECT AFTER LOGIN
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
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>

          <p className="text-gray-500 mt-2">
            Login to continue your spiritual journey
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
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

          <p className="text-right text-sm">
            Forgot your password?{" "}
            <b
              className="cursor-pointer text-blue-800"
              onClick={() => navigate(`/otp-generate`)}
            >
              Reset Password
            </b>
          </p>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 transition-all duration-300 text-white py-3 rounded-xl font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* DIVIDER */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-[1px] bg-gray-300"></div>

          <span className="text-gray-400 text-sm">OR</span>

          <div className="flex-1 h-[1px] bg-gray-300"></div>
        </div>

        {/* GOOGLE LOGIN */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              try {
                await dispatch(
                  googleLogin(credentialResponse.credential),
                ).unwrap();
                toast.success("Google Login Successful");
                navigate("/");
              } catch (error) {
                toast.error("Google Login Failed");
              }
            }}
            onError={() => {
              console.log("Google Login Failed");
            }}
          />
        </div>

        {/* REGISTER */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don&apos;t have an account?
          <Link
            to="/register"
            className="text-orange-500 font-semibold ml-1 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
