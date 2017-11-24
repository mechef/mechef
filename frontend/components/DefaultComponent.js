// @flow

import * as React from 'react';
import Rx from 'rxjs/Rx';

import { whiteColor, borderRadius, primaryColor, textColor, primaryBtnHoverColor } from '../utils/styleVariables';

type Props = {
  onClick: () => Rx.Observable,
  coverPhotoSrc: string,
  title: string,
  description: string,
  actionText: string,
}

const DefaultComponent = (props: Props) => (
  <div className="wrapper">
    <div className="cover" />
    <div className="defaultIcon">
      <img alt="default icon" src="../static/img/default_icon.svg" />
    </div>
    <div className="textSection">
      <h2 className="title">{props.title}</h2>
      <p className="description">{props.description}</p>
    </div>
    <button className="addDish" onClick={props.onClick}>{props.actionText}</button>
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
          background-image: url(${props.coverPhotoSrc});
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

        .description {
          width: 315px;
          display: flex;
          justify-content: center;
          line-height: 1.5;
          font-size: 16px;
          text-align: center;
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


export default DefaultComponent;
