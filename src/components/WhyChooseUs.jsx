import React from "react";
import { FaClock, FaLeaf, FaStar, FaUtensils } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaUtensils size={32} className="text-accent" />,
      title: "Expert Recipes",
      desc: "Crafted by professional chefs to guarantee perfect results every time.",
    },
    {
      icon: <FaLeaf size={32} className="text-accent" />,
      title: "Fresh Ingredients",
      desc: "We focus on seasonal, healthy, and organic ingredients in all recipes.",
    },
    {
      icon: <FaClock size={32} className="text-accent" />,
      title: "Quick & Easy",
      desc: "Simple steps and clear instructions — perfect for busy lifestyles.",
    },
    {
      icon: <FaStar size={32} className="text-accent" />,
      title: "Top Rated Dishes",
      desc: "Tried, tested, and loved by thousands of food lovers.",
    },
  ];

  return (
    <section className="bg-gray-50 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-secondary">
          Why Choose <span className="text-accent">CookSy?</span>
        </h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          CookSy brings you chef-curated recipes that are healthy, delicious,
          and easy to follow — whether you're a beginner or an experienced cook.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
