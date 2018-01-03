// @flow

import * as React from 'react';
import Router from 'next/router';

import KitchenHeader from './KitchenHeader';
import KitchenClosedComponent from './KitchenClosedComponent'
import DishCard from './DishCard';
import DishModal from './DishModal';
import { StoreObject } from '../utils/flowTypes';

type Props = {
  kitchen: string,
}

type State = StoreObject

class Store extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      kitchenName: 'momokitchen',
      kitchenDescription: 'Welcome to momokitchen!',
      profileImage: undefined,
      displayedProduct: undefined,
      dishes: [
        {
          id: '1',
          dishName: 'Churros',
          description: 'Traditional Spanish and Portugese fried dough pastry.',
          images: ['/static/img/churros.jpeg', '/static/img/sandwich.jpeg'],
          route: 'churros',
          quantity: 5,
          unitPrice: 9,
        },
        {
          id: '2',
          dishName: 'Croque-Madame',
          description: 'Grilled ham and cheese sandwich with fried egg on top.',
          images: ['/static/img/sandwich.jpeg'],
          route: 'croque-madame',
          quantity: 2,
          unitPrice: 25,
        },
        {
          id: '3',
          dishName: 'Blueberry granola yogurt',
          description: 'Yogurt topped with crispy granola and blueberry compote.',
          images: [],
          route: 'blueberry-yogurt',
          quantity: 3,
          unitPrice: 19,
        },
      ],
    };

    this.onDishSelected = this.onDishSelected.bind(this);
    this.showDishModal = this.showDishModal.bind(this);
    this.closeDishModal = this.closeDishModal.bind(this);
  }

  onDishSelected: Function;

  onDishSelected(dishId: string) {
    Router.push({
        pathname: '/kitchen',
        query: {
          kitchen: this.props.kitchen,
          dish: dishId,
        },
      },
      `/kitchen/${this.props.kitchen}/${dishId}`
    );
    // if (this.props.global.backArrow.isShow) {
    //   this.props.toggleBackArrow$('');
    // }
  }

  showDishModal: Function;
  showDishModal(dishId: string) {
    const found = this.state.dishes.find((dish) => dish.id == dishId);
    this.setState({ displayedProduct: found });
  }

  closeDishModal: Function;
  closeDishModal() {
    console.log('onClose')
    this.setState({ displayedProduct: undefined });
  }

  renderDishes: Function;
  renderDishes = () => {
    return this.state.dishes.map(dish => (
      <DishCard
        {...dish}
        key={dish.id}
        onDishSelected={this.onDishSelected}
        onAddToCartClick={() => this.showDishModal(dish.id)}
      />
    ));
  };

  render() {
    return (
      <div className="kitchen-main">
        <KitchenHeader
          name={this.state.kitchenName}
          description={this.state.kitchenDescription}
          profileImage={this.state.profileImage}
        />
        <div className="kitchen-display">
          {
            this.state.dishes.length === 0 ?
            <KitchenClosedComponent /> :
            this.renderDishes()
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

export default Store;
