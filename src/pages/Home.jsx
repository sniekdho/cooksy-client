import React from "react";
import Banner from "../components/Banner";
import WhyChooseUs from "../components/WhyChooseUs";
import Reviews from "../components/Reviews";
import TopRecipes from "../components/TopRecipes";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <TopRecipes></TopRecipes>
      <WhyChooseUs></WhyChooseUs>
      <Reviews></Reviews>
    </div>
  );
};

export default Home;
