import renderer from 'react-test-renderer';
import React from 'react';

import Modal from '../Modal';


describe('Pages With Snapshot Testing', () => {
  it('snapshot DeliveryPage Component', () => {
    const component = renderer.create(
      <Modal
        title="Error"
        message="Something Wrong"
        onCancel={() => {}}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
