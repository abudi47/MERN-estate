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
    { name: "Github", icon: FaGithub, link: "https://github.com/abudi47 " },
  ];

  return (
    <footer className="w-full bg-slate-900 mt-10 text-gray-300 py-8 px-4">
      <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Contact Info */}
        <address className="text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-xl font-semibold mb-2">Abd Estate, Inc.</h2>
          <p>
            Adama
            <br />
            ASTU, 12345-5555
          </p>
          <p>
            Email:{" "}
            <a href="mailto:abduselamt47@gmail.com" className="hover:underline">
              abduselamt47@gmail.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+251983092696" className="hover:underline">
              +251983092696
            </a>
          </p>
        </address>

        {/* Navigation Links */}
        

        {/* Footer Details */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="font-bold text-xl mb-2">Abd real estate</p>
          <p className="mb-4">© 2025 abd, All rights reserved</p>
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
