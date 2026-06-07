import { Link } from "react-router-dom";



const Footer = () => {

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">

      <div className="max-w-7xl mx-auto px-4 py-14">

        <div className="grid md:grid-cols-4 gap-10">

          {/* BRAND */}
          <div>

            <div className="flex items-center gap-2 mb-4">

              <span className="text-3xl">
                🛕
              </span>

              <div>

                <h2 className="text-2xl font-bold text-white">
                  Temple Heritage
                </h2>

                <p className="text-sm text-gray-400">
                  Incredible India
                </p>

              </div>

            </div>



            <p className="text-gray-400 leading-7">

              Discover India’s sacred
              temples, pilgrimage
              circuits, festivals,
              rituals, and spiritual
              heritage.

            </p>

          </div>



          {/* QUICK LINKS */}
          <div>

            <h3 className="text-white text-lg font-semibold mb-5">
              Quick Links
            </h3>



            <div className="flex flex-col gap-3">

              <Link
                to="/"

                className="hover:text-orange-400 transition"
              >
                Home
              </Link>



              <Link
                to="/temples"

                className="hover:text-orange-400 transition"
              >
                Temples
              </Link>



              <Link
                to="/circuits"

                className="hover:text-orange-400 transition"
              >
                Circuits
              </Link>



              <Link
                to="/festivals"

                className="hover:text-orange-400 transition"
              >
                Festivals
              </Link>

            </div>

          </div>



          {/* PILGRIMAGE */}
          <div>

            <h3 className="text-white text-lg font-semibold mb-5">
              Pilgrimage Circuits
            </h3>



            <div className="flex flex-col gap-3">

              <Link
                to="/circuits/char-dham"

                className="hover:text-orange-400 transition"
              >
                Char Dham
              </Link>



              <Link
                to="/circuits/jyotirlinga"

                className="hover:text-orange-400 transition"
              >
                Jyotirlinga
              </Link>



              <Link
                to="/circuits/shakti-peeth"

                className="hover:text-orange-400 transition"
              >
                Shakti Peeth
              </Link>



              <Link
                to="/circuits/panch-kedar"

                className="hover:text-orange-400 transition"
              >
                Panch Kedar
              </Link>

            </div>

          </div>



          {/* CONTACT */}
          <div>

            <h3 className="text-white text-lg font-semibold mb-5">
              Contact
            </h3>



            <div className="space-y-3">

              <p>
                📍 India
              </p>



              <p>
                📧 support@templeheritage.com
              </p>



              <p>
                ☎ +91 9876543210
              </p>

            </div>

          </div>

        </div>



        {/* BOTTOM */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm text-gray-500">

          © 2026 Temple Heritage &
          Pilgrimage Portal.
          All rights reserved.

        </div>

      </div>

    </footer>
  );
};

export default Footer;