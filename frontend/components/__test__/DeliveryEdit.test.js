import ShallowRenderer from 'react-test-renderer/shallow';
import React from 'react';

import DeliveryEdit from '../DeliveryEdit';

jest.mock('react-geosuggest', () => '[MOCK]Geosuggest');

describe('Pages With Snapshot Testing', () => {
  it('snapshot DeliveryEdit Component', () => {
    const renderer = new ShallowRenderer();
    global.google = {
      maps: {
        Map: jest.fn(),
      },
    };
    renderer.render(
      <DeliveryEdit
        meetupList={[
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
        ]}
        displayMeetup={{
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
        }}
        onCreateMeetup={() => {}}
        onUpdateMeetup={() => {}}
        onDeleteMeetup={() => {}}
        t={() => {}}
      />,
    );
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
