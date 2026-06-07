import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* HERO SECTION */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-800 leading-tight">
              About Our
              <span className="text-orange-500 block mt-2">
                Temple Heritage
              </span>
            </h1>

            <p className="max-w-3xl mx-auto mt-8 text-lg md:text-xl text-gray-600 leading-8">
              Discover India's divine spiritual heritage through sacred temples,
              pilgrimage circuits, rituals, festivals, and timeless traditions.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center mt-10">
              <button
                onClick={() => navigate("/temples")}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-semibold transition duration-300 shadow-lg"
              >
                Explore Temples
              </button>

              <button
                onClick={() => navigate("/circuits")}
                className="bg-white hover:bg-gray-100 text-gray-800 px-8 py-4 rounded-2xl font-semibold transition duration-300 border border-gray-200 shadow-lg"
              >
                View Circuits
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MISSION SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Our Mission
            </h2>

            <p className="text-gray-600 leading-8 text-lg mb-6">
              Our platform is dedicated to preserving and showcasing the rich
              spiritual and cultural heritage of Indian temples.
            </p>

            <p className="text-gray-600 leading-8 text-lg">
              We aim to create a digital pilgrimage experience where devotees,
              travelers, and researchers can explore sacred destinations,
              festivals, rituals, temple histories, and spiritual journeys from
              anywhere in the world.
            </p>
          </div>

          {/* RIGHT */}
          <div className="bg-white rounded-3xl shadow-2xl p-10 border border-orange-100">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-orange-50 rounded-2xl p-6 text-center">
                <h3 className="text-4xl font-bold text-orange-500">500+</h3>

                <p className="text-gray-600 mt-2 font-medium">Temples</p>
              </div>

              <div className="bg-orange-50 rounded-2xl p-6 text-center">
                <h3 className="text-4xl font-bold text-orange-500">100+</h3>

                <p className="text-gray-600 mt-2 font-medium">Festivals</p>
              </div>

              <div className="bg-orange-50 rounded-2xl p-6 text-center">
                <h3 className="text-4xl font-bold text-orange-500">50+</h3>

                <p className="text-gray-600 mt-2 font-medium">Circuits</p>
              </div>

              <div className="bg-orange-50 rounded-2xl p-6 text-center">
                <h3 className="text-4xl font-bold text-orange-500">1000+</h3>

                <p className="text-gray-600 mt-2 font-medium">Devotees</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800">
              What You Can Explore
            </h2>

            <p className="text-gray-500 mt-4 text-lg">
              Everything related to India's sacred temple traditions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* CARD 1 */}
            <div className="bg-orange-50 rounded-3xl p-8 hover:shadow-xl transition duration-300 border border-orange-100">
              <div className="text-5xl mb-5">🛕</div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">Temples</h3>

              <p className="text-gray-600 leading-7">
                Discover famous temples with detailed history, architecture,
                timings, and significance.
              </p>
            </div>

            {/* CARD 2 */}
            <div className="bg-orange-50 rounded-3xl p-8 hover:shadow-xl transition duration-300 border border-orange-100">
              <div className="text-5xl mb-5">🚩</div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Festivals
              </h3>

              <p className="text-gray-600 leading-7">
                Learn about sacred festivals celebrated across India's spiritual
                destinations.
              </p>
            </div>

            {/* CARD 3 */}
            <div className="bg-orange-50 rounded-3xl p-8 hover:shadow-xl transition duration-300 border border-orange-100">
              <div className="text-5xl mb-5">🙏</div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">Rituals</h3>

              <p className="text-gray-600 leading-7">
                Explore traditional temple rituals, poojas, and spiritual
                practices.
              </p>
            </div>

            {/* CARD 4 */}
            <div className="bg-orange-50 rounded-3xl p-8 hover:shadow-xl transition duration-300 border border-orange-100">
              <div className="text-5xl mb-5">🗺️</div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Circuits
              </h3>

              <p className="text-gray-600 leading-7">
                Follow divine pilgrimage routes connecting sacred temples across
                India.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* WHY SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-16 border border-orange-100">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800">
              Why This Platform?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-orange-100 rounded-full flex items-center justify-center text-4xl mb-6">
                📖
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Knowledge
              </h3>

              <p className="text-gray-600 leading-7">
                Learn deep spiritual and historical insights about India's
                temple culture.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-orange-100 rounded-full flex items-center justify-center text-4xl mb-6">
                🌏
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Accessibility
              </h3>

              <p className="text-gray-600 leading-7">
                Access temple and pilgrimage information from anywhere in the
                world.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-orange-100 rounded-full flex items-center justify-center text-4xl mb-6">
                ❤️
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Devotion
              </h3>

              <p className="text-gray-600 leading-7">
                Connect spiritually through sacred stories, festivals, and
                divine experiences.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER CTA */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Begin Your Spiritual Journey
          </h2>

          <p className="text-orange-100 text-lg leading-8 mb-10">
            Explore India's sacred heritage and experience the beauty of
            devotion, culture, and spirituality.
          </p>

          <button
            onClick={() => navigate("/temples")}
            className="bg-white text-orange-600 hover:bg-gray-100 px-10 py-4 rounded-2xl font-bold text-lg transition duration-300 shadow-lg"
          >
            Start Exploring
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
