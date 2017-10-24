import renderer from 'react-test-renderer';
import React from 'react';

import Spinner from '../Spinner';


describe('Pages With Snapshot Testing', () => {
  it('snapshot Spinner Component', () => {
    const component = renderer.create(<Spinner />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
