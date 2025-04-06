"use client";
import {
  HomeIcon,
  TagIcon,
  ShoppingBagIcon,
  ChartBarIcon,
  GiftIcon,
} from "@heroicons/react/outline";

const Sidebar = ({ activePage, setActivePage }) => {
  const menuItems = [
    { id: "dashboard", name: "Dashboard", icon: HomeIcon },
    { id: "categories", name: "Categories", icon: TagIcon },
    { id: "products", name: "Products", icon: ShoppingBagIcon },
    { id: "investment-plans", name: "Investment Plans", icon: ChartBarIcon },
    { id: "gifts", name: "Gifts", icon: GiftIcon },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>
      <nav className="mt-8">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id} className="mb-2">
              <button
                onClick={() => setActivePage(item.id)}
                className={`flex items-center w-full px-4 py-3 ${
                  activePage === item.id
                    ? "bg-gray-700 text-white"
                    : "text-gray-400 hover:bg-gray-700 hover:text-white"
                } rounded-lg transition-colors`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
