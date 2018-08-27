// @flow

import * as React from 'react';
import Router from 'next/router';
import Rx from 'rxjs/Rx';
import { branch, compose, withHandlers, withState } from 'recompose';

import { connect } from '../state/RxState';
import cartActions from '../actions/cartActions';
import errorActions from '../actions/errorActions';

import KitchenHeader from './KitchenHeader';
import KitchenClosedComponent from './KitchenClosedComponent';
import DishCard from './DishCard';
import DishModal from './DishModal';

import type { DishOrderType } from './DishOrder';
import type { KitchenObject, MenuObject } from '../utils/flowTypes';

import { smallBreak } from '../utils/styleVariables';

type Props = {
  kitchen: KitchenObject,
  addToCart$: (order: DishOrderType) => Rx.Observable,
  onDishSelected: (dishId: string) => any,
  showDishModal: (dishId: string) => any,
  selectedDish: MenuObject,
  closeDishModal: () => any,
  addDishToCart: (dishOrder: DishOrderType) => Rx.Observable,
  isLoading: boolean,
};

const KitchenPage = ({
  kitchen,
  isLoading,
  onDishSelected,
  showDishModal,
  selectedDish,
  closeDishModal,
  addDishToCart,
}: Props) => (
  <div className="kitchen-main">
    <KitchenHeader
      name={kitchen.kitchenName}
      description={kitchen.kitchenDescription}
      profileImage={kitchen.profileImage}
    />
    <div className="kitchen-display">
      {kitchen.menuList && kitchen.menuList.length > 0 ? (
        kitchen.menuList &&
        kitchen.menuList.map(dish => (
          <DishCard
            {...dish}
            key={dish._id}
            onDishSelected={onDishSelected}
            onAddToCartClick={() => showDishModal(dish._id)}
          />
        ))
      ) : !isLoading ? (
        <KitchenClosedComponent />
      ) : null}
      {selectedDish ? (
        <DishModal
          dish={selectedDish}
          onClose={closeDishModal}
          onDishAdded={addDishToCart}
        />
      ) : null}
    </div>
    <style jsx>
      {`
        .kitchen-main {
          padding: 0 16px;
        }
        .kitchen-display {
          margin: 18px auto 40px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        @media (min-width: ${smallBreak}) {
          .kitchen-main {
            padding-left: 110px;
          }
          .kitchen-display {
            margin: 70px auto 144px;
            flex-direction: row;
            align-items: flex-start;
            flex-wrap: wrap;
          }
        }
      `}
    </style>
  </div>
);

const enhance = compose(
  withState('selectedDish', 'updateSelectedDish', null),
  withHandlers({
    onDishSelected: ({ kitchen }) => (dishId: string) => {
      Router.push(
        {
          pathname: '/dish',
          query: {
            kitchenName: kitchen.kitchenName,
            dishId,
          },
        },
        `/kitchen/${kitchen.kitchenName}/dish/${dishId}`,
      );
    },
    addDishToCart: ({ kitchen, addToCart$ }) => (dishOrder: DishOrderType) => {
      const order = {
        kitchen: kitchen.kitchenName,
        ...dishOrder,
      };
      addToCart$(order);
    },
    showDishModal: ({ kitchen, updateSelectedDish }) => (dishId: string) => {
      const selectedDish =
        kitchen.menuList && kitchen.menuList.find(dish => dish._id === dishId);
      updateSelectedDish(selectedDish);
    },
    closeDishModal: ({ updateSelectedDish }) => () => {
      updateSelectedDish(null);
    },
  }),
);

const actionSubjects = {
  ...errorActions,
  ...cartActions,
};

export default connect(
  () => {},
  actionSubjects,
)(enhance(KitchenPage));
