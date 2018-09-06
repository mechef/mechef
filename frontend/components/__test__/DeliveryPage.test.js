import ShallowRenderer from 'react-test-renderer/shallow';
import React from 'react';

import { DeliveryPage } from '../DeliveryPage';

jest.mock('react-geosuggest', () => '[MOCK]Geosuggest');

describe('Pages With Snapshot Testing', () => {
  it('snapshot DeliveryPage Component', () => {
    const renderer = new ShallowRenderer();
    renderer.render(
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
        setLoading$={() => {}}
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
        t={() => {}}
      />,
    );
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
