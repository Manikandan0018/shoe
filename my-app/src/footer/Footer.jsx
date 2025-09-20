// src/components/Footer.jsx
import React from "react";
import { FaFacebookF, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-200 text-gray-800 pt-10 pb-5 px-5 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo + Description */}
        <div>
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-blue-500 flex items-center justify-center rounded-full text-white font-bold">
              ⬡
            </div>
            <h1 className="text-xl font-bold ml-2">E-Comm</h1>
          </div>
          <p className="text-sm text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever. Since the 1500s, when an unknown printer.
          </p>
        </div>

        {/* Follow Us */}
        <div>
          <h2 className="font-semibold text-lg mb-2">Follow Us</h2>
          <p className="text-sm text-gray-600 mb-3">
            Since the 1500s, when an unknown printer took a galley of type and
            scrambled.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-blue-600 hover:text-blue-800">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="text-blue-400 hover:text-blue-600">
              <FaTwitter size={20} />
            </a>
          </div>
        </div>

        {/* Contact Us */}
        <div>
          <h2 className="font-semibold text-lg mb-2">Contact Us</h2>
          <p className="text-sm">E-Comm, 4578</p>
          <p className="text-sm">Marmora Road,</p>
          <p className="text-sm">Glasgow D04 89GR</p>
        </div>
      </div>

      {/* Links Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
        <div>
          <h3 className="font-semibold mb-3">Infomation</h3>
          <ul className="space-y-2 text-sm">
            <li>About Us</li>
            <li>Infomation</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Service</h3>
          <ul className="space-y-2 text-sm">
            <li>About Us</li>
            <li>Infomation</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3">My Account</h3>
          <ul className="space-y-2 text-sm">
            <li>About Us</li>
            <li>Infomation</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Our Offers</h3>
          <ul className="space-y-2 text-sm">
            <li>About Us</li>
            <li>Infomation</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-300 mt-10 pt-5 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>© 2018 Ecommerce theme by www.bisenbaev.com</p>
        <div className="flex gap-3 mt-3 md:mt-0">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Western_Union_logo.svg/120px-Western_Union_logo.svg.png"
            alt="Western Union"
            className="h-6"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/120px-Mastercard-logo.svg.png"
            alt="Mastercard"
            className="h-6"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/120px-PayPal.svg.png"
            alt="Paypal"
            className="h-6"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/120px-Visa.svg.png"
            alt="Visa"
            className="h-6"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
