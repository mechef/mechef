// @flow
import * as React from 'react';
import { translate } from 'react-i18next';
import i18n from '../i18n';
import Button from './Button';

import { addToCartButtonWidth } from '../utils/styleVariables';

type Props = {
  onAddToCartClick: Function,
  t: (key: string) => string
};

const AddToCartButton = ({ onAddToCartClick, t }: Props) => (
  <div className="addToCartButtonContainer">
    <Button
      buttonStyle="primary"
      size="expanded"
      onClick={onAddToCartClick}
    >
      { t('productdetail_add_cart') }
    </Button>
    <style jsx>
      {`
        .addToCartButtonContainer {
          display: block;
          margin: 0 auto;
          width: ${addToCartButtonWidth};
        }
      `}
    </style>
  </div>
);

export default translate(['common'], { i18n, wait: process.browser })(AddToCartButton);
