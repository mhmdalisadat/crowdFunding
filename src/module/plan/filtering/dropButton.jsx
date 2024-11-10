import { useState } from 'react';
import { IoChevronDownCircleOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const DropButton = ({ planStatusOptions, onSelectStatus, selectedStatuses }) => {
  const [isOpen, setIsOpen] = useState(false);

  const HandleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="p-3 w-full flex rounded-2xl z-50">
      <div className="relative inline-block text-left z-50">
        <button
          onClick={HandleOpen}
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          وضعیت طرح
          <IoChevronDownCircleOutline
            aria-hidden="true"
            className={`h-5 w-5 transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            } text-gray-400`}
          />
        </button>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
          >
            <div className="py-2">
              {planStatusOptions.map((item) => (
                <div key={item.id} className="px-4 py-1">
                  <label
                    htmlFor={item.id.toString()}
                    className="flex text-sm justify-between items-center cursor-pointer text-gray-700"
                  >
                    <span>{item.label}</span>
                    <input
                      type="checkbox"
                      checked={selectedStatuses.includes(item.id)}
                      onChange={() => onSelectStatus(item.id)}
                      className="checkbox border-gray-300"
                    />
                  </label>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

DropButton.propTypes = {
  planStatusOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelectStatus: PropTypes.func.isRequired,
  selectedStatuses: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default DropButton;
