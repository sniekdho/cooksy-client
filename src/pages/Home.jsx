import React from "react";
import Banner from "../components/Banner";
import WhyChooseUs from "../components/WhyChooseUs";
import Reviews from "../components/Reviews";
import TopRecipes from "../components/TopRecipes";
import { Fade, Slide, Zoom } from "react-awesome-reveal";
import Newsletter from "../components/Newsletter";

const Home = () => {
  return (
    <div className="space-y-16">
      {/* Smooth fade-in for the hero section */}
      <Fade direction="up" delay={100} triggerOnce>
        <Banner />
      </Fade>

      {/* Slide in the top recipes from the left */}
      <Slide direction="left" delay={150} triggerOnce>
        <TopRecipes />
      </Slide>

      {/* Zoom in to highlight Why Choose Us */}
      <Zoom delay={200} triggerOnce>
        <WhyChooseUs />
      </Zoom>

      {/* Fade in reviews with a slight delay */}
      <Fade direction="up" delay={250} triggerOnce>
        <Reviews />
      </Fade>

      {/* Fade right newsletter with a slight delay */}
      <Slide direction="right" delay={300} triggerOnce>
        <Newsletter />
      </Slide>
    </div>
  );
};

export default Home;
