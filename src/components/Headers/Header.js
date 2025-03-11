import React from "react";

const categories = [
  { name: "Kilos", img: "https://via.placeholder.com/50" },
  { name: "Mobiles", img: "https://via.placeholder.com/50" },
  { name: "Fashion", img: "https://via.placeholder.com/50" },
  { name: "Electronics", img: "https://via.placeholder.com/50" },
  { name: "Home & Furniture", img: "https://via.placeholder.com/50" },
  { name: "Appliances", img: "https://via.placeholder.com/50" },
  { name: "Beauty, Toys & More", img: "https://via.placeholder.com/50" },
  { name: "Two Wheelers", img: "https://via.placeholder.com/50" },
];

const Header = () => {
  return (
    <div>
      {/* Categories */}
      <div className="flex overflow-x-auto p-4 bg-gray-100">
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col items-center mx-4">
            <img src={category.img} alt={category.name} className="w-12 h-12" />
            <p className="text-sm">{category.name}</p>
          </div>
        ))}
      </div>

      {/* Banner */}
      <div className="relative">
        <img
          src="https://via.placeholder.com/1200x400"
          alt="Banner"
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
          Big Saving Days - Up to 50% Off!
        </div>
      </div>
    </div>
  );
};

export default Header;
