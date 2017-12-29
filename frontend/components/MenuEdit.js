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
  onChangeField: (updatedField: MenuObject) => Rx.Observable,
  onUploadImage: File => Rx.Observable,
  menuList: Array<MenuObject>,
  currentMenu: MenuObject,
  updatedMenu: MenuObject,
  deliveryList: Array<MeetupObject>,
  fetchDelivery: () => Rx.Observable,
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
    this.state = {
      ingredientInput: '',
      categoryInput: '',
    };
  }

  componentDidMount() {
    this.props.fetchDelivery();
  }

  componentDidUpdate() {
    this.props.deliveryList.forEach((delivery) => {
      // $FlowFixMe
      const map = new google.maps.Map(document.getElementById(delivery._id), {
        center: {
          lat: delivery.meetupLatitude,
          lng: delivery.meetupLongitude,
        },
        zoom: 15,
        panControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: true,
        fullscreenControl: false,
      });
      const latlng = new google.maps.LatLng(delivery.meetupLatitude, delivery.meetupLongitude);
      const marker = new google.maps.Marker({
        position: latlng,
        title: delivery.meetupAddress,
        visible: true,
      });
      marker.setMap(map);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  getAvailableDays(meetup: MeetupObject) {
    const result = [];
    if (meetup.meetupSunday) result.push('Sunday');
    if (meetup.meetupMonday) result.push('Monday');
    if (meetup.meetupTuesday) result.push('Tuesday');
    if (meetup.meetupWednesday) result.push('Wednesday');
    if (meetup.meetupThursday) result.push('Thursday');
    if (meetup.meetupFriday) result.push('Friday');
    if (meetup.meetupSaturday) result.push('Saturday');
    return result.join(' / ');
  }

  render() {
    const { goBack, onCreateMenu, onUpdateMenu, onDeleteMenu, onUploadImage, onChangeField, currentMenu, updatedMenu, deliveryList } = this.props;
    const currentCategories = updatedMenu.category || currentMenu.category || [];
    const currentIngredients = updatedMenu.ingredients || currentMenu.ingredients || [];
    const displayImages = updatedMenu.images || currentMenu.images || [];
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
              value={updatedMenu.dishName || currentMenu.dishName || ''}
              onChange={(event) => {
                if (event && event.target) {
                  onChangeField({ dishName: event.target.value });
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
                value={updatedMenu.unitPrice || currentMenu.unitPrice || ''}
                onChange={(event) => {
                  if (event && event.target) {
                    onChangeField({ unitPrice: event.target.value });
                  }
                }}
              />
            </div>
            <div className="smallInputContainer">
              <h3 className="title">Quantity</h3>
              <span className="subtitle">Choose quantity</span>
              <SelectBox
                options={quantity}
                selectedValue={updatedMenu.quantity || currentMenu.quantity || 0}
                defaultText="0"
                onChange={(selectedValue) => {
                  onChangeField({
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
                    });
                    onChangeField({
                      category: [...currentCategories, this.state.categoryInput],
                    });
                  }}
                  hasAddBtn
                />
                <div className="tagsWrapper">
                  {
                    currentCategories.map((tag, index) => (
                      <div className="tagStyle">
                        <Tag
                          key={
                            // eslint-disable-next-line react/no-array-index-key
                            index
                          }
                          title={tag}
                          onRemove={() => {
                            onChangeField({
                              category: currentCategories
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
                  onChangeField({
                    ingredients: [...currentIngredients, this.state.ingredientInput],
                  });
                  this.setState({
                    ingredientInput: '',
                  });
                }}
                hasAddBtn
              />
              <div className="tagsWrapper">
                {
                  currentIngredients.map((tag, index) => (
                    <div className="tagStyle">
                      <Tag
                        key={
                          // eslint-disable-next-line react/no-array-index-key
                          index
                        }
                        title={tag}
                        onRemove={() => {
                          onChangeField({
                            ingredients: currentIngredients
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
              value={updatedMenu.description || currentMenu.description || ''}
              onChange={(event) => {
                if (event && event.target) {
                  onChangeField({ description: event.target.value });
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
                selectedValue={updatedMenu.cookingBuffer || currentMenu.cookingBuffer || ''}
                defaultText="Choose cooking buffer"
                onChange={(selectedValue) => {
                  onChangeField({
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
                selectedValue={updatedMenu.serving || currentMenu.serving || ''}
                defaultText="For 1~2 people"
                onChange={(selectedValue) => {
                  onChangeField({
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
                deliveryList
                  .filter(delivery => delivery.type === 'meetup')
                  .map(meetup => (
                    <div className="meetupItem">
                      <span className="checkbox">
                        <CheckBox
                          checked={updatedMenu.deliveryIdList ? updatedMenu.deliveryIdList.includes(meetup._id) : currentMenu.deliveryIdList ? currentMenu.deliveryIdList.includes(meetup._id) : false}
                          onChange={(isChecked) => {
                            const currentDeliveryIdList = updatedMenu.deliveryIdList || currentMenu.deliveryIdList || [];
                            if (isChecked) {
                              onChangeField({
                                deliveryIdList: [...currentDeliveryIdList, meetup._id],
                              });
                            } else {
                              onChangeField({
                                deliveryIdList: currentDeliveryIdList
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
                          <span className="text">{this.getAvailableDays(meetup)}</span>
                          <span className="text">{meetup.meetupStartTime} - {meetup.meetupEndTime}</span>
                        </div>
                        <span className="descriptionText">Note to buyer</span>
                        <div className="delivery-content">
                          <span className="text">{meetup.note}</span>
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
                onDeleteMenu(currentMenu._id);
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
                if (currentMenu._id) {
                  // TODO: Modify to only provide updated data
                  onUpdateMenu({
                    _id: currentMenu._id,
                    ...updatedMenu,
                  });
                } else {
                  onCreateMenu(updatedMenu);
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
              overflow: scroll;
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
              height: 291px;
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
