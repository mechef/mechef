import renderer from 'react-test-renderer';
import React from 'react';

import Login from '../login';

describe('Pages With Snapshot Testing', () => {
  it('snapshot login page', () => {
    const component = renderer.create(<Login />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
