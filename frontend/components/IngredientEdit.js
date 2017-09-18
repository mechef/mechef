// @flow
import * as React from 'react';

type Props = {
  sum?: number,
  name?: string,
  ingredients: Array<{
    name?: string,
    amount?: number,
  }>
}

const IngredientEdit = ({ sum, name, ingredients }: Props) => (
  <div className="dashboard-content">
    <p className="dashboard-content__title">Edit Ingredients</p>
    <div className="edit-ingredient">
      <p className="edit-ingredient__title">List Name*</p>
      <p className="edit-ingredient__explanation">The number of characters is limited to 50.</p>
      <input type="text" className="edit-ingredient__input-name" value={name} />
      <div className="edit-ingredient__choose-ingredient">
        <p className="edit-ingredient__title">Ingredients</p>
        <p className="edit-ingredient__explanation">
          <span className="edit-ingredient__explanation-text">Choose Ingredients.</span>
          <span className="edit-ingredient__explanation-total">Total:</span>
          <span className="edit-ingredient__explanation-cost">$ {sum}</span>
        </p>
        <p className="edit-ingredient__input">
          <input type="text" className="edit-ingredient__input-name edit-ingredient__input-name--medium" />
          <input type="text" className="edit-ingredient__input-name edit-ingredient__input-name--small" />
        </p>
        {
          ingredients.map(ingredient => (
            <div className="ingredients">
              <span className="ingredients__name">{ingredient.name}</span>
              <span className="ingredients__cost">$ {ingredient.amount}</span>
              <span className="ingredients__remove-btn">X</span>
            </div>
          ))
        }
      </div>
    </div>
    <style jsx>
      {`
        .dashboard-content {
          padding-left: 19px;
        }

        .dashboard-content__title {
          font-family: OpenSans;
          font-size: 18px;
          line-height: 1.11;
          letter-spacing: 0.5px;
          color: #4a4a4a;
        }

        .edit-ingredient {
          margin-top: 24px;
          width: 744px;
          height: 515px;
          padding-top: 21px;
          padding-left: 16px;
          border-radius: 4px;
          background-color: #ffffff;
        }

        .edit-ingredient__title {
          margin: 0;
          font-family: AvenirNext;
          font-size: 16px;
          font-weight: 500;
          line-height: 1;
          letter-spacing: 0.7px;
          color: #4a4a4a;
        }

        .edit-ingredient__explanation {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          margin-top: 12px;
          margin-bottom: 0;
          width: 520px;
          font-family: AvenirNext;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.6px;
          color: #4a4a4a;
        }

        .edit-ingredient__explanation-text {
          margin-right: auto;
          font-family: AvenirNext;
          font-size: 14px;
          font-weight: 500;
          line-height: 1;
          letter-spacing: 0.6px;
          color: #9b9b9b;
        }

        .edit-ingredient__explanation-total {
          width: 57px;
          height: 19px;
        }

        .edit-ingredient__explanation-cost {
          width: 57px;
          height: 19px;
        }

        .edit-ingredient__input-name {
          margin-top: 16px;
          width: 520px;
          height: 50px;
          border-radius: 4px;
          background-color: #ffffff;
          border: solid 1px #979797;
        }

        .edit-ingredient__choose-ingredient {
          margin-top: 40px;
        }

        .edit-ingredient__input {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
          width: 520px;
        }

        .edit-ingredient__input-name--medium {
          width: 283px;
        }

        .edit-ingredient__input-name--small {
          width: 229px;
        }

        .ingredients {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
          margin-top: 14px;
          width: 518px;
          height: 50px;
          border-radius: 4px;
          border: solid 1px #3e9f40;
        }
        .ingredients__name {
          margin: auto auto auto 17px;
          font-family: AvenirNext;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.6px;
          color: #3e9f40;
        }

        .ingredients__cost {
          margin-top: auto;
          margin-bottom: auto;
          font-family: AvenirNext;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.6px;
          color: #3e9f40;
        }

        .ingredients__remove-btn {
          margin: auto 16.4px;
          color: #9b9b9b;
        }
      `}
    </style>
  </div>
);

IngredientEdit.defaultProps = {
  sum: 0,
  name: '',
  ingredients: [],
};

export default IngredientEdit;
