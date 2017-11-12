// @flow

import * as React from 'react';
import Rx from 'rxjs/Rx';

import { whiteColor, borderRadius, primaryColor, textColor, primaryBtnHoverColor } from '../utils/styleVariables';

type Props = {
  onClick: () => Rx.Observable,
}

const MenuDefault = (props: Props) => (
  <div className="wrapper">
    <div className="cover" />
    <div className="defaultIcon">
      <img alt="default icon" src="../static/img/default_icon.svg" />
    </div>
    <div className="textSection">
      <h2 className="title">Hello there!</h2>
      <p>Fill this place with your signature dishes,</p>
      <p>build your own menu!</p>
    </div>
    <button className="addDish" onClick={props.onClick}>Add A DISH</button>
    <style jsx>
      {`
        .wrapper {
          width: 430px;
          height: 424px;
          background-color: ${whiteColor};
          border-radius: ${borderRadius};
          position: relative;
          display: flex;
          flex-direction: column;
        }
        .cover {
          height: 150px;
          width: 100%;
          background-image: url('../static/img/menu_default.jpg');
          background-size: cover;
          background-position: center;
          border-top-left-radius: ${borderRadius};
          border-top-right-radius: ${borderRadius};
        }
        .defaultIcon {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: ${primaryColor};
          width: 60px;
          height: 60px;
          border-radius: 100px;
          position: absolute;
          top: 120px;
          left: 185px;
        }
        .textSection {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 31px;
        }
        .title {
          font-family: 'Playball', cursive;
          font-size: 24px;
          color: ${textColor};
        }
        .textSection p {
          margin: 0;
          padding-bottom: 5px;
          font-size: 16px;
          color: ${textColor};
        }
        .addDish {
          border: 0;
          padding: 0;
          margin-top: 70px;
          background-color: ${whiteColor};
          color: ${primaryColor};
          font-size: 16px;
          margin: auto;
          cursor: pointer;
          outline: none;
        }
        .addDish:hover {
          color: ${primaryBtnHoverColor};
        }
      `}
    </style>
  </div>
);


export default MenuDefault;
