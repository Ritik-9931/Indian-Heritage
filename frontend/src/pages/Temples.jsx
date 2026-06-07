import React, {
  useEffect,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { fetchTemples } from "../redux/slices/templeSlice";

import TempleCard from "../components/TempleCard";
import { fetchCities, fetchCitiesByState } from "../redux/slices/citySlice";
import { fetchStates } from "../redux/slices/stateSlice";
import { fetchDeities } from "../redux/slices/deitySlice";

const Temples = () => {
  const dispatch = useDispatch();

  // SEARCH STATES
  const [search, setSearch] =
    useState("");

  const [selectedState, setSelectedState] =
    useState("");

  const [selectedCity, setSelectedCity] =
    useState("");

  const [selectedDeity, setSelectedDeity] =
    useState("");

  // REDUX DATA
  const {
    temples = [],
    loading,
    error,
  } = useSelector(
    (state) => state.temple
  );

  const { states } = useSelector(
    (state) => state.state
  );

  const { cities } = useSelector(
    (state) => state.city
  );

  const { deities } = useSelector(
    (state) => state.deity
  );

  // FETCH TEMPLES
  useEffect(() => {
    dispatch(fetchStates())
    dispatch(fetchCitiesByState(selectedState))
    dispatch(fetchDeities())

    dispatch(
      fetchTemples({
        keyword: search,
        state: selectedState,
        city: selectedCity,
        deity: selectedDeity,
      })
    );
  }, [
    dispatch,
    search,
    selectedState,
    selectedCity,
    selectedDeity,
  ]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADING */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Explore Temples
          </h1>

          <p className="text-gray-500 mt-2">
            Discover spiritual heritage
          </p>
        </div>

        {/* FILTERS */}
        <div className="bg-white p-6 rounded-3xl shadow-md mb-10 grid md:grid-cols-4 gap-5">
          {/* SEARCH */}
          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            type="text"
            placeholder="Search Temple..."
            className="border p-4 rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
          />

          {/* STATE */}
          <select
            value={selectedState}
            onChange={(e) =>
              setSelectedState(
                e.target.value
              )
            }
            className="border p-4 rounded-xl"
          >
            <option value="">
              Select State
            </option>

            {states?.map((state) => (
              <option
                key={state._id}
                value={state._id}
              >
                {state.stateName}
              </option>
            ))}
          </select>

          {/* CITY */}
          <select
            value={selectedCity}
            onChange={(e) =>
              setSelectedCity(
                e.target.value
              )
            }
            className="border p-4 rounded-xl"
          >
            <option value="">
              Select City
            </option>

            {cities?.map((city) => (
              <option
                key={city._id}
                value={city._id}
              >
                {city.cityName}
              </option>
            ))}
          </select>

          {/* DEITY */}
          <select
            value={selectedDeity}
            onChange={(e) =>
              setSelectedDeity(
                e.target.value
              )
            }
            className="border p-4 rounded-xl"
          >
            <option value="">
              Select Deity
            </option>

            {deities?.map((deity) => (
              <option
                key={deity._id}
                value={deity._id}
              >
                {deity.deityName}
              </option>
            ))}
          </select>
        </div>

        {/* ERROR */}
        {error && (
          <div className="text-red-500 mb-5">
            {error}
          </div>
        )}

        {/* LOADING */}
        {loading ? (
          <div className="text-center text-2xl font-semibold">
            Loading...
          </div>
        ) : temples?.data?.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {temples.data.map(
              (temple) => (
                <TempleCard
                  key={temple._id}
                  temple={temple}
                />
              )
            )}
          </div>
        ) : (
          <div className="text-center text-gray-500 text-xl">
            No temples found
          </div>
        )}
      </div>
    </div>
  );
};

export default Temples;