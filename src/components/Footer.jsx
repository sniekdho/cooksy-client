import React from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import footerLogo from "../assets/icons/cookingNavLogo.png";

const Footer = () => {
  return (
    <footer className="bg-base-300 text-center text-base-content py-10 px-6">
      {/* Logo and Branding */}
      <div className="mb-6 space-y-2">
        <img className="w-20 h-20 mx-auto" src={footerLogo} alt="Cooking" />
        <h1 className="text-3xl font-bold">
          <span className="text-primary">Cook</span>
          <span className="text-secondary">Sy</span>
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-wrap justify-center gap-8 font-semibold mb-6">
        <a
          href="/"
          className="hover:text-accent transition-colors duration-200"
        >
          Home
        </a>
        <a
          href="/about"
          className="hover:text-accent transition-colors duration-200"
        >
          About Us
        </a>
        <a
          href="/contact"
          className="hover:text-accent transition-colors duration-200"
        >
          Contact
        </a>
        <a
          href="/support"
          className="hover:text-accent transition-colors duration-200"
        >
          Support
        </a>
      </nav>

      {/* Contact Info */}
      <div className="mb-6 text-sm space-y-2 font-medium">
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

      {/* Social Icons */}
      <div className="flex justify-center space-x-8 mb-6">
        <a
          href="https://www.facebook.com/sniekdho.shafiq/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="text-primary hover:text-accent transition-colors duration-200"
        >
          <FaFacebook size={30} />
        </a>
        <a
          href="https://github.com/sniekdho"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-primary hover:text-accent transition-colors duration-200"
        >
          <FaGithub size={30} />
        </a>
        <a
          href="https://www.linkedin.com/in/md-shafiqul-islam-754a19183/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-primary hover:text-accent transition-colors duration-200"
        >
          <FaLinkedin size={30} />
        </a>
      </div>

      {/* Copyright */}
      <div>
        <p className="text-sm font-semibold text-base-content/70">
          © {new Date().getFullYear()} CookSy — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
