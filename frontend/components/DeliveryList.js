// @flow

import * as React from 'react';
import Rx from 'rxjs/Rx';
import {
  whiteColor,
  borderRadius,
  fontSize,
  lineHeight,
  placeholderTextColor,
  textColor,
} from '../utils/styleVariables';
import type { MeetupObject } from '../utils/flowTypes';

type Props = {
  meetupList: Array<MeetupObject>,
  onEditDelivery: (meetupId: string) => Rx.Observable,
  onDeleteMeetup: (meetupId: string) => Rx.Observable,
  t: (key: string) => string,
};

class DeliveryList extends React.Component<Props> {
  componentDidMount() {
    this.props.meetupList.forEach(meetup => this.refreshMap(meetup));
  }
  componentDidUpdate() {
    const newMeetupObject = this.props.meetupList[0];
    if (newMeetupObject) {
      this.refreshMap(newMeetupObject);
    }
  }

  refreshMap = (meetup: MeetupObject) => {
    // $FlowFixMe
    const map = new google.maps.Map(document.getElementById(meetup._id), {
      center: {
        lat: meetup.meetupLatitude,
        lng: meetup.meetupLongitude,
      },
      zoom: 15,
      panControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
    });
    const latlng = new google.maps.LatLng(meetup.meetupLatitude, meetup.meetupLongitude);
    const marker = new google.maps.Marker({
      position: latlng,
      title: meetup.meetupAddress,
      visible: true,
    });
    marker.setMap(map);
  };

  render() {
    const { meetupList, onEditDelivery, onDeleteMeetup } = this.props;
    return (
      <div className="wrapper">
        <div className="header">
          <span className="title">{this.props.t('deliverylist_delivery')}</span>
          <button className="addButton" onClick={() => onEditDelivery('')}>
            <div className="plus" />
          </button>
        </div>
        {meetupList.map(meetup => (
          <div key={meetup._id} className="deliveryItem">
            <div className="actionButtonGroup">
              <div
                role="button"
                tabIndex="-1"
                className="editIcon"
                onClick={() => onEditDelivery(meetup._id || '')}
              />
              <div
                role="button"
                tabIndex="-1"
                className="deleteIcon"
                onClick={() => {
                  if (meetup._id) {
                    onDeleteMeetup(meetup._id);
                  }
                }}
              />
            </div>
            <div className="mapWrapper" id={meetup._id} />
            <span className="descriptionText">{this.props.t('deliverylist_meetup_at')}</span>
            <div className="delivery-content">
              <div className="text">{meetup.meetupAddress}</div>
              <div className="text">
                {meetup.meetupStartTime} - {meetup.meetupEndTime}
              </div>
            </div>
          </div>
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
              margin-bottom: 40px;
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
              outline: none;
              position: relative;
            }

            .actionButtonGroup {
              position: absolute;
              top: 20px;
              right: 20px;
              z-index: 1;
              width: 84px;
              display: flex;
              justify-content: space-between;
            }

            .editIcon {
              width: 36px;
              height: 36px;
              position: relative;
              background-color: ${whiteColor};
              border-radius: ${borderRadius};
              outline: none;
              cursor: pointer;
            }

            .editIcon:before {
              content: '';
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              background-image: url('../static/svg/edit_icon.svg');
              background-position: center;
              background-repeat: no-repeat;
            }

            .editIcon:hover::before {
              background-image: url('../static/svg/edit_icon_hover.svg');
            }

            .deleteIcon {
              width: 36px;
              height: 36px;
              position: relative;
              background-color: ${whiteColor};
              border-radius: ${borderRadius};
              outline: none;
              cursor: pointer;
            }

            .deleteIcon:before {
              content: '';
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              background-image: url('../static/svg/delete_icon.svg');
              background-position: center;
              background-repeat: no-repeat;
            }

            .deleteIcon:hover::before {
              background-image: url('../static/svg/delete_icon_hover.svg');
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
