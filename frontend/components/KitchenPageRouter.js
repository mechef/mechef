// @flow

import React from 'react';

import KitchenPage from './KitchenPage';
import DishPage from './DishPage';

import type { KitchenObject } from '../utils/flowTypes';
import { IMAGE_URL } from '../utils/constants';

type Props = {
  query: {
    kitchen: string,
    dish?: string,
  },
  kitchen: KitchenObject,
};

const KitchenPageRouter = ({ kitchen, query }: Props) => (
  <div className="kitchen">
    <div className="kitchen-cover" />
    {
      !query.dish ?
        <KitchenPage kitchen={kitchen} kitchenName={query.kitchen} /> :
        <DishPage kitchen={kitchen} dishId={query.dish} />
    }
    <style jsx>
      {`
        .kitchen {
          min-width: 1024px;
        }
        .kitchen-cover {
          display: block;
          height: 250px;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          background-image: url('${kitchen && kitchen.coverPhoto ? `${IMAGE_URL}/${kitchen.coverPhoto}` : '/static/pancake.jpg'}'), url('/static/pancake.jpg');
        }
      `}
    </style>
  </div>
);

export default KitchenPageRouter;
