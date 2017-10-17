// @flow
import * as React from 'react';
import Rx from 'rxjs';

type Props = {
  onCreateMeetup: ({
    type: string,
    meetupAddress: string,
    meetupLatitude: number,
    meetLongitude: number,
    meetupSunday: boolean,
    meetupMonday: boolean,
    meetupTuesday: boolean,
    meetupWednesday: boolean,
    meetupThursday: boolean,
    meetupFriday: boolean,
    meetupSaturday: boolean,
    meetupStartTime: string,
    meetupEndTime: string,
    note: string
  }) => Rx.Observable,
  onUpdateMeetup: ({
    _id: string,
    note: string,
    shippingCost: number,
    meetupEndTime: string,
    meetupStartTime: string,
    meetupSaturday: boolean,
    meetupFriday: boolean,
    meetupThursday: boolean,
    meetupWednesday: boolean,
    meetupTuesday: boolean,
    meetupMonday: boolean,
    meetupSunday: boolean,
    meetLongitude: number,
    meetupLatitude: number,
    meetupAddress: string,
    type: string,
    shippingAreas: Array
  }) => Rx.Observable,
  onDeleteMeetup: (meetupId: string) => Rx.Observable,
  deliveryList: Array<{
    _id: string,
    note: string,
    shippingCost: number,
    meetupEndTime: string,
    meetupStartTime: string,
    meetupSaturday: boolean,
    meetupFriday: boolean,
    meetupThursday: boolean,
    meetupWednesday: boolean,
    meetupTuesday: boolean,
    meetupMonday: boolean,
    meetupSunday: boolean,
    meetLongitude: number,
    meetupLatitude: number,
    meetupAddress: string,
    type: string,
    email: string,
    shippingAreas: Array
  }>,
  currentMeetupId: string,
  goBack: () => Rx.Observable,
}

class DeliveryEdit extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    const currentMeetup = props.deliveryList.find(
      delivery => delivery._id === props.currentMeetupId) || {
        _id: '',
        note: '',
        shippingCost: 0,
        meetupEndTime: '',
        meetupStartTime: '',
        meetupSaturday: false,
        meetupFriday: false,
        meetupThursday: false,
        meetupWednesday: false,
        meetupTuesday: false,
        meetupMonday: false,
        meetupSunday: false,
        meetLongitude: -1,
        meetupLatitude: -1,
        meetupAddress: '',
        type: 'meetup',
        email: '',
        shippingAreas: [],
      };
    this.state = {
      id: currentMeetup._id,
      note: currentMeetup.note,
      shippingCost: currentMeetup.shippingCost,
      meetupEndTime: currentMeetup.meetupEndTime,
      meetupStartTime: currentMeetup.meetupStartTime,
      meetupSaturday: currentMeetup.meetupSaturday,
      meetupFriday: currentMeetup.meetupFriday,
      meetupThursday: currentMeetup.meetupThursday,
      meetupWednesday: currentMeetup.meetupWednesday,
      meetupTuesday: currentMeetup.meetupTuesday,
      meetupMonday: currentMeetup.meetupMonday,
      meetupSunday: currentMeetup.meetupSunday,
      meetLongitude: currentMeetup.meetLongitude,
      meetupLatitude: currentMeetup.meetupLatitude,
      meetupAddress: currentMeetup.meetupAddress,
      type: currentMeetup.type,
      email: currentMeetup.email,
      shippingAreas: currentMeetup.shippingAreas,
    };
  }
  render() {
    const { goBack, onCreateMeetup, onUpdateMeetup, onDeleteMeetup, currentMeetupId } = this.props;
    return (
      <div className="dashboard-content">
        <p className="dashboard-content__title">Edit Delivery</p>
        <div className="edit-ingredient">
        </div>
        <div className="buttonGroup">
          <span
            className="secondaryBtn"
            role="button"
            tabIndex="-1"
            onClick={() => {
              onDeleteMeetup(currentMeetupId);
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
                onUpdateMeetup({
                  _id: this.state.currentMeetup._id,
                  note: this.state.currentMeetup.note,
                  shippingCost: this.state.currentMeetup.shippingCost,
                  meetupEndTime: this.state.currentMeetup.meetupEndTime,
                  meetupStartTime: this.state.currentMeetup.meetupStartTime,
                  meetupSaturday: this.state.currentMeetup.meetupSaturday,
                  meetupFriday: this.state.currentMeetup.meetupFriday,
                  meetupThursday: this.state.currentMeetup.meetupThursday,
                  meetupWednesday: this.state.currentMeetup.meetupWednesday,
                  meetupTuesday: this.state.currentMeetup.meetupTuesday,
                  meetupMonday: this.state.currentMeetup.meetupMonday,
                  meetupSunday: this.state.currentMeetup.meetupSunday,
                  meetLongitude: this.state.currentMeetup.meetLongitude,
                  meetupLatitude: this.state.currentMeetup.meetupLatitude,
                  meetupAddress: this.state.currentMeetup.meetupAddress,
                  type: this.state.currentMeetup.type,
                  email: this.state.currentMeetup.email,
                  shippingAreas: this.state.currentMeetup.shippingAreas,
                });
              } else {
                onCreateMeetup({
                  note: this.state.currentMeetup.note,
                  shippingCost: this.state.currentMeetup.shippingCost,
                  meetupEndTime: this.state.currentMeetup.meetupEndTime,
                  meetupStartTime: this.state.currentMeetup.meetupStartTime,
                  meetupSaturday: this.state.currentMeetup.meetupSaturday,
                  meetupFriday: this.state.currentMeetup.meetupFriday,
                  meetupThursday: this.state.currentMeetup.meetupThursday,
                  meetupWednesday: this.state.currentMeetup.meetupWednesday,
                  meetupTuesday: this.state.currentMeetup.meetupTuesday,
                  meetupMonday: this.state.currentMeetup.meetupMonday,
                  meetupSunday: this.state.currentMeetup.meetupSunday,
                  meetLongitude: this.state.currentMeetup.meetLongitude,
                  meetupLatitude: this.state.currentMeetup.meetupLatitude,
                  meetupAddress: this.state.currentMeetup.meetupAddress,
                  type: this.state.currentMeetup.type,
                  email: this.state.currentMeetup.email,
                  shippingAreas: this.state.currentMeetup.shippingAreas,
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

export default DeliveryEdit;
