// @flow

import * as React from 'react';
import Rx from 'rxjs/Rx';

import { transparent, whiteColor } from '../utils/styleVariables';
import Button from './Button';
import TextInput from './TextInput';
import type { MemoObject } from '../utils/flowTypes';

type Props = {
  displayMemo: MemoObject,
  onCreateMemo: () => Rx.Observable,
  onUpdateMemo: () => Rx.Observable,
  onDeleteMemo: () => Rx.Observable,
  onChangeField: (updatedField: MemoObject) => Rx.Observable,
  memos: Array<MemoObject>,
  goBack: () => Rx.Observable,
  t: (key: string) => string,
};

type State = {
  inputIngredientName: string,
  inputIngredientAmount: number
};

class IngredientEdit extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      inputIngredientName: '',
      inputIngredientAmount: 0,
    };
  }
  render() {
    const {
      displayMemo,
      onCreateMemo,
      onUpdateMemo,
      onDeleteMemo,
      onChangeField,
      goBack,
    } = this.props;
    const currentIngredients = displayMemo.ingredients || [];
    const currentSum = displayMemo.sum || 0;
    return (
      <div className="dashboard-content">
        <p className="dashboard-content__title">{this.props.t('ingredientsedit_edit_ingredients')}</p>
        <div className="edit-ingredient">
          <p className="title">{this.props.t('ingredientsedit_list_name')}</p>
          <p className="subtitle">The number of characters is limited to 50.</p>
          <p className="edit-ingredient__input">
            <TextInput
              type="text"
              placeholder="Input memo name"
              size="large"
              value={displayMemo.name || ''}
              onChange={(event) => {
                if (event && event.target) {
                  onChangeField({ name: event.target.value });
                }
              }}
            />
          </p>
          <div className="edit-ingredient__choose-ingredient">
            <p className="title">{this.props.t('ingredientsedit_ingredients')}</p>
            <p className="subtitleWrapper">
              <span className="subtitle">{this.props.t('ingredientsedit_ingredients_list_add')}</span>
              <div>
                <span className="totalText">{this.props.t('ingredientsedit_total')}</span>
                <span className="costText">$ {displayMemo.sum || 0}</span>
              </div>
            </p>
            <p className="edit-ingredient__input">
              <div className="edit-ingredient__input-medium-wrapper">
                <TextInput
                  type="text"
                  placeholder="Enter Ingredients..."
                  size="small"
                  value={this.state.inputIngredientName}
                  onChange={(event) => {
                    if (event && event.target) {
                      this.setState({
                        inputIngredientName: event.target.value,
                      });
                    }
                  }}
                />
              </div>
              <div className="edit-ingredient__input-small-wrapper">
                <TextInput
                  type="text"
                  placeholder="$"
                  pattern="^\d+$"
                  validationMessage={this.props.t('validationmessage_only_number')}
                  size="small"
                  value={this.state.inputIngredientAmount || ''}
                  onChange={(event) => {
                    if (event && event.target) {
                      this.setState({
                        inputIngredientAmount: parseInt(event.target.value, 10),
                      });
                    }
                  }}
                  hasAddBtn
                  onAdd={() => {
                    onChangeField({
                      ingredients: [
                        ...currentIngredients,
                        {
                          name: this.state.inputIngredientName,
                          amount: this.state.inputIngredientAmount,
                        },
                      ],
                      sum: currentSum + this.state.inputIngredientAmount,
                    });
                    this.setState({
                      inputIngredientName: '',
                      inputIngredientAmount: 0,
                    });
                  }}
                />
              </div>
            </p>
            {currentIngredients &&
              currentIngredients.map((ingredient, index) => (
                /* eslint-disable */
                <div key={index} className="ingredients">
                  {/* eslint-enable */}
                  <span className="ingredients__name">{ingredient.name}</span>
                  <span className="ingredients__cost">
                    $ {ingredient.amount}
                  </span>
                  <button
                    className="removeWrapper"
                    onClick={() => {
                      onChangeField({
                        ingredients: currentIngredients.filter((element, i) => i !== index),
                        sum:
                          parseInt(currentSum, 10) -
                          parseInt(ingredient.amount, 10),
                      });
                    }}
                  >
                    <div className="remove" />
                  </button>
                </div>
              ))}
          </div>
        </div>
        <div className="buttonGroup">
          <div>
            <Button
              size="small"
              buttonStyle="greenBorderOnly"
              onClick={() => {
                onDeleteMemo();
                goBack();
              }}
            >
              {this.props.t('ingredientsedit_button_delete')}
            </Button>
          </div>
          <div>
            <Button
              size="small"
              buttonStyle="greenBorderOnly"
              onClick={() => goBack()}
            >
              {this.props.t('ingredientsedit_button_cancel')}
            </Button>
          </div>
          <div>
            <Button
              size="small"
              buttonStyle="primary"
              onClick={() => {
                if (displayMemo._id) {
                  onUpdateMemo();
                } else {
                  onCreateMemo();
                }
                goBack();
              }}
            >
              {this.props.t('ingredientsedit_button_save')}
            </Button>
          </div>
        </div>
        <style jsx>
          {`
            .dashboard-content {
              padding-left: 19px;
            }

            .dashboard-content__title {
              font-size: 18px;
              line-height: 1.11;
              letter-spacing: 0.5px;
              color: #4a4a4a;
            }

            .edit-ingredient {
              margin-top: 24px;
              width: 552px;
              height: 515px;
              padding-top: 21px;
              padding-left: 16px;
              border-radius: 4px;
              background-color: #ffffff;
            }

            .title {
              margin: 0 0 12px 0;
              font-size: 16px;
              font-weight: 500;
              line-height: 1;
              letter-spacing: 0.7px;
              color: #4a4a4a;
            }

            .subtitle {
              margin: 0 0 16px 0;
              height: 14px;
              font-size: 14px;
              line-height: 1;
              letter-spacing: 0.6px;
              text-align: left;
              color: #9b9b9b;
            }

            .subtitleWrapper {
              display: flex;
              justify-content: space-between;
              margin-right: 32px;
            }

            .totalText {
              padding-right: 40px;
              font-size: 14px;
            }

            .costText {
              font-size: 14px;
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
              font-size: 14px;
              font-weight: 500;
              letter-spacing: 0.6px;
              color: #3e9f40;
            }

            .ingredients__cost {
              margin-top: auto;
              margin-bottom: auto;
              font-size: 14px;
              font-weight: 500;
              letter-spacing: 0.6px;
              color: #3e9f40;
            }

            .buttonGroup {
              display: flex;
              justify-content: flex-end;
              width: 568px;
              padding-top: 30px;
            }

            .buttonGroup div {
              margin-left: 10px;
            }

            .removeWrapper {
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: ${whiteColor};
              border: 0;
              margin-right: 18px;
              margin-left: 33px;
              outline: none;
            }

            .remove {
              background-image: url('../static/svg/cancel_white_click.svg');
              background-size: contain;
              background-position: center;
              background-repeat:no-repeat;
              width: 18px;
              height: 18px;
              outline: none;
              border: 0;
              background-color: ${transparent};
              cursor: pointer;
            }

            .remove:hover {
              background-image: url('../static/svg/cancel_white_hover.svg');
            }
          `}
        </style>
      </div>
    );
  }
}

export default IngredientEdit;
