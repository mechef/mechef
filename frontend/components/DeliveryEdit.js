// @flow

import * as React from 'react';
import Rx from 'rxjs/Rx';

import Button from './Button';
import TextInput from './TextInput';
import SelectBox from './SelectBox';
import CheckBox from './CheckBox';
import MapWithAutoComplete from './MapWithAutoComplete';
import { MeetupObject } from '../utils/flowTypes';
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '../utils/constants';

type Props = {
  onCreateMeetup: (meetup: MeetupObject) => Rx.Observable,
  onUpdateMeetup: (meetup: MeetupObject) => Rx.Observable,
  onDeleteMeetup: (meetupId: string) => Rx.Observable,
  meetupList: Array<MeetupObject>,
  currentMeetupId: string,
  goBack: () => Rx.Observable,
}

type State = MeetupObject

const availableTime = [
  { text: '1:00', value: '1:00' },
  { text: '2:00', value: '2:00' },
  { text: '3:00', value: '3:00' },
  { text: '4:00', value: '4:00' },
  { text: '5:00', value: '5:00' },
  { text: '6:00', value: '6:00' },
  { text: '7:00', value: '7:00' },
  { text: '8:00', value: '8:00' },
  { text: '9:00', value: '9:00' },
  { text: '10:00', value: '10:00' },
  { text: '11:00', value: '11:00' },
  { text: '12:00', value: '12:00' },
  { text: '13:00', value: '13:00' },
  { text: '14:00', value: '14:00' },
  { text: '15:00', value: '15:00' },
  { text: '16:00', value: '16:00' },
  { text: '17:00', value: '17:00' },
  { text: '18:00', value: '18:00' },
  { text: '19:00', value: '19:00' },
  { text: '20:00', value: '20:00' },
  { text: '21:00', value: '21:00' },
  { text: '22:00', value: '22:00' },
  { text: '23:00', value: '23:00' },
  { text: '24:00', value: '24:00' },
]

// TODO Bible: Change to real i18n in the future
const days = [
  { key: 'meetupMonday', text: 'Monday' },
  { key: 'meetupTuesday', text: 'Tuesday' },
  { key: 'meetupWednesday', text: 'Wednesday' },
  { key: 'meetupThursday', text: 'Thursday' },
  { key: 'meetupFriday', text: 'Friday' },
  { key: 'meetupSaturday', text: 'Saturday' },
  { key: 'meetupSunday', text: 'Sunday' },
];

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
        meetupLatitude: DEFAULT_LATITUDE,
        meetLongitude: DEFAULT_LONGITUDE,
        meetupAddress: '',
        type: 'meetup',
      };
    this.state = {
      // XXX Yuan:
      // 1. Add type to the response
      // 2. meetupLoatitude, meetLongitude naming
      ...currentMeetup,
      type: 'meetup',
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
            <MapWithAutoComplete
              initialValue={this.state.meetupAddress}
              initialLat={this.state.meetupLatitude}
              initialLong={this.state.meetLongitude}
              onChange={(input) => {
                this.setState({
                  meetupAddress: input,
                  meetLongitude: -1,
                  meetupLatitude: -1,
                });
              }}
              onSuggestSelect={(suggest) => {
                this.setState({
                  meetupAddress: suggest.address,
                  meetLongitude: suggest.longitude,
                  meetupLatitude: suggest.latitude,
                })
              }}
            />
          </div>
          <div className="meetupDate">
            <h3 className="title">Meet up date</h3>
            <p className="subtitle">Select Date</p>
            <div className="checkboxGroup">
              {
                days.map(day => (
                  <span key={day.key} className="checkbox">
                    <CheckBox
                      checked={this.state[day.key]}
                      onChange={() => {
                        this.setState({
                          [day.key]: !this.state[day.key],
                        });
                      }}
                    >
                      {day.text}
                    </CheckBox>
                  </span>
                ))
              }
            </div>
          </div>
          <h3 className="title">Meet up time</h3>
          <div className="meetupTime">
            <div className="smallInputContainer">
              <span className="subtitle">From</span>
              <SelectBox
                options={availableTime}
                selectedValue={this.state.meetupStartTime}
                defaultText="24:00"
                onChange={(selectedValue) => {
                  this.setState({
                    meetupStartTime: selectedValue,
                  });
                }}
              />
            </div>
            <div className="smallInputContainer">
              <span className="subtitle">To</span>
              <SelectBox
                options={availableTime}
                selectedValue={this.state.meetupEndTime}
                defaultText="24:00"
                onChange={(selectedValue) => {
                  this.setState({
                    meetupEndTime: selectedValue,
                  });
                }}
              />
            </div>
          </div>
          <h3 className="title">Note</h3>
          <p className="subtitle">meet up information to buyer</p>
          <TextInput
            type="text"
            placeholder="Write something......"
            size="large"
            value={this.state.note}
            onChange={(event) => {
              if (event && event.target) {
                this.setState({ note: event.target.value });
              }
            }}
          />
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
                if (this.state._id) {
                  // TODO: Modify to only provide updated data
                  onUpdateMeetup(this.state);
                } else {
                  onCreateMeetup(this.state);
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
              margin-bottom: 48px;
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

            .meetupTime {
              display: flex;
              justify-content: space-between;
              width: 539px;
              margin-bottom: 26px;
            }

            .smallInputContainer {
              display: flex;
              flex-direction: column;
              width: 250px;
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
