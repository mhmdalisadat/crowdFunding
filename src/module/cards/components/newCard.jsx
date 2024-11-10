import React from 'react';
import { FaPlus } from 'react-icons/fa';
import UseCartId from 'src/hooks/use-cartId';
import useNavigateStep from 'src/hooks/use-navigate-step';
import { handleKeyPress } from 'src/utils/enterKey';
import PropTypes from 'prop-types';

const NewCard = ({ setCardSelected }) => {
  const { cardId, setCartId } = UseCartId(null);
  const { incrementPage } = useNavigateStep();

  const handleNewCardClick = () => {
    setCartId(null);
    incrementPage();
    setCartId(+cardId);
    setCardSelected(true);
  };

  return (
    <div
      className="bg-white shadow-lg rounded-2xl p-2 flex flex-col  justify-center items-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gray-100 w-[240px] h-[350px]"
      onClick={handleNewCardClick}
      onKeyDown={(e) => handleKeyPress(e, handleNewCardClick)}
      tabIndex={0}
      role="button"
      aria-label="افزودن کارت جدید"
    >
      <FaPlus className="text-5xl text-blue-700 mb-4" />
      <h2 className="text-2xl font-bold text-gray-800">افزودن لیست جدید</h2>
    </div>
  );
};

NewCard.propTypes = {
  setCardSelected: PropTypes.func.isRequired,
};

export default NewCard;
