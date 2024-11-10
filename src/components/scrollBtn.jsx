import { FaChevronUp } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // if the user scrolls down, show the button

      // eslint-disable-next-line no-unused-expressions
      window.scrollY > 100 ? setIsVisible(true) : setIsVisible(false);
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    // eslint-disable-next-line no-unused-expressions
    isVisible &&
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
  };

  return (
    <button
      type="button"
      className={`bg-blue-600 hover:bg-gray-700 transition-all duration-300 ease-in-out transform hover:scale-110 hover:-translate-y-3 shadow-lg fixed bottom-6 right-6 rounded-full p-3 outline-none ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={scrollToTop}
    >
      <FaChevronUp className="text-white text-xl" />
    </button>
  );
};

export default ScrollToTopButton;
