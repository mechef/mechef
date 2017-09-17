import PropTypes from 'prop-types';
import Ingredient from './ingredient';
import DeliveryPage from './deliveryPage';
import OrderPage from './orderPage';
import Home from './home';

const DashboardPageRouter = (props) => {
  const pathname = props.pathname;
  switch (pathname) {
    case '/dashboard':
      return <Home />;
    case '/dashboard/ingredient':
      return <Ingredient />;
    case '/dashboard/shipping':
      return <DeliveryPage />;
    case '/dashboard/order':
      return <OrderPage />;
    default:
      return <Home />;
  }
};

DashboardPageRouter.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default DashboardPageRouter;
