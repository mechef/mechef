// @flow

import * as React from 'react';
import Link from 'next/link';
import Rx from 'rxjs/Rx';
import { translate } from 'react-i18next';
import i18n from '../i18n';

import {
  primaryColor,
  primaryBtnHoverColor,
  badgeBackgroundColor,
  btnTextColor,
  lineHeight,
} from '../utils/styleVariables';

type Props = {
  itemCount?: number,
  kitchenName: string,
  t: (key: string) => string,
};

const CartButton = ({ t, itemCount = 0, kitchenName }: Props) => (
  <div className="cartButtonContainer">
    <Link
      prefetch
      href={{
        pathname: '/cart',
        query: { kitchenName: encodeURIComponent(kitchenName) },
      }}
    >
      <button type="button" className="cartButton">
        {t('storecart_mycart')}
      </button>
    </Link>
    {itemCount > 0 ? (
      <div className="itemCountBadge">{itemCount > 99 ? '99+' : itemCount}</div>
    ) : (
      ''
    )}
    <style jsx>
      {`
        .cartButtonContainer {
          position: relative;
        }

        .cartButton {
          outline: none;
          border: 0;
          border-radius: 32px;
          height: 30px;
          padding: 0 24px;
          cursor: pointer;
          font-size: 1.2rem;
          line-height: ${lineHeight};
          background-color: ${primaryColor};
          color: ${btnTextColor};
        }
        .cartButton:hover {
          background-color: ${primaryBtnHoverColor};
        }

        .itemCountBadge {
          position: absolute;
          top: -10px;
          right: -6px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: nowrap;
          color: ${btnTextColor};
          background-color: ${badgeBackgroundColor};
          border-radius: 50%;
          font-size: 1.1rem;
          width: 24px;
          height: 24px;
        }
      `}
    </style>
  </div>
);

const Extended = translate(['common'], {
  i18n,
  wait: typeof window !== 'undefined',
})(CartButton);

export default Extended;
