// @flow

import * as React from 'react';
import Rx from 'rxjs/Rx';

import { whiteColor, borderRadius, primaryColor, textColor, primaryBtnHoverColor } from '../utils/styleVariables';

type Props = {
  coverPhotoSrc: string,
  children: React.Node,
}

const DefaultComponent = (props: Props) => (
  <div className="wrapper">
    {
      props.coverPhotoSrc ?
        <div className="cover" />
        :
        null
    }
    <div className="defaultIcon">
      <img alt="default icon" src="../static/img/default_icon.svg" />
    </div>
    {props.children}
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
      `}
    </style>
  </div>
);

DefaultComponent.defaultProps = {
  coverPhotoSrc: '',
  children: <div />,
};

export default DefaultComponent;
