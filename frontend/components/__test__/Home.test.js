import renderer from 'react-test-renderer';
import React from 'react';

import Home from '../Home';


describe('Pages With Snapshot Testing', () => {
  it('snapshot DeliveryPage Component', () => {
    const component = renderer.create(<Home />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
