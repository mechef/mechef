import PropTypes from 'prop-types';
import IngredientPage from './ingredientPage';
import DeliveryPage from './deliveryPage';
import OrderPage from './orderPage';
import Home from './home';
import AccountPage from './AccountPage';

const DashboardPageRouter = (props) => {
  const pathname = props.pathname;
  switch (pathname) {
    case '/dashboard':
      return <Home />;
    case '/dashboard/ingredient':
      return <IngredientPage />;
    case '/dashboard/shipping':
      return <DeliveryPage />;
    case '/dashboard/order':
      return <OrderPage />;
    case '/dashboard/account':
      return <AccountPage />;
    default:
      return <Home />;
  }
};

DashboardPageRouter.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default DashboardPageRouter;
