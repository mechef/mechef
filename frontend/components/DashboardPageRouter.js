// @flow

import React from 'react';
import IngredientPage from './IngredientPage';
import DeliveryPage from './DeliveryPage';
import OrderPage from './OrderPage';
import Home from './Home';
import AccountPage from './AccountPage';
import MenuPage from './MenuPage';

type Props = {
  query: string,
}

const DashboardPageRouter = (props: Props) => {
  const query = props.query;
  switch (query) {
    case 'home':
      return <Home />;
    case 'ingredient':
      return <IngredientPage />;
    case 'shipping':
      return <DeliveryPage />;
    case 'order':
      return <OrderPage />;
    case 'account':
      return <AccountPage />;
    case 'menu':
      return <MenuPage />;
    default:
      return <Home />;
  }
};

export default DashboardPageRouter;
