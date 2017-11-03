import renderer from 'react-test-renderer';
import React from 'react';

import CheckBox from '../CheckBox';


describe('Pages With Snapshot Testing', () => {
  it('snapshot CheckBox Component', () => {
    const component = renderer.create(<CheckBox onChange={(isChecked) => {}} checked />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
