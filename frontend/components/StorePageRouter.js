// @flow

import React from 'react';
import Store from './Store';
import Product from './Product';

type Props = {
  kitchen: string,
  product?: string,
}

const StorePageRouter = (props: Props) => {
  const { kitchen, product } = props;
  if (product) {
    return <Product kitchen={kitchen} id={product} />;
  }

  return <Store kitchen={kitchen} />;
};

export default StorePageRouter;
