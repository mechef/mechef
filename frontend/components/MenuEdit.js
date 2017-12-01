// @flow

import * as React from 'react';
import Rx from 'rxjs/Rx';

import Button from './Button';
import TextInput from './TextInput';
import TextAreaInput from './TextAreaInput';
import SelectBox from './SelectBox';
import UploadImage from './UploadImage';
import CheckBox from './CheckBox';
import Tag from './Tag';
import { MenuObject, MeetupObject } from '../utils/flowTypes';
import { whiteColor, borderRadius, fontSize, lineHeight, placeholderTextColor, textColor } from '../utils/styleVariables';
import { IMAGE_URL } from '../utils/constants';

type Props = {
  onCreateMenu: (menu: MenuObject) => Rx.Observable,
  onUpdateMenu: (menu: MenuObject) => Rx.Observable,
  onDeleteMenu: (menuId: string) => Rx.Observable,
  onUploadImage: File => Rx.Observable,
  menuList: Array<MenuObject>,
  newlyUploadedImages: Array<string>,
  deliveryList: Array<MeetupObject>,
  fetchDelivery: () => Rx.Observable,
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
        deliveryIdList: [],
        images: [],
        ingredients: [],
        category: [],
      };
    this.state = {
      ...currentMenu,
      deliveryList: [],
      ingredientInput: '',
      categoryInput: '',
    };
  }

  componentDidMount() {
    this.props.fetchDelivery();
  }

  componentWillReceiveProps(newProps: Props) {
    if (newProps.deliveryList.length) {
      this.setState({
        deliveryList: newProps.deliveryList,
      });
    }
  }

  render() {
    const { goBack, onCreateMenu, onUpdateMenu, onDeleteMenu, onUploadImage, currentMenuId, newlyUploadedImages } = this.props;
    const displayImages = [...newlyUploadedImages, ...this.state.images];
    return (
      <div className="dashboard-content">
        <p className="mainTitle">Edit Menu</p>
        <div className="editContainer">
          <div className="addImage">
            <h3 className="title">Add Images*</h3>
            <p className="subtitle">Add Images Add Images</p>
            <div className="uploadImageWrapper">
              {
                displayImages.length < 3 ?
                  <UploadImage imgSrc="" onImageUpload={onUploadImage} />
                  :
                  null
              }
              {
                displayImages.map((_, index) => (
                  <div className="imageWrapper">
                    <UploadImage
                      imgSrc={`${IMAGE_URL}/${displayImages[index]}`}
                      onImageUpload={onUploadImage}
                    />
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
                              category: this.state.category
                                .filter(categoryTag => categoryTag !== tag),
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
                            ingredients: this.state.ingredients
                              .filter(ingredient => ingredient !== tag),
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
        <p className="mainTitle">Set Up Delivery</p>
        <div className="shippingContainer">
          <div className="meetup">
            <h3 className="title">MEET UP</h3>
            <p className="subtitle">Location &amp; Time</p>
            <div className="meetupWrapper">
              {
                this.state.deliveryList
                  .filter(delivery => delivery.type === 'meetup')
                  .map(meetup => (
                    <div className="meetupItem">
                      <span className="checkbox">
                        <CheckBox
                          checked={this.state.deliveryIdList.includes(meetup._id)}
                          onChange={(isChecked) => {
                            if (isChecked) {
                              this.setState({
                                deliveryIdList: [...this.state.deliveryIdList, meetup._id],
                              });
                            } else {
                              this.setState({
                                deliveryIdList: this.state.deliveryIdList
                                  .filter(deliveryId => deliveryId !== meetup._id),
                              });
                            }
                          }}
                        />
                      </span>
                      <div key={meetup._id} className="deliveryItem">
                        <div className="mapWrapper" id={meetup._id} />
                        <span className="descriptionText">Meet up at</span>
                        <div className="delivery-content">
                          <span className="text">{meetup.meetupAddress}</span>
                          <span className="text">{meetup.meetupStartTime} - {meetup.meetupEndTime}</span>
                        </div>
                      </div>
                    </div>
                  ))
              }
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
                const { ingredientInput, categoryInput, deliveryList, ...menuObject } = this.state;
                const menuWithNewlyUploadedImages = {
                  ...menuObject,
                  images: [...newlyUploadedImages, ...menuObject.images],
                };
                if (this.state._id) {
                  // TODO: Modify to only provide updated data
                  onUpdateMenu(menuWithNewlyUploadedImages);
                } else {
                  onCreateMenu(menuWithNewlyUploadedImages);
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

            .mainTitle {
              font-size: 18px;
              line-height: 1.11;
              letter-spacing: 0.5px;
              color: #4a4a4a;
            }

            .editContainer {
              margin-top: 24px;
              margin-bottom: 39px;
              width: 552px;
              height: 100%;
              padding: 24px 20px;
              border-radius: ${borderRadius};
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

            .meetup {
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

            .shippingContainer {
              height: 532px;
              width: 552px;
              margin-top: 24px;
              background-color: ${whiteColor};
              padding: 24px 20px;
              border-radius: ${borderRadius};
            }

            .meetupItem {
              display: flex;
            }

            .checkbox {
              width: 20px;
              margin-right: 21px;
            }

            .deliveryItem {
              width: 512px;
              height: 226px;
              border: 0;
              border-radius: ${borderRadius};
              box-shadow: 0 5px 7px 0 rgba(201, 201, 201, 0.5);
              background-color: ${whiteColor};
              display: flex;
              flex-direction: column;
              margin-bottom: 12px;
              padding: 0;
              border-radius: 4px;
              background-color: #ffffff;
              cursor: pointer;
              outline: none;
              transition: all .2s ease-in-out;
            }

            .mapWrapper {
              width: 512px;
              height: 100px;
              margin-bottom: 12px;
            }

            .descriptionText {
              font-size: ${fontSize};
              line-height: ${lineHeight};
              color: ${placeholderTextColor};
              margin-bottom: 8px;
              margin-left: 21px;
            }

            .delivery-content {
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              margin-left: 21px;
            }
            .text {
              font-size: ${fontSize};
              font-weight: 500;
              line-height: ${lineHeight};
              color: ${textColor};
              padding-bottom: 12px;
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
