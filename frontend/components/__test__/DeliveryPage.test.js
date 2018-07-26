import renderer from 'react-test-renderer';
import React from 'react';

import { DeliveryPage } from '../DeliveryPage';

describe('Pages With Snapshot Testing', () => {
  it('snapshot DeliveryPage Component', () => {
    const component = renderer.create(
      <DeliveryPage
        delivery={{
          meetupList: [
            {
              _id: '59e5f7ffd48173ad48d8c8ab',
              note: '9F caferia',
              meetupEndTime: '',
              meetupStartTime: '',
              meetupSaturday: false,
              meetupFriday: false,
              meetupThursday: false,
              meetupWednesday: false,
              meetupTuesday: false,
              meetupMonday: false,
              meetupSunday: false,
              meetupLongitude: 20,
              meetupLatitude: 120,
              meetupAddress: 'Rakuten Crimson House',
              type: 'meetup',
            },
          ],
          currentMeetupId: '59e5f7ffd48173ad48d8c8ab',
          currentShippingId: '',
        }}
        fetchDelivery$={() => {}}
        createMeetup$={() => {}}
        updateMeetup$={() => {}}
        deleteMeetup$={() => {}}
        setCurrentMeetupId$={() => {}}
        setError$={() => {}}
        toggleBackArrow$={() => {}}
        error={{
          isShowModal: false,
        }}
        global={{
          backArrow: {
            isShow: false,
          },
        }}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
