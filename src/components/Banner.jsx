import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Typewriter } from "react-simple-typewriter";

import banner1 from "../assets/bannerImages/bannerImage1.jpg";
import banner2 from "../assets/bannerImages/bannerImage2.jpg";
import banner3 from "../assets/bannerImages/bannerImage3.jpg";
import banner4 from "../assets/bannerImages/bannerImage4.jpg";
import banner5 from "../assets/bannerImages/bannerImage5.jpg";

const Banner = () => {
  const slides = [
    {
      img: banner1,
      heading: "Savor the Bold Flavors of Beef",
      subtext: "Indulge in hearty, slow-cooked goodness made for meat lovers.",
    },
    {
      img: banner2,
      heading: "Perfect Pizza, Every Time",
      subtext: "Crispy crust, melty cheese — handcrafted for your cravings.",
    },
    {
      img: banner3,
      heading: "A Taste of the East",
      subtext: "Delicate spices and sizzling bites straight from the wok.",
    },
    {
      img: banner4,
      heading: "Golden Roast Chicken Delight",
      subtext:
        "Juicy on the inside, crispy on the outside — always comforting.",
    },
    {
      img: banner5,
      heading: "Classic Italian Spaghetti",
      subtext: "Twirl into tradition with rich tomato sauce and fresh herbs.",
    },
  ];

  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        slidesPerView={1}
        spaceBetween={0}
        className="w-full h-[60vh] md:h-[80vh]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[60vh] md:h-[80vh]">
              <img
                src={slide.img}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-opacity-40 flex flex-col justify-center items-center text-white px-4 text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-2 text-white drop-shadow-lg">
                  <Typewriter
                    words={[slide.heading]}
                    loop={false}
                    cursor
                    cursorStyle="_"
                    typeSpeed={50}
                    deleteSpeed={30}
                    delaySpeed={2000}
                  />
                </h2>
                <p className="text-lg md:text-xl text-gray-100 drop-shadow-sm">
                  {slide.subtext}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
