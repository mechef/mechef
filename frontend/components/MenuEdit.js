// @flow

import * as React from 'react';
import Rx from 'rxjs/Rx';

import Button from './Button';
import TextInput from './TextInput';
import TextAreaInput from './TextAreaInput';
import SelectBox from './SelectBox';
import UploadImage from './UploadImage';
import Tag from './Tag';
import { MenuObject } from '../utils/flowTypes';

type Props = {
  onCreateMenu: (menu: MenuObject) => Rx.Observable,
  onUpdateMenu: (menu: MenuObject) => Rx.Observable,
  onDeleteMenu: (menuId: string) => Rx.Observable,
  menuList: Array<MenuObject>,
  currentMenuId: string,
  goBack: () => Rx.Observable,
}

type State = MenuObject

const quantity = [
  { text: '1', value: '1' },
  { text: '2', value: '2' },
  { text: '3', value: '3' },
  { text: '4', value: '4' },
  { text: '5', value: '5' },
  { text: '6', value: '6' },
  { text: '7', value: '7' },
  { text: '8', value: '8' },
  { text: '9', value: '9' },
  { text: '10', value: '10' },
];

const category = [
  { text: 'FOOD', value: 'food' },
  { text: 'DRINK', value: 'drink' },
  { text: 'SNACK', value: 'snack' },
  { text: 'FROZEN', value: 'frozen' },
];

const cookingBuffer = [
  { text: '1', value: '1' },
  { text: '2', value: '2' },
  { text: '3', value: '3' },
  { text: '4', value: '4' },
  { text: '5', value: '5' },
  { text: '6', value: '6' },
  { text: '7', value: '7' },
];

const serving = [
  { text: 'For 1~2 people', value: '1' },
  { text: 'For 2~3 people', value: '2' },
  { text: 'For 3~4 people', value: '3' },
  { text: 'For 4~5 people', value: '4' },
];

class MenuEdit extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const currentMenu = props.menuList.find(
      menu => menu._id === props.currentMenuId) || {
        _id: '',
        serving: '',
        cookingBuffer: '',
        description: '',
        quantity: 0,
        unitPrice: '',
        dishName: '',
        email: '',
        images: [],
        ingredients: [],
        category: [],
      };
    this.state = {
      ...currentMenu,
      ingredientInput: '',
      categoryInput: '',
    };
  }
  render() {
    const { goBack, onCreateMenu, onUpdateMenu, onDeleteMenu, currentMenuId } = this.props;
    return (
      <div className="dashboard-content">
        <p className="dashboard-content__title">Edit Menu</p>
        <div className="editContainer">
          <div className="addImage">
            <h3 className="title">Add Images*</h3>
            <p className="subtitle">Add Images Add Images</p>
            <div className="uploadImageWrapper">
              {
                [1, 2, 3].map(() => (
                  <div className="imageWrapper">
                    <UploadImage />
                  </div>
                ))
              }
            </div>
          </div>
          <div className="dishName">
            <h3 className="title">Dish Name</h3>
            <p className="subtitle">The number of characters is limited to 50</p>
            <TextInput
              type="text"
              placeholder="Enter Dish Name"
              size="large"
              value={this.state.dishName}
              onChange={(event) => {
                if (event && event.target) {
                  this.setState({ dishName: event.target.value });
                }
              }}
            />
          </div>
          <div className="formSection">
            <div className="smallInputContainer">
              <h3 className="title">Unit Price</h3>
              <span className="subtitle">Enter Unit Price</span>
              <TextInput
                type="text"
                placeholder="$"
                size="small"
                value={this.state.unitPrice}
                onChange={(event) => {
                  if (event && event.target) {
                    this.setState({ unitPrice: event.target.value });
                  }
                }}
              />
            </div>
            <div className="smallInputContainer">
              <h3 className="title">Quantity</h3>
              <span className="subtitle">Choose quantity</span>
              <SelectBox
                options={quantity}
                selectedValue={this.state.quantity}
                defaultText="0"
                onChange={(selectedValue) => {
                  this.setState({
                    quantity: selectedValue,
                  });
                }}
              />
            </div>
          </div>
          <h3 className="title">Category</h3>
          <div className="formSection">
            <div className="smallInputContainer">
              <p className="subtitle">Choose category</p>
              <div className="flexWrapper">
                <TextInput
                  type="text"
                  placeholder="Enter Category"
                  size="small"
                  value={this.state.categoryInput}
                  onChange={(event) => {
                    if (event && event.target) {
                      this.setState({ categoryInput: event.target.value });
                    }
                  }}
                  onAdd={() => {
                    this.setState({
                      categoryInput: '',
                      category: [...this.state.category, this.state.categoryInput],
                    });
                  }}
                  hasAddBtn
                />
                <div className="tagsWrapper">
                  {
                    this.state.category.map((tag, index) => (
                      <div className="tagStyle">
                        <Tag
                          key={
                            // eslint-disable-next-line react/no-array-index-key
                            index
                          }
                          title={tag}
                          onRemove={() => {
                            this.setState({
                              category: this.state.category.filter(categoryTag => categoryTag !== tag)
                            });
                          }}
                        />
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="ingredient">
            <h3 className="title">Ingredients</h3>
            <p className="subtitle">Choose Ingredients</p>
            <div className="flexWrapper">
              <TextInput
                type="text"
                placeholder="Enter Ingredients"
                size="small"
                value={this.state.ingredientInput}
                onChange={(event) => {
                  if (event && event.target) {
                    this.setState({ ingredientInput: event.target.value });
                  }
                }}
                onAdd={() => {
                  this.setState({
                    ingredientInput: '',
                    ingredients: [...this.state.ingredients, this.state.ingredientInput],
                  });
                }}
                hasAddBtn
              />
              <div className="tagsWrapper">
                {
                  this.state.ingredients.map((tag, index) => (
                    <div className="tagStyle">
                      <Tag
                        key={
                          // eslint-disable-next-line react/no-array-index-key
                          index
                        }
                        title={tag}
                        onRemove={() => {
                          this.setState({
                            ingredients: this.state.ingredients.filter(ingredient => ingredient !== tag)
                          });
                        }}
                      />
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
          <div className="description">
            <h3 className="title">Description*</h3>
            <p className="subtitle">Description</p>
            <TextAreaInput
              placeholder="Write some description about your menu...."
              value={this.state.description}
              onChange={(event) => {
                if (event && event.target) {
                  this.setState({ description: event.target.value });
                }
              }}
            />
          </div>
          <div className="formSection">
            <div className="smallInputContainer">
              <h3 className="title">Cooking Buffer</h3>
              <p className="subtitle">Choose cooking buffer</p>
              <SelectBox
                options={cookingBuffer}
                selectedValue={this.state.cookingBuffer}
                defaultText="Choose cooking buffer"
                onChange={(selectedValue) => {
                  this.setState({
                    cookingBuffer: selectedValue,
                  });
                }}
              />
            </div>
            <div className="smallInputContainer">
              <h3 className="title">Serving</h3>
              <p className="subtitle">Choose serving</p>
              <SelectBox
                options={serving}
                selectedValue={this.state.serving}
                defaultText="For 1~2 people"
                onChange={(selectedValue) => {
                  this.setState({
                    serving: selectedValue,
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div className="buttonGroup">
          <div>
            <Button
              buttonStyle="greenBorderOnly"
              size="small"
              onClick={() => {
                onDeleteMenu(currentMenuId);
                goBack();
              }}
            >
              DELETE
            </Button>
          </div>
          <div>
            <Button
              buttonStyle="greenBorderOnly"
              size="small"
              onClick={() => goBack()}
            >
              CANCEL
            </Button>
          </div>
          <div>
            <Button
              buttonStyle="primary"
              size="small"
              onClick={() => {
                const { ingredientInput, categoryInput, ...menuObject } = this.state;
                if (this.state._id) {
                  // TODO: Modify to only provide updated data
                  onUpdateMenu(menuObject);
                } else {
                  onCreateMenu(menuObject);
                }
                goBack();
              }}
            >
              SAVE
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

            .editContainer {
              margin-top: 24px;
              width: 552px;
              height: 100%;
              padding: 24px 20px;
              border-radius: 4px;
              background-color: #ffffff;
            }

            .uploadImageWrapper {
              display: flex;
            }

            .imageWrapper {
              margin-left: 12px;
            }

            .addImage {
              margin-bottom: 40px;
            }

            .title {
              margin: 0 0 16px 0;
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
              font-weight: 500;
              line-height: 1;
              letter-spacing: 0.6px;
              text-align: left;
              color: #9b9b9b;
            }

            .dishName {
              margin-bottom: 39px;
            }

            .ingredient {
              margin-bottom: 37px;
            }

            .flexWrapper {
              display: flex;
            }

            .description {
              margin-bottom: 39px;
            }

            .checkboxGroup {
              display: grid;
              width: 387px;
              grid-template-columns: 1fr 1fr 1fr;
              grid-template-rows: 1fr 1fr 1fr;
              grid-column-gap: 30px;
              grid-row-gap: 16px;
            }

            .checkbox {
              width: 116px;
            }

            .formSection {
              display: flex;
              justify-content: space-between;
              width: 520px;
              margin-bottom: 37px;
            }

            .smallInputContainer {
              display: flex;
              flex-direction: column;
              width: 250px;
            }

            .tagsWrapper {
              display: flex;
              width: 250px;
              height: 50px;
            }

            .tagStyle {
              padding-left: 5px;
            }

            .selectbox {
              width: 250px;
              height: 44px;
              border-radius: 4px;
              border: solid 1px #979797;
            }

            .buttonGroup {
              display: flex;
              justify-content: flex-end;
              width: 592px;
              padding-top: 30px;
              margin-bottom: 114px;
            }

            .buttonGroup div {
              margin-left: 10px;
            }

            .largInput {
              width: 447px;
              height: 44px;
              opacity: 0.6;
              border-radius: 4px;
              border: solid 1px #979797;
            }
          `}
        </style>
      </div>
    );
  }
}

export default MenuEdit;
