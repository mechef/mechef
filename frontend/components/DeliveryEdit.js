// @flow

import * as React from 'react';
import Rx from 'rxjs/Rx';

import Button from './Button';
import TextInput from './TextInput';

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
  }) => Rx.Observable,
  onDeleteMeetup: (meetupId: string) => Rx.Observable,
  meetupList: Array<{
    _id: string,
    note: string,
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
  }>,
  currentMeetupId: string,
  goBack: () => Rx.Observable,
}

type State = {
  id: string,
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
  note: string,
}

class DeliveryEdit extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const currentMeetup = props.meetupList.find(
      delivery => delivery._id === props.currentMeetupId) || {
        _id: '',
        note: '',
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
      };
    this.state = {
      id: currentMeetup._id,
      note: currentMeetup.note,
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
    };
  }
  render() {
    const { goBack, onCreateMeetup, onUpdateMeetup, onDeleteMeetup, currentMeetupId } = this.props;
    return (
      <div className="dashboard-content">
        <p className="dashboard-content__title">Edit Delivery</p>
        <div className="editContainer">
          <div className="meetupLocation">
            <h3 className="title">Meet up location</h3>
            <p className="subtitle">Location and Time</p>
            <TextInput
              type="text"
              placeholder="Enter Ingredients..."
              size="large"
            />
          </div>
          <h3 className="title">Meet up date</h3>
          <div className="meetupDate">
            <div className="smallInputContainer">
              <span className="subtitle">Select Date MM/DD/YYYY</span>
              <TextInput
                type="text"
                size="small"
              />
            </div>
            <div className="smallInputContainer">
              <span className="subtitle">Dynamic Period</span>
              <TextInput
                type="select"
                size="small"
              />
            </div>
          </div>
          <h3 className="title">Meet up time</h3>
          <p className="subtitle">Location and Time</p>
        </div>
        <div className="buttonGroup">
          <div>
            <Button
              buttonStyle="greenBorderOnly"
              size="small"
              onClick={() => {
                onDeleteMeetup(currentMeetupId);
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
                if (this.state.id) {
                  // TODO: Modify to only provide updated data
                  onUpdateMeetup({
                    _id: this.state.id,
                    note: this.state.note,
                    meetupEndTime: this.state.meetupEndTime,
                    meetupStartTime: this.state.meetupStartTime,
                    meetupSaturday: this.state.meetupSaturday,
                    meetupFriday: this.state.meetupFriday,
                    meetupThursday: this.state.meetupThursday,
                    meetupWednesday: this.state.meetupWednesday,
                    meetupTuesday: this.state.meetupTuesday,
                    meetupMonday: this.state.meetupMonday,
                    meetupSunday: this.state.meetupSunday,
                    meetLongitude: this.state.meetLongitude,
                    meetupLatitude: this.state.meetupLatitude,
                    meetupAddress: this.state.meetupAddress,
                    type: this.state.type,
                  });
                } else {
                  onCreateMeetup({
                    note: this.state.note,
                    meetupEndTime: this.state.meetupEndTime,
                    meetupStartTime: this.state.meetupStartTime,
                    meetupSaturday: this.state.meetupSaturday,
                    meetupFriday: this.state.meetupFriday,
                    meetupThursday: this.state.meetupThursday,
                    meetupWednesday: this.state.meetupWednesday,
                    meetupTuesday: this.state.meetupTuesday,
                    meetupMonday: this.state.meetupMonday,
                    meetupSunday: this.state.meetupSunday,
                    meetLongitude: this.state.meetLongitude,
                    meetupLatitude: this.state.meetupLatitude,
                    meetupAddress: this.state.meetupAddress,
                    type: this.state.type,
                  });
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
              width: 744px;
              height: 515px;
              padding-top: 21px;
              padding-left: 16px;
              border-radius: 4px;
              background-color: #ffffff;
            }

            .meetupLocation {
              margin-bottom: 13px;
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

            .meetupDate {
              display: flex;
              justify-content: space-between;
              width: 539px;
              margin-bottom: 26px;
            }

            .smallInputContainer {
              display: flex;
              flex-direction: column;
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
              width: 744px;
              padding-top: 30px;
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

export default DeliveryEdit;
