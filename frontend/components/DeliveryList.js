// @flow

import * as React from "react";
import Rx from "rxjs/Rx";

import Button from "./Button";
import {
  whiteColor,
  borderRadius,
  fontSize,
  lineHeight,
  placeholderTextColor,
  textColor
} from "../utils/styleVariables";
import type { MeetupObject } from "../utils/flowTypes";

type Props = {
  meetupList: Array<MeetupObject>,
  onEditDelivery: (meetupId: string) => Rx.Observable
};

class DeliveryList extends React.Component<Props> {
  refreshMap = (meetup: MeetupObject) => {
    // $FlowFixMe
    const map = new google.maps.Map(document.getElementById(meetup._id), {
      center: {
        lat: meetup.meetupLatitude,
        lng: meetup.meetupLongitude
      },
      zoom: 15,
      panControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      zoomControl: true,
      fullscreenControl: false
    });
    const latlng = new google.maps.LatLng(
      meetup.meetupLatitude,
      meetup.meetupLongitude
    );
    const marker = new google.maps.Marker({
      position: latlng,
      title: meetup.meetupAddress,
      visible: true
    });
    marker.setMap(map);
  };
  componentDidMount() {
    this.props.meetupList.forEach(meetup => this.refreshMap(meetup));
  }
  componentDidUpdate() {
    const newMeetupObject = this.props.meetupList[0];
    if (newMeetupObject) {
      this.refreshMap(newMeetupObject);
    }
  }

  render() {
    const { meetupList, onEditDelivery } = this.props;
    return (
      <div className="wrapper">
        <div className="header">
          <span className="title">Delivery List</span>
          <button className="addButton" onClick={() => onEditDelivery("")}>
            <div className="plus" />
          </button>
        </div>
        {meetupList.map(meetup => (
          <button
            key={meetup._id}
            className="deliveryItem"
            onClick={() => onEditDelivery(meetup._id || "")}
          >
            <div className="mapWrapper" id={meetup._id} />
            <span className="descriptionText">Meet up at</span>
            <div className="delivery-content">
              <div className="text">{meetup.meetupAddress}</div>
              <div className="text">
                {meetup.meetupStartTime} - {meetup.meetupEndTime}
              </div>
            </div>
          </button>
        ))}
        <style jsx>
          {`
            .wrapper {
              height: 791px;
              overflow-y: scroll;
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

            .header {
              display: flex;
              padding-bottom: 22px;
              align-items: center;
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
              background-color: ${whiteColor};
              cursor: pointer;
              outline: none;
              border: 0;
              outline: none;
            }

            .plus {
              margin: auto;
              background-image: url("../static/img/plus.png");
              background-size: contain;
              background-position: center;
              background-repeat: no-repeat;
              width: 18px;
              height: 18px;
              outline: none;
            }

            .addButton:hover .plus {
              background-image: url("../static/img/plus_hover.png");
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
              transition: all 0.2s ease-in-out;
            }

            .deliveryItem:hover {
              transform: scale(1.01);
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
              overflow-wrap: break-word;
              width: 100%;
              text-align: left;
            }
          `}
        </style>
      </div>
    );
  }
}

export default DeliveryList;
