// @flow

import * as React from 'react';
import StoreHeader from '../components/StoreHeader';

type Props = {
  kitchen: string,
  id: string,
}

type State = {
  kitchenName: string,
  chefProfileImage?: string,
}

class Product extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      kitchenName: 'momokitchen',
      chefProfileImage: '/static/avatar.jpg',
    };
  }

  render() {
    return (
      <div>
        <StoreHeader
          name={this.state.kitchenName}
          chefProfileImage={this.state.chefProfileImage}
        />
        Kitchen {this.props.kitchen}
        Product {this.props.id}
      </div>
    );
  }
}

export default Product;
