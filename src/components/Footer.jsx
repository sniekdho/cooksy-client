import React from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import footerLogo from "../assets/icons/cookingFooterLogo.png";

const Footer = () => {
  return (
    <div className="bg-secondary text-center text-black p-8">
      <div className="space-y-2">
        <img className="w-20 h-20 mx-auto" src={footerLogo} alt="Cooking" />
        <h1 className="text-2xl font-bold">
          <span className="text-pink-500">Cook</span>
          <span className="text-accent">Sy</span>
        </h1>
      </div>

      <div className="mt-4 text-sm text-gray-800 space-y-1 font-medium">
        <p>
          <span className="font-semibold">Email:</span> sniekdho@gmail.com
        </p>
        <p>
          <span className="font-semibold">Phone:</span> +880 1717 910578
        </p>
        <p>
          <span className="font-semibold">Address:</span> Mymensingh, Bangladesh
        </p>
      </div>

      <div className="flex justify-center mt-5 space-x-5">
        <a href="https://www.facebook.com/sniekdho.shafiq/" target="_blank">
          <FaFacebook size={30} className="text-pink-500 hover:text-pink-600" />
        </a>
        <a href="https://github.com/sniekdho" target="_blank">
          <FaGithub size={30} className="text-pink-500 hover:text-pink-600" />
        </a>
        <a
          href="https://www.linkedin.com/in/md-shafiqul-islam-754a19183/"
          target="_blank"
        >
          <FaLinkedin size={30} className="text-pink-500 hover:text-pink-600" />
        </a>
      </div>

      <div className="mt-4">
        <p className="text-sm font-semibold">
          © {new Date().getFullYear()} CookSy — All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
