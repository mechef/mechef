// @flow

import * as React from 'react';

type Props = {
  kitchen: string,
  id: string,
}

const Product = ({ kitchen, id } : Props) => (
  <div>
    Kitchen {kitchen}
    Product {id}
  </div>
);

export default Product;
