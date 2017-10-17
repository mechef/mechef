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
    this.currentMeetup = props.deliveryList.find(delivery => delivery._id === props.currentMeetupId) || {};
  }
  render() {
    return (
      <div>
        <p>Delivery Edit</p>
        <p>type: {this.currentMeetup.type}</p>
        <style jsx>
          {`
          `}
        </style>
      </div>
    );
  }

}

export default DeliveryEdit;
