import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

const CustomDropdown = ({ options, placeholder, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    onChange?.(option);
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4
        bg-surface-light border border-gray-700 rounded-xl
        text-white focus:outline-none focus:border-purple-500
        transition-colors"
      >
        <span className={selected ? "text-white" : "text-gray-500"}>
          {selected || placeholder}
        </span>
        <FaChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute z-50 mt-2 w-full
          bg-dark-900 border border-gray-700 rounded-xl
          shadow-xl overflow-hidden"
        >
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className="w-full text-left px-5 py-3
              text-white hover:bg-purple-500/10
              transition-colors"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
