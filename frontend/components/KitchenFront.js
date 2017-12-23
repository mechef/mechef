// @flow

import * as React from 'react';
import Router from 'next/router';

import KitchenHeader from '../components/KitchenHeader';
import DishCard from '../components/DishCard';
import DishModal from '../components/DishModal';
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
      description: 'Welcome to momokitchen!',
      profileImage: undefined,
      displayedProduct: undefined,
      dishes: [
        {
          id: '1',
          name: 'Churros',
          description: 'Traditional Spanish and Portugese fried dough pastry.',
          url: '/static/img/churros.jpeg',
          route: 'churros',
          maxServing: 5,
          price: 9,
        },
        {
          id: '2',
          name: 'Croque-Madame',
          description: 'Grilled ham and cheese sandwich with fried egg on top.',
          url: '/static/img/sandwich.jpeg',
          route: 'croque-madame',
          maxServing: 2,
          price: 25,
        },
        {
          id: '3',
          name: 'Blueberry granola yogurt',
          description: 'Yogurt topped with crispy granola and blueberry compote.',
          url: '/static/img/yogurt.jpeg',
          route: 'blueberry-yogurt',
          maxServing: 3,
          price: 19,
        },
      ],
    };

    this.onDishSelected = this.onDishSelected.bind(this);
    this.showDishModal = this.showDishModal.bind(this);
    this.closeDishModal = this.closeDishModal.bind(this);
  }

  onDishSelected: Function;

  onDishSelected(dishId: string) {
    Router.push(`/kitchen/${this.props.kitchen}/${dishId}`);
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

  render() {
    return (
      <div className="kitchen-main">
        <KitchenHeader
          name={this.state.kitchenName}
          description={this.state.description}
          profileImage={this.state.profileImage}
          coverPhoto={this.state.coverPhoto}
        />
        <div className="kitchen-display">
          {
            this.state.dishes.map(dish => (
                <DishCard
                  {...dish}
                  key={dish.id}
                  onDishSelected={this.onDishSelected}
                  onAddToCartClick={() => this.showDishModal(dish.id)}
                />
              ))
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
              padding-right: 110px;
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
