import renderer from 'react-test-renderer';
import React from 'react';

import DeliveryList from '../DeliveryList';

jest.mock('react-geosuggest', () => '[MOCK]Geosuggest');

describe('Pages With Snapshot Testing', () => {
  it('snapshot DeliveryList Component', () => {
    const component = renderer.create(
      <DeliveryList
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
        onEditDelivery={() => {}}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
