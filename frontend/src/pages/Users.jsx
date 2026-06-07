import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteUser,
  fetchUsers,
  updateUserRole,
} from "../redux/slices/userSlice";

import { Trash2, Shield, User } from "lucide-react";

const Users = () => {
  const dispatch = useDispatch();

  const { users, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-orange-50">
        <h1 className="text-3xl font-bold text-orange-500 animate-pulse">
          Loading Users...
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-orange-50">
        <h1 className="text-2xl font-bold text-red-500">{error}</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* HEADING */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-800">
            Manage Users
          </h1>

          <p className="text-gray-500 mt-4 text-lg">
            View and manage all registered users
          </p>
        </div>

        {/* EMPTY */}
        {users?.length === 0 ? (
          <div className="text-center text-2xl font-semibold text-gray-500">
            No Users Found
          </div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {users?.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden border border-orange-100"
              >
                {/* TOP */}
                <div
                  className={`p-6 text-white ${
                    user?.role === "admin"
                      ? "bg-gradient-to-r from-red-500 to-red-600"
                      : "bg-gradient-to-r from-orange-500 to-orange-600"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {user?.role === "admin" ? (
                      <Shield size={30} />
                    ) : (
                      <User size={30} />
                    )}

                    <div>
                      <h2 className="text-2xl font-bold">{user?.name}</h2>

                      <p className="text-sm opacity-90">{user?.role}</p>
                    </div>
                  </div>
                </div>

                {/* BODY */}
                <div className="p-6">
                  <div className="mb-6">
                    <p className="text-gray-500 text-sm">Email</p>

                    <p className="text-gray-800 font-medium break-all">
                      {user?.email}
                    </p>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="flex flex-col gap-3">
                    {user?.role === "admin" ? (
                      <button
                        onClick={() =>
                          dispatch(
                            updateUserRole({ id: user._id, role: "user" }),
                          )
                        }
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-2xl font-semibold transition"
                      >
                        Change Role to User
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          dispatch(
                            updateUserRole({ id: user._id, role: "admin" }),
                          )
                        }
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-2xl font-semibold transition"
                      >
                        Change Role to Admin
                      </button>
                    )}

                    <button
                      onClick={() => dispatch(deleteUser(user._id))}
                      className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl font-semibold transition flex items-center justify-center gap-2"
                    >
                      <Trash2 size={18} />
                      Delete User
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
