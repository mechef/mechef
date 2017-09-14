import PropTypes from 'prop-types';
import Ingredient from './ingredient';
import Home from './home';

const DashboardPageRouter = (props) => {
  const pathname = props.pathname;
  switch (pathname) {
    case '/dashboard':
      return <Home />;
    case '/dashboard/ingredient':
      return <Ingredient />;
    default:
      return <Home />;
  }
};

DashboardPageRouter.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default DashboardPageRouter;
