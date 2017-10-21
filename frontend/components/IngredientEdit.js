// @flow

import * as React from 'react';
import Rx from 'rxjs/Rx';

type Props = {
  onCreateMemo: ({
    name: string,
    ingredients: Array<{
      name: string,
      amount: number,
    }>
  }) => Rx.Observable,
  onUpdateMemo: ({
    _id: string,
    name: string,
    ingredients: Array<{
      name: string,
      amount: number,
    }>
  }) => Rx.Observable,
  onDeleteMemo: (memoId: string) => Rx.Observable,
  memos: Array<{
    _id: string,
    sum: number,
    name: string,
    ingredients: Array<{
      name: string,
      amount: number,
    }>,
  }>,
  currentMemoId: string,
  goBack: () => Rx.Observable,
}

type State = {
  id?: string,
  memoName: string,
  total: number,
  inputIngredientName: string,
  inputIngredientAmount: number,
  ingredients: Array<{
    name: string,
    amount: number,
  }>,
}

class IngredientEdit extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const currentMemo = props.memos.find(memo => memo._id === props.currentMemoId) || {
      _id: '',
      sum: 0,
      name: '',
      ingredients: [],
    };
    this.state = {
      id: currentMemo._id,
      memoName: currentMemo.name,
      total: currentMemo.sum,
      ingredients: currentMemo.ingredients,
      inputIngredientName: '',
      inputIngredientAmount: 0,
    };
  }
  render() {
    const { onCreateMemo, onUpdateMemo, onDeleteMemo, goBack } = this.props;
    return (
      <div className="dashboard-content">
        <p className="dashboard-content__title">Edit Ingredients</p>
        <div className="edit-ingredient">
          <p className="edit-ingredient__title">List Name*</p>
          <p className="edit-ingredient__explanation">The number of characters is limited to 50.</p>
          <p className="edit-ingredient__input">
            <input type="text" className="edit-ingredient__input-name" value={this.state.memoName} onChange={event => this.setState({ memoName: event.target.value })} />
          </p>
          <div className="edit-ingredient__choose-ingredient">
            <p className="edit-ingredient__title">Ingredients</p>
            <p className="edit-ingredient__explanation">
              <span className="edit-ingredient__explanation-text">Choose Ingredients.</span>
              <span className="edit-ingredient__explanation-total">Total:</span>
              <span className="edit-ingredient__explanation-cost">$ {this.state.total}</span>
            </p>
            <p className="edit-ingredient__input">
              <div className="edit-ingredient__input-medium-wrapper">
                <input type="text" className="edit-ingredient__input-name" placeholder="Enter Ingredients...." onChange={event => this.setState({ inputIngredientName: event.target.value })} />
              </div>
              <div className="edit-ingredient__input-small-wrapper">
                <input type="text" className="edit-ingredient__input-name" onChange={event => this.setState({ inputIngredientAmount: event.target.value })} />
                <span
                  role="button"
                  tabIndex="-1"
                  className="edit-ingredient__add-btn"
                  onClick={() => this.setState({
                    ingredients: [
                      ...this.state.ingredients,
                      {
                        name: this.state.inputIngredientName,
                        amount: this.state.inputIngredientAmount,
                      },
                    ],
                    total: parseInt(this.state.total, 10) + parseInt(this.state.inputIngredientAmount, 10),
                    inputIngredientName: '',
                    inputIngredientAmount: 0,
                  })}
                >
                  <i className="fa fa-plus " aria-hidden="true" />
                </span>
              </div>
            </p>
            {
              this.state.ingredients.map((ingredient, index) => (
                <div className="ingredients">
                  <span className="ingredients__name">{ingredient.name}</span>
                  <span className="ingredients__cost">$ {ingredient.amount}</span>
                  <span
                    className="ingredients__remove-btn"
                    role="button"
                    tabIndex="-1"
                    onClick={() => {
                      this.setState({
                        ingredients: this.state.ingredients.filter((element, i) => i !== index),
                        total: parseInt(this.state.total, 10) - parseInt(ingredient.amount, 10),
                      });
                    }}
                  >
                    X
                  </span>
                </div>
              ))
            }
          </div>
        </div>
        <div className="buttonGroup">
          <span
            className="secondaryBtn"
            role="button"
            tabIndex="-1"
            onClick={() => {
              onDeleteMemo(this.props.currentMemoId);
              goBack();
            }}
          >
            DELETE
          </span>
          <span className="secondaryBtn" role="button" tabIndex="-1" onClick={() => goBack()}>CANCEL</span>
          <span
            className="primaryBtn"
            role="button"
            tabIndex="-1"
            onClick={() => {
              if (this.state.id) {
                // TODO: Modify to only provide updated data
                onUpdateMemo({
                  _id: this.state.id,
                  name: this.state.memoName,
                  sum: this.state.total,
                  ingredients: this.state.ingredients,
                });
              } else {
                onCreateMemo({
                  name: this.state.memoName,
                  ingredients: this.state.ingredients,
                });
              }
              goBack();
            }}
          >
            SAVE
          </span>
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
              width: 100%;
              height: 50px;
              border-radius: 4px;
              background-color: #ffffff;
              border: solid 1px #979797;
            }

            .edit-ingredient__choose-ingredient {
              margin-top: 40px;
            }

            .edit-ingredient__input {
              display: flex;
              justify-content: space-between;
              width: 520px;
              position: relative;
            }

            .edit-ingredient__input > div:nth-child(2) {
              margin-left: 5px;
            }

            .edit-ingredient__input-medium-wrapper {
              flex: 3;
            }

            .edit-ingredient__input-small-wrapper {
              flex: 2;
            }

            .edit-ingredient__add-btn {
              position: absolute;
              right: 10px
              top: 50%;
              transform: translateX(-50%);
              color: #3e9f40;
              transition: all .2s ease-in-out;
            }

            .edit-ingredient__add-btn:hover {
              transform: scale(1.5);
            }

            .ingredients {
              display: flex;
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
              transition: all .2s ease-in-out;
            }

            .ingredients__remove-btn:hover {
              transform: scale(1.5);
            }

            .buttonGroup {
              display: flex;
              justify-content: flex-end;
              width: 744px;
              padding-top: 30px;
            }

            .secondaryBtn {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 150px;
              height: 50px;
              border-radius: 4px;
              border: solid 1px #3e9f40;
              margin-left: 12px;
              color: #3e9f40;
            }

            .secondaryBtn:hover, .secondaryBtn:active {
              background-color: #3f9f40;
              color: #ffffff;
            }

            .primaryBtn {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 150px;
              height: 50px;
              border-radius: 4px;
              background-color: #3e9f40;
              margin-left: 12px;
              color: #ffffff;
            }

            .primaryBtn:hover, .primaryBtn:active {
              background-color: #367d36;
            }
          `}
        </style>
      </div>
    );
  }
}


export default IngredientEdit;
