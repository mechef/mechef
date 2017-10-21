// @flow

import React from 'react';
import IngredientPage from './IngredientPage';
import DeliveryPage from './DeliveryPage';
import OrderPage from './OrderPage';
import Home from './Home';
import AccountPage from './AccountPage';

type Props = {
  pathname: string,
}

const DashboardPageRouter = (props: Props) => {
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

export default DashboardPageRouter;
