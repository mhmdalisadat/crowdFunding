import UseCartId from 'src/hooks/use-cartId';
import useNavigateStep from 'src/hooks/use-navigate-step'; // وارد کردن هوک
import Attachement from '../feuture/attachement';

const ResumePage = () => {
  const { cartId } = UseCartId();
  const { incrementPage } = useNavigateStep();

  return <Attachement incrementPage={incrementPage} cartId={cartId} />;
};


export default ResumePage;
