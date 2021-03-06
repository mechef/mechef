// @flow

import React from 'react';

import KitchenPage from './KitchenPage';
import DishPage from './DishPage';

import type { KitchenObject } from '../utils/flowTypes';
import { IMAGE_URL } from '../utils/constants';

import { smallBreak } from '../utils/styleVariables';

type Props = {
  query: {
    kitchen: string,
    dish?: string,
  },
  kitchen: KitchenObject,
};

const KitchenPageRouter = ({ kitchen, query }: Props) => (
  <div className="kitchen">
    <div className={`kitchen-cover${query.dish ? '--hidden' : ''}`} />
    {!query.dish ? (
      <KitchenPage kitchen={kitchen} kitchenName={query.kitchen} />
    ) : (
      <DishPage kitchen={kitchen} dishId={query.dish} />
    )}
    <style jsx>
      {`
        .kitchen {
          width: 100%;
          position: relative;
        }
        .kitchen-cover,
        .kitchen-cover--hidden {
          height: 200px;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          background-image: url('${
            kitchen && kitchen.coverPhoto
              ? `${IMAGE_URL}/${kitchen.coverPhoto}`
              : '/static/img/pancake.jpg'
          }'), url('/static/img/pancake.jpg');
        }

        .kitchen-cover--hidden {
          display: none;
        }

        @media (min-width: ${smallBreak}) {
          .kitchen-cover,
          .kitchen-cover--hidden {
            height: 250px;
            display: block;
          }
        }
      `}
    </style>
  </div>
);

export default KitchenPageRouter;
