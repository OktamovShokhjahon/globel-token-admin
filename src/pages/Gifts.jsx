"use client";

import { useState } from "react";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/outline";
import { v4 as uuidv4 } from "uuid";

const Gifts = ({ gifts, setGifts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentGift, setCurrentGift] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    tokens: "",
    price: "",
    description: "",
    currency: "₹",
    slug: "",
    img: "",
  });

  const handleOpenModal = (gift = null) => {
    if (gift) {
      setCurrentGift(gift);
      setFormData({
        name: gift.name,
        tokens: gift.tokens,
        price: gift.price,
        description: gift.description,
        currency: gift.currency,
        slug: gift.slug,
        img: gift.img,
      });
    } else {
      setCurrentGift(null);
      setFormData({
        name: "",
        tokens: "",
        price: "",
        description: "",
        currency: "₹",
        slug: "",
        img: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentGift(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // For numeric fields, convert to appropriate type
    if (["tokens", "price"].includes(name)) {
      const numValue =
        name === "tokens" ? Number.parseFloat(value) : Number.parseInt(value);
      setFormData({
        ...formData,
        [name]: value === "" ? "" : numValue,
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

    if (currentGift) {
      // Update existing gift
      setGifts(
        gifts.map((gift) =>
          gift.id === currentGift.id
            ? { ...gift, ...formData, updatedAt: new Date() }
            : gift
        )
      );
    } else {
      // Add new gift
      const newGift = {
        id: uuidv4(),
        ...formData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setGifts([...gifts, newGift]);
    }

    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this gift?")) {
      setGifts(gifts.filter((gift) => gift.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gifts</h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Gift
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tokens
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                Description
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {gifts.map((gift) => (
              <tr key={gift.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={gift.img || "/placeholder.svg"}
                    alt={gift.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{gift.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{gift.tokens}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {gift.currency}
                  {gift.price}
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <div className="max-w-xs truncate">{gift.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleOpenModal(gift)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(gift.id)}
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

      {/* Modal for adding/editing gifts */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-lg max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {currentGift ? "Edit Gift" : "Add Gift"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
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
                    htmlFor="tokens"
                  >
                    Tokens
                  </label>
                  <input
                    type="number"
                    id="tokens"
                    name="tokens"
                    value={formData.tokens}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    step="0.01"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="price"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
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
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="img"
                  >
                    Image URL
                  </label>
                  <input
                    type="text"
                    id="img"
                    name="img"
                    value={formData.img}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4 md:col-span-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    rows="3"
                  ></textarea>
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
                  {currentGift ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gifts;
