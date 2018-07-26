import renderer from 'react-test-renderer';
import React from 'react';

import TextInput from '../TextInput';

describe('Pages With Snapshot Testing', () => {
  it('snapshot TextInput Component', () => {
    const component = renderer.create(<TextInput type="text" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
