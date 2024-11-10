import { Helmet } from 'react-helmet-async';
import AppView from './app-view';

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> ایساتیس کراد </title>
      </Helmet>
      <AppView />
    </>
  );
}
