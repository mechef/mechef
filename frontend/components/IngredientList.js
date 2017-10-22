// @flow
import * as React from 'react';
import Rx from 'rxjs/Rx';

import Button from './Button';

type Props = {
  memos: Array<{
    _id: string,
    sum: number,
    name: string,
    ingredients: Array<{
      name: string,
      amount: number,
    }>,
  }>,
  onEditMemo: (memoId: string) => Rx.Observable,
}
const IngredientList = ({ memos, onEditMemo }: Props): React.Element<'div'> => (
  <div>
    <div className="header">
      <span className="title">Ingredients List</span>
      <div role="link" tabIndex="-1" className="addButton" onClick={() => onEditMemo('')}>
        <i className="fa fa-plus plus-icon" aria-hidden="true" />
      </div>
    </div>
    {
      memos.map(memo => (
        <div key={memo._id} className="ingredientList">
          <div className="ingredient-item">
            <div className="ingredient-content">
              <p className="ingredient-title">{memo.name}</p>
              <p className="ingredient-detail">
                <span className="ingredient-subtext">
                  Ingredient: {memo.ingredients && memo.ingredients.length}
                </span>
                <span className="ingredient-subtext">
                  Total: {`$${memo.sum}`}
                </span>
              </p>
            </div>
            <div className="buttonWrapper">
              <Button
                size="small"
                buttonStyle="primary"
                onClick={() => onEditMemo(memo._id)}
              >
                UPDATE
              </Button>
            </div>
          </div>
        </div>
      ))
    }
    <style jsx>
      {`
        .ingredientList {
          width: 800px;
        }
        .header {
          display: flex;
          align-items: center;
          padding-bottom: 22px;
        }
        .title {
          font-size: 18px;
          line-height: 1.11;
          letter-spacing: 0.5px;
          color: #4a4a4a;
        }
        .addButton {
          display: flex;
          width: 36px;
          height: 36px;
          margin-left: 20px;
          border-radius: 4px;
          background-color: #ffffff;
          cursor: pointer;
        }
        .plus-icon {
          margin: auto;
          color: #009245;
        }
        .addButton:hover {
          background-color: #3f9f40;
        }
        .addButton:hover .plus-icon {
          color: #ffffff;
        }
        .ingredient-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          padding: 30px 20px 30px 15px;
          width: 100%;
          border-radius: 4px;
          background-color: #ffffff;
        }
        .ingredient-content {
          display: flex;
          flex-direction: column;
        }
        .ingredient-title {
          font-size: 16px;
          font-weight: 500;
          line-height: 1;
          letter-spacing: 0.7px;
          text-align: left;
          color: #4a4a4a;
        }
        .ingredient-detail {
          padding-top: 16px;
        }
        .ingredient-subtext {
          margin-right: 40px;
          font-size: 14px;
          font-weight: 500;
          line-height: 1.14;
          letter-spacing: 0.6px;
          text-align: left;
          color: #9b9b9b;
        }
        .buttonWrapper {
          align-self: center;
        }
      `}
    </style>
  </div>
);

export default IngredientList;
