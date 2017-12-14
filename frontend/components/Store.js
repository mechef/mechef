// @flow

import * as React from 'react';
import Router from 'next/router';

import StoreHeader from '../components/StoreHeader';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
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
      chefProfileImage: '/static/avatar.jpg',
      coverPhoto: '/static/main-background.jpg',
      displayedProduct: undefined,
      products: [
        {
          id: '1',
          name: 'Churros',
          description: 'Traditional Spanish and Portugese fried dough pastry.',
          url: '/static/churros.jpeg',
          route: 'churros',
          maxServing: 5,
          price: 9,
        },
        {
          id: '2',
          name: 'Croque-Madame',
          description: 'Grilled ham and cheese sandwich with fried egg on top.',
          url: '/static/sandwich.jpeg',
          route: 'croque-madame',
          maxServing: 2,
          price: 25,
        },
        {
          id: '3',
          name: 'Blueberry granola yogurt',
          description: 'Yogurt topped with crispy granola and blueberry compote.',
          url: '/static/yogurt.jpeg',
          route: 'blueberry-yogurt',
          maxServing: 3,
          price: 19,
        },
      ],
    };

    this.onProductSelected = this.onProductSelected.bind(this);
    this.showProductModal = this.showProductModal.bind(this);
    this.closeProductModal = this.closeProductModal.bind(this);
  }

  onProductSelected: Function;

  onProductSelected(productId: string) {
    Router.push(`/kitchen/${this.props.kitchen}/${productId}`);
    // if (this.props.global.backArrow.isShow) {
    //   this.props.toggleBackArrow$('');
    // }
  }

  showProductModal: Function;

  showProductModal(productId: string) {
    const found = this.state.products.find((product) => product.id == productId);
    this.setState({ displayedProduct: found });
  }

  closeProductModal: Function;

  closeProductModal() {
    console.log('onClose')
    this.setState({ displayedProduct: undefined });
  }

  render() {
    return (
      <div>
        <StoreHeader
          name={this.state.kitchenName}
          description={this.state.description}
          chefProfileImage={this.state.chefProfileImage}
          coverPhoto={this.state.coverPhoto}
        />
        <div className="storeDisplay">
          {
            this.state.products.map(product => (
                <ProductCard
                  {...product}
                  key={product.id}
                  onProductSelected={this.onProductSelected}
                  onAddToCartClick={() => this.showProductModal(product.id)}
                />
              ))
          }
          {
            this.state.displayedProduct ?
              <ProductModal {...this.state.displayedProduct} onClose={this.closeProductModal} /> :
              ''
          }
        </div>
        <style jsx>
          {`
            .storeDisplay {
              width: 100%;
              margin-bottom: 144px;
              display: flex;
              justify-content: center;
              flex-wrap: wrap;
            }
          `}
        </style>
      </div>
    );
  }
}

export default Store;
