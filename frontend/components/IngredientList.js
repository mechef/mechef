// @flow
import * as React from 'react';
import Rx from 'rxjs/Rx';

import {
  whiteColor,
  textColor,
  transparent,
  placeholderTextColor,
  borderRadius,
} from '../utils/styleVariables';
import type { MemoObject } from '../utils/flowTypes';

type Props = {
  memos: Array<MemoObject>,
  onEditMemo: (memoId: string) => Rx.Observable,
  onDeleteMemo: (memoId: string) => Rx.Observable,
  t: (key: string) => string,
};
const IngredientList = (props: Props): React.Element<'div'> => (
  <div>
    <div className="header">
      <span className="title">
        {props.t('ingredientslist_ingredients_list')}
      </span>
      <button className="addButton" onClick={() => props.onEditMemo('')}>
        <div className="plus" />
      </button>
    </div>
    {props.memos.map(memo => (
      <div key={memo._id} className="ingredientList">
        <div className="ingredientItem">
          <div className="titleWrapper">
            <span>{memo.name}</span>
            <div className="iconWrapper">
              <button
                className="btn"
                onClick={() => props.onEditMemo(memo._id || '')}
              >
                <div className="icon editIcon" />
              </button>
              <button className="btn" onClick={props.onDeleteMemo}>
                <div className="icon deleteIcon" />
              </button>
            </div>
          </div>
          <div>
            <span className="ingredient-subtext">
              {props.t('ingredientslist_ingredients_number')}{' '}
              {memo.ingredients && memo.ingredients.length}
            </span>
            <span className="ingredient-subtext">
              {props.t('ingredientslist_total')} ${memo.sum}
            </span>
          </div>
        </div>
      </div>
    ))}
    <style jsx>
      {`
        .ingredientList {
          width: 552px;
          height: 108px;
          padding-top: 30px;
          padding-left: 20px;
          padding-bottom: 31px;
          box-sizing: border-box;
          background-color: ${whiteColor};
          border-radius: ${borderRadius};
          margin-bottom: 10px;
        }
        .header {
          display: flex;
          align-items: center;
          padding-bottom: 22px;
        }
        .titleWrapper {
          display: flex;
          justify-content: space-between;
          font-size: 16px;
          line-height: 1;
          letter-spacing: 0.7px;
          font-weight: 500;
          color: ${textColor};
          margin-bottom: 14px;
        }
        .addButton {
          display: flex;
          width: 36px;
          height: 36px;
          margin-left: 20px;
          border-radius: 4px;
          cursor: pointer;
          outline: none;
          border: 0;
          background-color: ${whiteColor};
        }

        .plus {
          margin: auto;
          background-image: url('../static/img/plus.png');
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          width: 18px;
          height: 18px;
          outline: none;
        }

        .addButton:hover .plus {
          background-image: url('../static/img/plus_hover.png');
        }

        .ingredientItem {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-bottom: 12px;
          background-color: #ffffff;
          height: 100%;
        }
        .title {
          font-size: 18px;
          font-weight: 500;
          line-height: 1.11;
          letter-spacing: 0.5px;
          color: ${textColor};
        }
        .iconWrapper {
          margin-right: 21px;
        }
        .btn {
          cursor: pointer;
          background-color: ${transparent};
          border: 0;
          outline: none;
          margin-left: 15px;
        }

        .icon {
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          width: 14px;
          height: 14px;
          outline: none;
        }

        .editIcon {
          background-image: url('../static/svg/edit_icon.svg');
        }

        .deleteIcon {
          background-image: url('../static/svg/delete_icon.svg');
        }

        .btn:hover .editIcon {
          background-image: url('../static/svg/edit_icon_hover.svg');
        }
        .btn:hover .deleteIcon {
          background-image: url('../static/svg/delete_icon_hover.svg');
        }

        .ingredient-subtext {
          margin-right: 40px;
          font-size: 14px;
          line-height: 1.14;
          letter-spacing: 0.6px;
          color: ${placeholderTextColor};
        }
        .buttonWrapper {
          align-self: center;
        }
      `}
    </style>
  </div>
);

export default IngredientList;
