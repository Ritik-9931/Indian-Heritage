import { Link } from "react-router-dom";

import {
  MapPinned,
  Landmark,
  Building2,
  Sparkles,
  CalendarDays,
  Route,
  Users,
  MessageSquare,
} from "lucide-react";

const AdminPanel = () => {
  const adminCards = [
    {
      title: "Add State",

      description: "Manage Indian states for temple locations",

      icon: <MapPinned size={40} />,

      link: "/admin/add-state",

      color: "from-orange-500 to-red-500",
    },

    {
      title: "Add City",

      description: "Add cities and connect them with states",

      icon: <Building2 size={40} />,

      link: "/admin/add-city",

      color: "from-blue-500 to-indigo-500",
    },

    {
      title: "Add Temple",

      description: "Create new temple heritage information",

      icon: <Landmark size={40} />,

      link: "/admin/add-temple",

      color: "from-yellow-500 to-orange-500",
    },

    {
      title: "Add Deity",

      description: "Manage deity and mythology details",

      icon: <Sparkles size={40} />,

      link: "/admin/add-deity",

      color: "from-pink-500 to-rose-500",
    },

    {
      title: "Add Festival",

      description: "Create festivals and ritual events",

      icon: <CalendarDays size={40} />,

      link: "/admin/add-festival",

      color: "from-green-500 to-emerald-500",
    },

    {
      title: "Add Circuit",

      description: "Manage pilgrimage circuits and routes",

      icon: <Route size={40} />,

      link: "/admin/add-circuit",

      color: "from-purple-500 to-violet-500",
    },

    {
      title: "Add Ritual",

      description: "Manage temple rituals and pooja schedules",

      icon: <Sparkles size={40} />,

      link: "/admin/add-ritual",

      color: "from-amber-500 to-yellow-500",
    },

    {
      title: "Manage Users",

      description: "View and manage portal users",

      icon: <Users size={40} />,

      link: "/admin/users",

      color: "from-cyan-500 to-sky-500",
    },

    {
      title: "Manage Reviews",

      description: "Moderate temple reviews and ratings",

      icon: <MessageSquare size={40} />,

      link: "/admin/reviews",

      color: "from-gray-700 to-gray-900",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold mb-4">Admin Dashboard</h1>

          <p className="text-lg text-orange-100">
            Manage temple heritage, pilgrimage information, festivals, circuits,
            users, and content.
          </p>
        </div>
      </div>

      {/* DASHBOARD CARDS */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {adminCards.map((card, index) => (
            <Link key={index} to={card.link} className="group">
              <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 h-full">
                {/* TOP */}
                <div
                  className={`bg-gradient-to-r ${card.color} text-white p-6`}
                >
                  <div className="mb-5">{card.icon}</div>

                  <h2 className="text-2xl font-bold">{card.title}</h2>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <p className="text-gray-600 leading-7">{card.description}</p>

                  <div className="mt-6">
                    <span className="text-orange-500 font-semibold group-hover:underline">
                      Open →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
