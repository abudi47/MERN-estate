import React from "react";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaTwitch,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const socialItems = [
    { name: "Facebook", icon: FaFacebook, link: "https://www.facebook.com/" },
    {
      name: "Instagram",
      icon: FaInstagram,
      link: "https://www.instagram.com/",
    },
    { name: "Twitter", icon: FaTwitter, link: "https://twitter.com/" },
    { name: "Twitch", icon: FaTwitch, link: "https://www.twitch.tv/" },
    { name: "Github", icon: FaGithub, link: "https://github.com/" },
  ];

  return (
    <footer className="w-full bg-slate-900 text-gray-300 py-8 px-4">
      <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Contact Info */}
        <address className="text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-xl font-semibold mb-2">
            Acme Rocket-Powered Products, Inc.
          </h2>
          <p>
            555 Astro Way
            <br />
            Fairfield, New Jersey 12345-5555
          </p>
          <p>
            Email:{" "}
            <a
              href="mailto:inquiries@acmerockets.com"
              className="hover:underline"
            >
              inquiries@acmerockets.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+15555555555" className="hover:underline">
              (555) 555-5555
            </a>
          </p>
        </address>

        {/* Navigation Links */}
        <nav
          className="hidden md:flex flex-col gap-4 text-center md:text-left"
          aria-label="footer navigation"
        >
          <Link to="#home" className="hover:opacity-90">
            Home
          </Link>
          <Link to="#about" className="hover:opacity-90">
            About Us
          </Link>
          <Link to="#solutions" className="hover:opacity-90">
            Solutions
          </Link>
          <Link to="#testimonials" className="hover:opacity-90">
            Testimonials
          </Link>
          <Link to="#contact" className="hover:opacity-90">
            Contact Us
          </Link>
        </nav>

        {/* Footer Details */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="font-bold text-xl mb-2">Smart-Recruit</p>
          <p className="mb-4">© 2024 IE Networks, All rights reserved</p>
          <p className="text-sm">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-6 mb-4 md:mb-0">
          {socialItems.map((item, index) => (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.name}
              key={index}
            >
              <item.icon className="text-2xl hover:text-white transition-colors duration-300" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
