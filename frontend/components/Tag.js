// @flow

import * as React from 'react';

import {
  primaryColor,
  borderRadius,
  fontSize,
  whiteColor,
} from '../utils/styleVariables';

type Props = {
  title: string,
  onRemove: () => mixed,
};

const Tag = (props: Props) => (
  <button
    type="button"
    className="tag"
  >
    <span className="title">{props.title}</span>
    <div className="remove" onClick={props.onRemove} />
    <style jsx>
      {`
        button {
          padding: 0;
        }
        .tag {
          display: flex;
          justify-content: space-between;
          outline: none;
          border: solid 1px ${primaryColor};
          border-radius: ${borderRadius};
          width: 127px;
          height: 50px;
          cursor: pointer;
          background-color: ${whiteColor};
          box-sizing: border-box;
          padding-left: 17px;
        }

        .title {
          font-size: ${fontSize};
          color: ${primaryColor};
        }

        .remove {
          background-image: url('../static/svg/cancel_white_click.svg');
          background-size: contain;
          background-position: center;
          background-repeat:no-repeat;
          width: 18px;
          height: 18px;
          outline: none;
          margin-right: 20px;
        }

        .remove:hover {
          background-image: url('../static/svg/cancel_white_hover.svg');
        }
      `}
    </style>
  </button>
);

Tag.defaultProps = {

};

export default Tag;
