"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import InvestmentPlans from "./pages/InvestmentPlans";
import Gifts from "./pages/Gifts";
import {
  mockCategories,
  mockProducts,
  mockInvestmentPlans,
  mockGifts,
} from "./data/mockData";

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [categories, setCategories] = useState(mockCategories);
  const [products, setProducts] = useState(mockProducts);
  const [investmentPlans, setInvestmentPlans] = useState(mockInvestmentPlans);
  const [gifts, setGifts] = useState(mockGifts);

  // Function to render the active page
  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <Dashboard
            categoriesCount={categories.length}
            productsCount={products.length}
            plansCount={investmentPlans.length}
            giftsCount={gifts.length}
          />
        );
      case "categories":
        return (
          <Categories categories={categories} setCategories={setCategories} />
        );
      case "products":
        return (
          <Products
            products={products}
            setProducts={setProducts}
            categories={categories}
          />
        );
      case "investment-plans":
        return (
          <InvestmentPlans
            investmentPlans={investmentPlans}
            setInvestmentPlans={setInvestmentPlans}
          />
        );
      case "gifts":
        return <Gifts gifts={gifts} setGifts={setGifts} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 overflow-auto">
        <div className="p-6">{renderPage()}</div>
      </div>
    </div>
  );
}

export default App;
