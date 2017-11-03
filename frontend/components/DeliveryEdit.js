// @flow

import * as React from 'react';
import Rx from 'rxjs/Rx';

import Button from './Button';
import TextInput from './TextInput';
import MapWithAutoComplete from './MapWithAutoComplete';
import { MeetupObject } from '../utils/flowTypes';


type Props = {
  onCreateMeetup: (meetup: MeetupObject) => Rx.Observable,
  onUpdateMeetup: (meetup: MeetupObject) => Rx.Observable,
  onDeleteMeetup: (meetupId: string) => Rx.Observable,
  meetupList: Array<MeetupObject>,
  currentMeetupId: string,
  goBack: () => Rx.Observable,
}

type State = {
  meetup: MeetupObject,
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
      meetup: currentMeetup,
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
            <MapWithAutoComplete />
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
          <div className="meetupDate">
            <div className="smallInputContainer">
              <span className="subtitle">From</span>
              <TextInput
                type="select"
                size="small"
              />
            </div>
            <div className="smallInputContainer">
              <span className="subtitle">To</span>
              <TextInput
                type="select"
                size="small"
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
                  onUpdateMeetup(this.state.meetup);
                } else {
                  onCreateMeetup(this.state.meetup);
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
              height: 100%;
              padding: 24px 20px;
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
