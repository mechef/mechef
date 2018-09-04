import ShallowRenderer from 'react-test-renderer/shallow';
import React from 'react';

import Home from '../Home';

describe('Pages With Snapshot Testing', () => {
  it('snapshot DeliveryPage Component', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<Home />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
