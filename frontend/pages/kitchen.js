// @flow

import * as React from 'react';

import BuyerHeader from '../components/BuyerHeader';
import BuyerFooter from '../components/BuyerFooter';
import KitchenPageRouter from '../components/KitchenPageRouter';

import { fontSize } from '../utils/styleVariables';

type Props = {
  url: {
    query: {
      kitchen: string,
      dish?: string,
    },
  },
};

type State = {
  kitchen: string,
  dish?: string,
};

class Kitchen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      kitchen: props.url.query && props.url.query.kitchen ? props.url.query.kitchen : 'demo',
      dish: undefined,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.url.query && nextProps.url.query.dish) {
      this.setState({
        dish: nextProps.url.query.dish,
      });
    } else {
      this.setState({
        dish: undefined,
      });
    }
  }

  componentDidMount() {
    this.setState({
      ...this.props.url.query
    });
  }

  render() {
    return (
      <div>
        <BuyerHeader />
        <KitchenPageRouter query={this.state} />
        <BuyerFooter />
        <style jsx>
          {`
            body {
              font-size: ${fontSize};
              letter-spacing: 0.6px;
            }
          `}
        </style>
      </div>
    );
  }
}

export default Kitchen;
