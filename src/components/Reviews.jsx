import React from "react";
import user1 from "../assets/users/user1.jpg";
import user2 from "../assets/users/user2.jpg";
import user3 from "../assets/users/user3.jpg";

const Reviews = () => {
  const feedBacks = [
    {
      name: "Sarah Martin",
      comment:
        "CookSy made dinner prep so easy! The recipes are simple and the results are amazing. My family loved it!",
      image: user1,
    },
    {
      name: "Ahmed Khan",
      comment:
        "I never knew healthy food could taste this good. CookSy’s dishes are now a weekly routine in my home.",
      image: user2,
    },
    {
      name: "Lina Morgan",
      comment:
        "As a student, I needed something fast and budget-friendly. CookSy delivered just that — highly recommended!",
      image: user3,
    },
  ];

  return (
    <section className="bg-base-100 py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-10">
          What Our Users Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {feedBacks.map((feedback, idx) => (
            <div
              key={idx}
              className="bg-base-200 p-6 rounded-lg shadow hover:shadow-md transition duration-300"
            >
              <div className="flex flex-col items-center space-y-4">
                <img
                  src={feedback.image}
                  alt={feedback.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-accent"
                />
                <p className="text-base-content italic text-sm text-center">
                  "{feedback.comment}"
                </p>
                <h4 className="text-lg font-semibold text-secondary">
                  {feedback.name}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
