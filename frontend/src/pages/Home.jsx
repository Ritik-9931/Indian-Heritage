import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { fetchTemples } from "../redux/slices/templeSlice";

import { fetchCircuits } from "../redux/slices/circuitSlice";

import { fetchFestivals } from "../redux/slices/festivalSlice";



const Home = () => {

  const dispatch = useDispatch();



  const {
    temples,
    loading: templeLoading,
  } = useSelector((state) => state.temple);



  const {
    circuits,
  } = useSelector((state) => state.circuit);



  const {
    festivals,
  } = useSelector((state) => state.festival);



  useEffect(() => {

    dispatch(fetchTemples());

    dispatch(fetchCircuits());

    dispatch(fetchFestivals());

  }, [dispatch]);



  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white">

        <div className="max-w-7xl mx-auto px-4 py-24">

          <div className="max-w-3xl">

            <h1 className="text-5xl font-bold leading-tight">

              Discover India’s Sacred
              Temple Heritage

            </h1>

            <p className="mt-6 text-lg text-orange-100">

              Explore ancient temples,
              pilgrimage circuits,
              rituals, festivals, and
              spiritual destinations
              across India.

            </p>



            <div className="flex flex-wrap gap-4 mt-8">

              <Link
                to="/temples"

                className="bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
              >
                Explore Temples
              </Link>



              <Link
                to="/circuits"

                className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-orange-600 transition"
              >
                Pilgrimage Circuits
              </Link>

            </div>

          </div>

        </div>

      </section>



      {/* FEATURE SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-16">

        <div className="grid md:grid-cols-3 gap-8">

          {/* CARD 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-md">

            <div className="text-4xl mb-4">
              🛕
            </div>

            <h2 className="text-2xl font-bold mb-3">
              Temple Heritage
            </h2>

            <p className="text-gray-600">
              Learn about India’s
              ancient temples,
              architecture,
              mythology, and spiritual
              significance.
            </p>

          </div>



          {/* CARD 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-md">

            <div className="text-4xl mb-4">
              🚩
            </div>

            <h2 className="text-2xl font-bold mb-3">
              Pilgrimage Circuits
            </h2>

            <p className="text-gray-600">
              Explore sacred yatras
              like Char Dham,
              Jyotirlinga,
              Shakti Peeth,
              and more.
            </p>

          </div>



          {/* CARD 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-md">

            <div className="text-4xl mb-4">
              🎉
            </div>

            <h2 className="text-2xl font-bold mb-3">
              Festivals & Rituals
            </h2>

            <p className="text-gray-600">
              Discover temple festivals,
              pooja timings,
              rituals,
              and spiritual events.
            </p>

          </div>

        </div>

      </section>



      {/* FEATURED TEMPLES */}
      <section className="max-w-7xl mx-auto px-4 py-10">

        <div className="flex items-center justify-between mb-8">

          <h2 className="text-3xl font-bold">
            Featured Temples
          </h2>



          <Link
            to="/temples"

            className="text-orange-500 font-semibold hover:underline"
          >
            View All
          </Link>

        </div>



        {
          templeLoading ? (

            <h2>Loading...</h2>

          ) : (

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

              {
                temples?.data?.slice(0, 4).map((temple) => (

                  <div
                    key={temple._id}

                    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
                  >

                    {/* IMAGE */}
                    <img
                      src={
                        temple.images?.[0]?.url ||
                        "https://placehold.co/600x400"
                      }

                      alt={temple.templeName}

                      className="h-52 w-full object-cover"
                    />



                    {/* CONTENT */}
                    <div className="p-5">

                      <h3 className="text-xl font-bold mb-2">
                        {temple.templeName}
                      </h3>



                      <p className="text-gray-500 text-sm mb-3">

                        {
                          temple.city?.cityName
                        }

                        , {" "}

                        {
                          temple.state?.stateName
                        }

                      </p>



                      <Link
                        to={`/temples/${temple._id}`}

                        className="text-orange-500 font-semibold hover:underline"
                      >
                        View Details
                      </Link>

                    </div>

                  </div>
                ))
              }

            </div>
          )
        }

      </section>



      {/* PILGRIMAGE CIRCUITS */}
      <section className="bg-white py-16 mt-10">

        <div className="max-w-7xl mx-auto px-4">

          <div className="flex items-center justify-between mb-8">

            <h2 className="text-3xl font-bold">
              Popular Pilgrimage Circuits
            </h2>



            <Link
              to="/circuits"

              className="text-orange-500 font-semibold hover:underline"
            >
              View All
            </Link>

          </div>



          <div className="grid md:grid-cols-3 gap-6">

            {
              circuits?.slice(0, 3).map((circuit) => (

                <div
                  key={circuit._id}

                  className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition"
                >

                  <h3 className="text-2xl font-bold mb-3">
                    {circuit.circuitName}
                  </h3>



                  <p className="text-gray-600 mb-2">

                    Duration:
                    {" "}
                    {circuit.duration}

                  </p>



                  <p className="text-gray-600 mb-2">

                    Distance:
                    {" "}
                    {circuit.totalDistance}

                  </p>



                  <p className="text-gray-600 mb-5">

                    Difficulty:
                    {" "}
                    {circuit.difficultyLevel}

                  </p>



                  <Link
                    to={`/circuitDetails/${circuit._id}`}

                    className="text-orange-500 font-semibold hover:underline"
                  >
                    Explore Circuit
                  </Link>

                </div>
              ))
            }

          </div>

        </div>

      </section>



      {/* FESTIVALS */}
      <section className="max-w-7xl mx-auto px-4 py-16">

        <div className="flex items-center justify-between mb-8">

          <h2 className="text-3xl font-bold">
            Upcoming Festivals
          </h2>



          <Link
            to="/festivals"

            className="text-orange-500 font-semibold hover:underline"
          >
            View All
          </Link>

        </div>



        <div className="grid md:grid-cols-3 gap-6">

          {
            festivals?.slice(0, 3).map((festival) => (

              <div
                key={festival._id}

                className="bg-white rounded-2xl p-6 shadow-md"
              >

                <h3 className="text-2xl font-bold mb-3">
                  {festival.festivalName}
                </h3>



                <p className="text-gray-600 mb-3">
                  {festival.description}
                </p>



                <p className="text-sm text-gray-500">

                  Start:
                  {" "}

                  {
                    new Date(
                      festival.startDate
                    ).toLocaleDateString()
                  }

                </p>

              </div>
            ))
          }

        </div>

      </section>

    </div>
  );
};

export default Home;