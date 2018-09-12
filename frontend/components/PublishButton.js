// @flow

import React from 'react';
import Rx from 'rxjs/Rx';
import { compose, withHandlers, withState } from 'recompose';
import {
  whiteColor,
  lineHeight,
  titleFonr,
  textHintColor,
  primaryColor,
} from '../utils/styleVariables';

type Props = {
  isPublish: boolean,
  onTogglePublish: () => Rx.Observable,
};

const PublishButton = ({ isPublish, onTogglePublish }: Props) => (
  <button
    className={`
      ${isPublish ? 'publishedToggleBtn' : 'unpublishedToggleBtn'}
    `}
    onClick={onTogglePublish}
  >
    <div
      className={`circle ${
        isPublish ? 'publishedCircle' : 'unpublishedCircle'
      }`}
    />
    <span className={`text ${isPublish ? 'publishedText' : 'unpublishedText'}`}>
      {isPublish ? 'PUBLISH' : 'UNPUBLISH'}
    </span>
    <style jsx>{`
      button {
        display: flex;
        align-items: center;
        padding: 0;
        width: 99px;
        height: 26px;
        border-radius: 26px;
        cursor: pointer;
        outline: none;
        align-self: flex-end;
      }
      .publishedToggleBtn {
        background-color: ${primaryColor};
      }

      .unpublishedToggleBtn {
        background-color: ${textHintColor};
        border: 1px solid ${textHintColor};
        flex-direction: row-reverse;
      }
      .circle {
        width: 20px;
        height: 20px;
        border-radius: 26px;
        background-color: ${whiteColor};
      }
      .publishedCircle {
        margin-left: 3px;
        margin-right: 0;
      }

      .unpublishedCircle {
        margin-left: 0;
        margin-right: 3px;
      }
      .text {
        font-size: 9px;
        letter-spacing: 0.3px;
        color: ${whiteColor};
        line-height: ${lineHeight};
      }
      .publishedText {
        margin-left: 10px;
        margin-right: 0;
      }

      .unpublishedText {
        margin-left: 0;
        margin-right: 10px;
      }
    `}</style>
  </button>
);

export default PublishButton;
