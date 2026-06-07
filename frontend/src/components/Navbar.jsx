import { useState } from "react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { logout } from "../redux/slices/authSlice";



const Navbar = () => {

  const [mobileMenu, setMobileMenu] =
    useState(false);



  const navigate = useNavigate();

  const dispatch = useDispatch();



  const { user } = useSelector(
    (state) => state.auth
  );



  const handleLogout = () => {

    dispatch(logout());

    navigate("/login");
  };



  const navLinkStyle = ({
    isActive,
  }) =>
    isActive
      ? "text-orange-500 font-semibold"
      : "text-gray-700 hover:text-orange-500 transition cursor-pointer";



  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-100">

      <div className="max-w-7xl mx-auto px-4">

        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <div
            onClick={() =>
              navigate("/")
            }

            className="flex items-center gap-3 cursor-pointer"
          >

            <div className="text-4xl">
              🛕
            </div>



            <div>

              <h1 className="text-xl font-bold text-orange-600 leading-none">

                Temple Heritage

              </h1>



              <p className="text-xs text-gray-500 mt-1">

                Incredible India

              </p>

            </div>

          </div>



          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">

            <NavLink
              to="/"
              className={navLinkStyle}
            >
              Home
            </NavLink>



            <NavLink
              to="/temples"
              className={navLinkStyle}
            >
              Temples
            </NavLink>



            <NavLink
              to="/circuits"
              className={navLinkStyle}
            >
              Circuits
            </NavLink>



            <NavLink
              to="/festivals"
              className={navLinkStyle}
            >
              Festivals
            </NavLink>



            <NavLink
              to="/about"
              className={navLinkStyle}
            >
              About
            </NavLink>

          </div>



          {/* RIGHT SECTION */}
          <div className="hidden md:flex items-center gap-4">

            {
              user ? (

                <>

                  {/* ADMIN */}
                  {
                    user?.role ===
                      "admin" && (

                      <div
                        onClick={() =>
                          navigate(
                            "/admin/dashboard"
                          )
                        }

                        className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl transition shadow-sm cursor-pointer"
                      >

                        <ShieldCheck size={18} />

                        Admin Panel

                      </div>
                    )
                  }



                  {/* PROFILE */}
                  <div
                    onClick={() =>
                      navigate(
                        "/profile"
                      )
                    }

                    className="font-medium text-gray-700 hover:text-orange-500 transition cursor-pointer"
                  >
                    {user.name}
                  </div>



                  {/* LOGOUT */}
                  <button
                    onClick={
                      handleLogout
                    }

                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
                  >
                    Logout
                  </button>

                </>

              ) : (

                <>

                  <div
                    onClick={() =>
                      navigate(
                        "/login"
                      )
                    }

                    className="text-gray-700 hover:text-orange-500 transition cursor-pointer"
                  >
                    Login
                  </div>



                  <div
                    onClick={() =>
                      navigate(
                        "/register"
                      )
                    }

                    className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl transition shadow-sm cursor-pointer"
                  >
                    Register
                  </div>

                </>
              )
            }

          </div>



          {/* MOBILE BUTTON */}
          <button
            onClick={() =>
              setMobileMenu(
                !mobileMenu
              )
            }

            className="md:hidden text-gray-700"
          >

            {
              mobileMenu
                ? <X size={28} />
                : <Menu size={28} />
            }

          </button>

        </div>

      </div>



      {/* MOBILE MENU */}
      {
        mobileMenu && (

          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">

            <div className="px-5 py-6 space-y-5">

              <div
                onClick={() => {
                  navigate("/");
                  setMobileMenu(
                    false
                  );
                }}

                className="block text-gray-700 hover:text-orange-500 cursor-pointer"
              >
                Home
              </div>



              <div
                onClick={() => {
                  navigate(
                    "/temples"
                  );
                  setMobileMenu(
                    false
                  );
                }}

                className="block text-gray-700 hover:text-orange-500 cursor-pointer"
              >
                Temples
              </div>



              <div
                onClick={() => {
                  navigate(
                    "/circuits"
                  );
                  setMobileMenu(
                    false
                  );
                }}

                className="block text-gray-700 hover:text-orange-500 cursor-pointer"
              >
                Circuits
              </div>



              <div
                onClick={() => {
                  navigate(
                    "/festivals"
                  );
                  setMobileMenu(
                    false
                  );
                }}

                className="block text-gray-700 hover:text-orange-500 cursor-pointer"
              >
                Festivals
              </div>



              <div
                onClick={() => {
                  navigate(
                    "/about"
                  );
                  setMobileMenu(
                    false
                  );
                }}

                className="block text-gray-700 hover:text-orange-500 cursor-pointer"
              >
                About
              </div>



              {
                user?.role ===
                  "admin" && (

                  <div
                    onClick={() => {
                      navigate(
                        "/admin/dashboard"
                      );

                      setMobileMenu(
                        false
                      );
                    }}

                    className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl transition cursor-pointer"
                  >

                    <ShieldCheck size={18} />

                    Admin Panel

                  </div>
                )
              }



              {
                user ? (

                  <>

                    <div
                      onClick={() => {
                        navigate(
                          "/profile"
                        );

                        setMobileMenu(
                          false
                        );
                      }}

                      className="block text-center border border-gray-300 py-3 rounded-xl cursor-pointer"
                    >
                      {user.name}
                    </div>



                    <button
                      onClick={
                        handleLogout
                      }

                      className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition"
                    >
                      Logout
                    </button>

                  </>

                ) : (

                  <div className="flex gap-3">

                    <div
                      onClick={() => {
                        navigate(
                          "/login"
                        );

                        setMobileMenu(
                          false
                        );
                      }}

                      className="w-full border border-orange-500 text-orange-500 text-center py-3 rounded-xl cursor-pointer"
                    >
                      Login
                    </div>



                    <div
                      onClick={() => {
                        navigate(
                          "/register"
                        );

                        setMobileMenu(
                          false
                        );
                      }}

                      className="w-full bg-orange-500 text-white text-center py-3 rounded-xl cursor-pointer"
                    >
                      Register
                    </div>

                  </div>
                )
              }

            </div>

          </div>
        )
      }

    </nav>
  );
};

export default Navbar;