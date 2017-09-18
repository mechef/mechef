// @flow
import * as React from 'react';
import Rx from 'rxjs';

type Props = {
  memos: [{
    id: string,
    sum: number,
    name: string,
    ingredients: [{
      name: string,
      amount: number,
    }],
  }],
  onAdd: any => Rx.Observable,
}
const IngredientList = ({ memos, onAdd }: Props): React.Element<'div'> => (
  <div>
    <div className="header">
      <span className="title">Ingredients List</span>
      <div role="link" tabIndex="-1" className="addButton" onClick={onAdd}>
        <i className="fa fa-plus plus-icon" aria-hidden="true" />
      </div>
    </div>
    {
      memos.map(memo => (
        <div key={memo.id} className="ingredient-list">
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
            <span className="update-button">
              <span className="update-button-text">UPDATE</span>
            </span>
          </div>
        </div>
      ))
    }
    <style jsx>
      {`
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
        }
        .plus-icon {
          margin: auto;
          color: #009245;
        }
        .addButton:hover {
          background-color: #3e9f40;
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
        .update-button {
          display: flex;
          margin-top: auto;
          margin-bottom: auto;
          width: 150px;
          height: 40px;
          border-radius: 4px;
          background-color: #3e9f40;
        }
        .update-button-text {
          margin: auto;
          font-size: 14px;
          font-weight: 500;
          line-height: 1.14;
          color: #ffffff;
          cursor: default;
        }
        .update-button:hover, .update-button:active {
          background-color: #969696;
        }
      `}
    </style>
  </div>
);

export default IngredientList;
