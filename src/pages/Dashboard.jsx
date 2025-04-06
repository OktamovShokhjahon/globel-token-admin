import {
  TagIcon,
  ShoppingBagIcon,
  ChartBarIcon,
  GiftIcon,
} from "@heroicons/react/outline";

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className={`bg-white rounded-lg shadow p-6 flex items-center`}>
    <div className={`p-3 rounded-full ${color} text-white mr-4`}>
      <Icon className="w-8 h-8" />
    </div>
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const Dashboard = ({
  categoriesCount,
  productsCount,
  plansCount,
  giftsCount,
}) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Categories"
          value={categoriesCount || 0}
          icon={TagIcon}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Products"
          value={productsCount || 0}
          icon={ShoppingBagIcon}
          color="bg-green-500"
        />
        <StatCard
          title="Investment Plans"
          value={plansCount || 0}
          icon={ChartBarIcon}
          color="bg-purple-500"
        />
        <StatCard
          title="Gifts"
          value={giftsCount || 0}
          icon={GiftIcon}
          color="bg-red-500"
        />
      </div>
    </div>
  );
};

export default Dashboard;
