// @flow

import * as React from 'react';
import Router from 'next/router';
import Rx from 'rxjs/Rx';

import { connect } from '../state/RxState';
import kitchenActions from '../actions/kitchenActions';
import errorActions from '../actions/errorActions';

import KitchenHeader from './KitchenHeader';
import KitchenClosedComponent from './KitchenClosedComponent'
import DishCard from './DishCard';
import DishModal from './DishModal';

import type { KitchenObject, MenuObject } from '../utils/flowTypes';
import { IMAGE_URL } from '../utils/constants';

type Props = {
  kitchenQuery: string,
  kitchen: KitchenObject,
};

type State = {
  displayedProduct?: MenuObject,
};

class KitchenPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      displayedProduct: undefined,
    };

    this.showDishModal = this.showDishModal.bind(this);
    this.closeDishModal = this.closeDishModal.bind(this);
    this.onDishSelected = this.onDishSelected.bind(this);
  }

  showDishModal: Function;
  showDishModal(dishId: string) {
    const found = this.props.kitchen.menuList && this.props.kitchen.menuList.find((dish) => dish._id == dishId);
    this.setState({ displayedProduct: found });
  }

  closeDishModal: Function;
  closeDishModal() {
    console.log('onClose')
    this.setState({ displayedProduct: undefined });
  }

  onDishSelected: Function;
  onDishSelected(dishId: string) {
    Router.push({
        pathname: '/kitchen',
        query: {
          kitchen: this.props.kitchenQuery,
          dish: dishId,
        },
      },
      `/kitchen/${this.props.kitchenQuery}/${dishId}`
    );
    // if (this.props.global.backArrow.isShow) {
    //   this.props.toggleBackArrow$('');
    // }
  }

  renderDishes: Function;
  renderDishes = () => {
    return this.props.kitchen.menuList && this.props.kitchen.menuList.map(dish => (
      <DishCard
        {...dish}
        key={dish._id}
        onDishSelected={this.onDishSelected}
        onAddToCartClick={() => this.showDishModal(dish._id)}
      />
    ));
  };

  render() {
    const { kitchen } = this.props;

    if (!kitchen.kitchenName) {
      return (
        <div className="kitchen-not-found">
          <span>Kitchen Not Found</span>
          <style jsx>
            {`
              .kitchen-not-found {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                min-height: 300px;
              }
            `}
          </style>
        </div>
      );
    }

    return (
      <div className="kitchen-main">
        <KitchenHeader
          name={kitchen.kitchenName}
          description={kitchen.kitchenDescription}
          profileImage={kitchen.profileImage}
        />
        <div className="kitchen-display">
          {
            kitchen.menuList && kitchen.menuList.length > 0 ?
              this.renderDishes() :
              !kitchen.isLoading ? <KitchenClosedComponent /> : null
          }
          {
            this.state.displayedProduct ?
              <DishModal {...this.state.displayedProduct} onClose={this.closeDishModal} /> :
              ''
          }
        </div>
        <style jsx>
          {`
            .kitchen-main {
              padding-left: 110px
            }
            .kitchen-display {
              width: 100%;
              margin: 70px auto 144px;
              display: flex;
              flex-wrap: wrap;
            }
          `}
        </style>
      </div>
    );
  }
}

const stateSelector = ({ kitchen, error, global }) => ({ kitchen, error });

const actionSubjects = {
  ...errorActions,
  ...kitchenActions,
};

export default connect(stateSelector, actionSubjects)(KitchenPage);
