import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Film,
  TrendingUp,
  DollarSign,
  BarChart3,
  Settings,
} from "lucide-react";
import Header from "./Header";
import { getDashboardStats, getAllUsers } from "../Utils/firestoreUtils";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeSubscriptions: 0,
    totalRevenue: "0.00",
    newSignups: 0,
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is admin
    if (!user.isAdmin) {
      navigate("/browse");
      return;
    }

    // Fetch dashboard data
    const fetchDashboardData = async () => {
      setLoading(true);

      // Get stats
      const statsResult = await getDashboardStats();
      if (statsResult.success) {
        setStats(statsResult.data);
      }

      // Get recent users
      const usersResult = await getAllUsers();
      if (usersResult.success) {
        // Get the 5 most recent users
        const recent = usersResult.data.slice(0, 5).map((user) => {
          const createdAt = new Date(user.createdAt);
          const now = new Date();
          const diffMs = now - createdAt;
          const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
          const diffDays = Math.floor(diffHours / 24);

          let joinedText;
          if (diffDays > 0) {
            joinedText = `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
          } else if (diffHours > 0) {
            joinedText = `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
          } else {
            joinedText = "Just now";
          }

          return {
            id: user.id,
            email: user.email,
            plan: user.subscription?.plan
              ? user.subscription.plan.charAt(0).toUpperCase() +
                user.subscription.plan.slice(1)
              : "No Plan",
            joined: joinedText,
          };
        });
        setRecentUsers(recent);
      }

      setLoading(false);
    };

    fetchDashboardData();
  }, [user.isAdmin, navigate]);

  const statsCards = [
    {
      title: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Active Subscriptions",
      value: stats.activeSubscriptions.toLocaleString(),
      icon: TrendingUp,
      color: "bg-green-500",
    },
    {
      title: "Monthly Revenue",
      value: stats.totalRevenue,
      icon: DollarSign,
      color: "bg-yellow-500",
    },
    {
      title: "New Signups (Today)",
      value: stats.newSignups,
      icon: BarChart3,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="pt-20 md:pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-400">
                Welcome back, {user.userInfo?.email}
              </p>
            </div>
            <button className="flex items-center space-x-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg transition">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statsCards.map((stat, index) => (
              <div
                key={index}
                className="bg-zinc-900 rounded-lg p-6 border border-zinc-800 hover:border-zinc-700 transition"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-gray-400 text-sm mb-1">{stat.title}</h3>
                <p className="text-2xl md:text-3xl font-bold text-white">
                  {loading ? (
                    <span className="text-gray-500">Loading...</span>
                  ) : (
                    stat.value
                  )}
                </p>
              </div>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Users */}
            <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Recent Users
                </h2>
                <button className="text-red-500 hover:text-red-400 text-sm">
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {loading ? (
                  <div className="text-center py-8 text-gray-400">
                    Loading users...
                  </div>
                ) : recentUsers.length > 0 ? (
                  recentUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg"
                    >
                      <div>
                        <p className="text-white font-medium">{user.email}</p>
                        <p className="text-gray-400 text-sm">{user.joined}</p>
                      </div>
                      <span
                        className={`text-white text-xs px-3 py-1 rounded-full ${
                          user.plan === "No Plan" ? "bg-gray-600" : "bg-red-600"
                        }`}
                      >
                        {user.plan}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    No users found
                  </div>
                )}
              </div>
            </div>

            {/* User Plan Distribution */}
            <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Subscription Plans
                </h2>
              </div>
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-8 text-gray-400">
                    Loading stats...
                  </div>
                ) : (
                  <>
                    {["basic", "standard", "premium"].map((plan) => {
                      const count = recentUsers.filter(
                        (u) => u.plan.toLowerCase() === plan
                      ).length;
                      const percentage =
                        recentUsers.length > 0
                          ? Math.round(
                              (count / stats.activeSubscriptions) * 100
                            )
                          : 0;

                      return (
                        <div key={plan}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white capitalize">
                              {plan}
                            </span>
                            <span className="text-gray-400 text-sm">
                              {count} users
                            </span>
                          </div>
                          <div className="w-full bg-zinc-800 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                plan === "basic"
                                  ? "bg-blue-500"
                                  : plan === "standard"
                                  ? "bg-green-500"
                                  : "bg-yellow-500"
                              }`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-zinc-900 rounded-lg p-6 border border-zinc-800">
            <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="bg-zinc-800 hover:bg-zinc-700 text-white p-4 rounded-lg transition text-center">
                <Users className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm">Manage Users</span>
              </button>
              <button className="bg-zinc-800 hover:bg-zinc-700 text-white p-4 rounded-lg transition text-center">
                <Film className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm">Add Content</span>
              </button>
              <button className="bg-zinc-800 hover:bg-zinc-700 text-white p-4 rounded-lg transition text-center">
                <BarChart3 className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm">Analytics</span>
              </button>
              <button className="bg-zinc-800 hover:bg-zinc-700 text-white p-4 rounded-lg transition text-center">
                <Settings className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm">Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
