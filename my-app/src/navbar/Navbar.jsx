import { FiShoppingCart } from "react-icons/fi";
import { HiOutlineMenu, HiX } from "react-icons/hi"; // hamburger + close
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-sm px-6 py-4 flex items-center justify-between relative">
      {/* Left Logo */}
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
          E
        </div>
        <span className="font-bold text-lg">E-Comm</span>
      </div>

      {/* Desktop Links */}
      <ul className="hidden md:flex space-x-6 font-medium text-gray-700">
        <li className="text-blue-500 cursor-pointer">HOME</li>
        <li className="hover:text-blue-500 cursor-pointer">BAG</li>
        <li className="hover:text-blue-500 cursor-pointer">SNEAKERS</li>
        <li className="hover:text-blue-500 cursor-pointer">BELT</li>
        <li className="hover:text-blue-500 cursor-pointer">CONTACT</li>
      </ul>

      {/* Right Cart + Mobile Menu Button */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <FiShoppingCart className="text-xl cursor-pointer text-gray-600" />
          <span className="hidden sm:inline text-sm text-gray-600">Items</span>
          <span className="hidden sm:inline text-sm font-semibold">$0.00</span>
        </div>
        {/* Hamburger Button */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX /> : <HiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden z-50">
          <ul className="flex flex-col space-y-4 px-6 py-4 font-medium text-gray-700">
            <li className="text-blue-500 cursor-pointer">HOME</li>
            <li className="hover:text-blue-500 cursor-pointer">BAG</li>
            <li className="hover:text-blue-500 cursor-pointer">SNEAKERS</li>
            <li className="hover:text-blue-500 cursor-pointer">BELT</li>
            <li className="hover:text-blue-500 cursor-pointer">CONTACT</li>
          </ul>
        </div>
      )}
    </nav>
  );
}
