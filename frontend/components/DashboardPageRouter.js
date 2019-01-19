// @flow

import dynamic from 'next/dynamic';
import React from 'react';

import Home from './Home';
const IngredientPage = dynamic(() => import('./IngredientPage'));
const DeliveryPage = dynamic(() => import('./DeliveryPage'));
const OrderPage = dynamic(() => import('./OrderPage'));
const MenuPage = dynamic(() => import('./MenuPage'));
const AccountPage = dynamic(() => import('./AccountPage'));

type Props = {
  query: string,
};

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
