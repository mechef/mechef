import renderer from 'react-test-renderer';
import React from 'react';

import Button from '../Button';


describe('Pages With Snapshot Testing', () => {
  it('snapshot Button Component', () => {
    const component = renderer.create(<Button />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
