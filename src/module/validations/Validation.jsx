import UseCartId from 'src/hooks/use-cartId';
import ValditionList from './valditionList';

const ValidationPage = () => {
  const { cartId } = UseCartId();

  return <ValditionList cardSelected={cartId} />;
};

export default ValidationPage;
