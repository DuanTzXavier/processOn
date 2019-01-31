import React from 'react';
import Designer from '../Designer';
import renderer from 'react-test-renderer';




// UI测试
test('Link changes the class when hovered', () => {
    const component = renderer.create(
      <Designer page="http://www.facebook.com">Facebook</Designer>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  
    // manually trigger the callback
    tree.props.onMouseEnter();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  
    // manually trigger the callback
    tree.props.onMouseLeave();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
