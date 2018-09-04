import ShallowRenderer from 'react-test-renderer/shallow';
import React from 'react';

import AccountDetail from '../AccountDetail';

describe('Pages With Snapshot Testing', () => {
  it('snapshot AccountDetail Component', () => {
    const renderer = new ShallowRenderer();
    renderer.render(
      <AccountDetail
        account={{
          name: 'bible',
        }}
        onUpdateAccount={() => {}}
        t={() => {}}
      />,
    );
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
