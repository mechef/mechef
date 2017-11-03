import renderer from 'react-test-renderer';
import React from 'react';

import DeliveryEdit from '../DeliveryEdit';

jest.mock('react-geosuggest', () => '[MOCK]Geosuggest');

describe('Pages With Snapshot Testing', () => {
  it('snapshot DeliveryEdit Component', () => {
    global.google = {
      maps: {
        Map: jest.fn(),
      },
    };
    const component = renderer.create(
      <DeliveryEdit
        meetupList={[{
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
          meetLongitude: 20,
          meetupLatitude: 120,
          meetupAddress: 'Rakuten Crimson House',
          type: 'meetup',
        }]}
        onCreateMeetup={() => {}}
        onUpdateMeetup={() => {}}
        onDeleteMeetup={() => {}}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
