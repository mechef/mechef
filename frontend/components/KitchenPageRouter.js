// @flow

import React from 'react';
import KitchenFront from './KitchenFront';
import DishPage from './DishPage';

type Props = {
  kitchen: string,
  dish?: string,
}

const KitchenPageRouter = (props: Props) => {
  const { kitchen, dish } = props;
  if (dish) {
    return <DishPage kitchen={kitchen} id={dish} />;
  }

  return <KitchenFront kitchen={kitchen} />;
};

export default KitchenPageRouter;
