import PropTypes from 'prop-types';
import HistoryList from './historyList';

const History = ({ cardSelected }) => {
  return <HistoryList cardSelected={cardSelected} />;
};

History.propTypes = {
  cardSelected: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
};
export default History;
