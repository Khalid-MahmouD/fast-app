import CartOverview from '../features/cart/CartOverview';
import Header from './Header';
import { Outlet, useNavigation } from 'react-router-dom';
import Loader from './Loader';
function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      {/* {true && <Loader />} */}

      <Header />
      <div className="overflow-scroll">
        <main>
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
