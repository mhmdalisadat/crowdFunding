import React from 'react';
import { Button, Tooltip } from '@mui/material';
import { getCookie } from 'src/api/cookie';
import UseCartId from 'src/hooks/use-cartId';
import useNavigateStep from 'src/hooks/use-navigate-step';
import PropTypes from 'prop-types';
import Loader from 'src/components/loader';
import SmallError from 'src/components/smallError';
import { handleKeyPress } from 'src/utils/enterKey';
import { useFetchCards } from '../hooks/useFetchCards';
import { formatNumber } from '../../../utils/formatNumbers';
import NewCard from './newCard';

const CardList = ({ setCardSelected }) => {
  const { cardId, setCartId } = UseCartId(null);
  const access = getCookie('access');
  const { incrementPage } = useNavigateStep();

  const { data: cards = [], isLoading, error } = useFetchCards(access);

  const handleCardClick = (id, status) => {
    incrementPage();
    setCartId(+id);
    setCardSelected(true);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <SmallError />;
  }

  return (
    <div className="p-4 sm:p-8 bg-transparent flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-xl rounded-3xl p-4 sm:p-10 max-w-7xl w-full">
        <div className="bg-gray-200 text-white rounded-t-md p-2 text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-700">لیست ها</h1>
        </div>
        <div className="p-4  sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 xl:gap-10 justify-items-center">
            <NewCard setCardSelected={setCardSelected} />
            {cards.length > 0 ? (
              cards.map((card) => (
                <div
                  key={card.id}
                  className={`bg-white shadow-lg rounded-2xl p-4 sm:p-6 flex flex-col justify-between items-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gray-100 min-w-[240px] max-w-[320px] h-[350px] ${
                    cardId === card.id ? 'border-4 border-blue-600' : ''
                  }`}
                  onClick={() => handleCardClick(card.id, card.status)}
                  onKeyPress={handleKeyPress}
                  tabIndex={0}
                  role="button"
                  aria-label={`View card ${card.company_name}`}
                >
                  <div className="flex flex-col items-center flex-grow space-y-4">
                    <h2 className="text-lg sm:text-2xl font-bold text-gray-800">{card.company_name}</h2>
                    <div className="flex flex-col justify-center items-center space-y-4">
                      <p className="text-sm sm:text-lg font-medium text-black">
                        شناسه:
                        <span className="text-sm text-gray-700"> {card.nationalid}</span>
                      </p>
                      <p className="text-sm sm:text-lg font-medium text-black">
                        میزان سرمایه:
                        <span className="text-sm text-gray-700">
                          {' '}
                          {formatNumber(card.registered_capital)}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center text-sm sm:text-lg font-medium text-black">
                      {' '}
                      دانلود قرارداد
                    </div>
                  </div>
                  <div className="flex justify-center gap-4 mt-4">
                    <Tooltip title="مشاهده و ویرایش">
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ textTransform: 'none', padding: '8px 16px', fontSize: '14px' }}
                      >
                        مشاهده و ویرایش
                      </Button>
                    </Tooltip>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 text-lg sm:text-xl">هیچ لیستی موجود نیست</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

CardList.propTypes = {
  setCardSelected: PropTypes.func.isRequired,
};

export default CardList;
