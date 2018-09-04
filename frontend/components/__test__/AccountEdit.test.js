import ShallowRenderer from 'react-test-renderer/shallow';
import React from 'react';

import AccountEdit from '../AccountEdit';

describe('Pages With Snapshot Testing', () => {
  it('snapshot AccountEdit Component', () => {
    const renderer = new ShallowRenderer();
    renderer.render(
      <AccountEdit
        account={{}}
        goBack={() => {}}
        onUpdateField={() => {}}
        onSubmit={() => {}}
        t={() => {}}
      />,
    );
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
