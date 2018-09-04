import ShallowRenderer from 'react-test-renderer/shallow';
import React from 'react';

import CheckBox from '../CheckBox';

describe('Pages With Snapshot Testing', () => {
  it('snapshot CheckBox Component', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<CheckBox onChange={isChecked => {}} checked />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
