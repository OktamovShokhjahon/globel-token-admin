"use client";

import { useState } from "react";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/outline";
import { v4 as uuidv4 } from "uuid";

const InvestmentPlans = ({ investmentPlans, setInvestmentPlans }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [formData, setFormData] = useState({
    durationYears: "",
    initialTokens: "",
    initialPrice: "",
    finalTokens: "",
    finalPrice: "",
    currency: "₹",
    slug: "",
  });

  const handleOpenModal = (plan = null) => {
    if (plan) {
      setCurrentPlan(plan);
      setFormData({
        durationYears: plan.durationYears,
        initialTokens: plan.initialTokens,
        initialPrice: plan.initialPrice,
        finalTokens: plan.finalTokens,
        finalPrice: plan.finalPrice,
        currency: plan.currency,
        slug: plan.slug,
      });
    } else {
      setCurrentPlan(null);
      setFormData({
        durationYears: "",
        initialTokens: "",
        initialPrice: "",
        finalTokens: "",
        finalPrice: "",
        currency: "₹",
        slug: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentPlan(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // For numeric fields, convert to appropriate type
    if (
      [
        "durationYears",
        "initialTokens",
        "initialPrice",
        "finalTokens",
        "finalPrice",
      ].includes(name)
    ) {
      setFormData({
        ...formData,
        [name]: value === "" ? "" : Number.parseInt(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentPlan) {
      // Update existing plan
      setInvestmentPlans((plans) =>
        plans.map((plan) =>
          plan.id === currentPlan.id
            ? { ...plan, ...formData, updatedAt: new Date() }
            : plan
        )
      );
    } else {
      // Add new plan
      const newPlan = {
        id: uuidv4(),
        ...formData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setInvestmentPlans([...investmentPlans, newPlan]);
    }

    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (
      window.confirm("Are you sure you want to delete this investment plan?")
    ) {
      setInvestmentPlans(investmentPlans.filter((plan) => plan.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Investment Plans</h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Investment Plan
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration (Years)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Initial Tokens
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Initial Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Final Tokens
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Final Price
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {investmentPlans.map((plan) => (
              <tr key={plan.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {plan.durationYears}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {plan.initialTokens}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {plan.currency}
                  {plan.initialPrice}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {plan.finalTokens}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {plan.currency}
                  {plan.finalPrice}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleOpenModal(plan)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(plan.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for adding/editing investment plans */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">
              {currentPlan ? "Edit Investment Plan" : "Add Investment Plan"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="durationYears"
                  >
                    Duration (Years)
                  </label>
                  <input
                    type="number"
                    id="durationYears"
                    name="durationYears"
                    value={formData.durationYears}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="slug"
                  >
                    Slug
                  </label>
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="initialTokens"
                  >
                    Initial Tokens
                  </label>
                  <input
                    type="number"
                    id="initialTokens"
                    name="initialTokens"
                    value={formData.initialTokens}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="initialPrice"
                  >
                    Initial Price
                  </label>
                  <input
                    type="number"
                    id="initialPrice"
                    name="initialPrice"
                    value={formData.initialPrice}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="finalTokens"
                  >
                    Final Tokens
                  </label>
                  <input
                    type="number"
                    id="finalTokens"
                    name="finalTokens"
                    value={formData.finalTokens}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="finalPrice"
                  >
                    Final Price
                  </label>
                  <input
                    type="number"
                    id="finalPrice"
                    name="finalPrice"
                    value={formData.finalPrice}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="currency"
                  >
                    Currency
                  </label>
                  <input
                    type="text"
                    id="currency"
                    name="currency"
                    value={formData.currency}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  {currentPlan ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentPlans;
