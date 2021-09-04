import Enzyme, {shallow} from 'enzyme';
import React from 'react';
import App from './App';
import Adapter from 'enzyme-adapter-react-16';
 Enzyme.configure({ adapter: new Adapter() });
 
 /**
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = () => shallow(<App />);

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of data-test c1scoL0ve!
 *
 */
const findByTestAttr = (wrapper,val) => wrapper.find(`[data-test='${val}']`);

 test('test renders react',() =>{
   const wrapper = setup();
   const appComponent =  findByTestAttr(wrapper,"component-app")
   expect(appComponent.length).toBe(1);
 })

 test('test renders button',() =>{
  const wrapper = setup();
  const button = findByTestAttr(wrapper,'increment-button');
  expect(button.length).toBe(1);
 
})

test('test renders counter display',() =>{
  const wrapper = setup();
  const display = findByTestAttr(wrapper,'counter-display');
  expect(display.length).toBe(1);
 
})

test('test conter starts at 0',() =>{ 
  const wrapper = setup();
  const count = findByTestAttr(wrapper,'count').text();
  expect (count).toBe("0")
 
})

test('test clicking on button increments counter display',() =>{
  const wrapper = setup();

  //find the button
  const incButton = findByTestAttr(wrapper,'increment-button')

  //click on the button
  incButton.simulate('click')

  //find the display and check if cunter is incremented
  const count = findByTestAttr(wrapper,'count').text();
  expect(count).toBe("1")
})

test('test click on button decrements counter display when value is already incremented ',() =>{
  const wrapper = setup();

  //find the button
  const incButton = findByTestAttr(wrapper,'increment-button')

  //click on the button
  incButton.simulate('click')

  //find the button
  const decButton = findByTestAttr(wrapper,'decrement-button')

  //click on the button
  decButton.simulate('click');

  //find the display and chceck if counter is decrmented
  const count = findByTestAttr(wrapper,'count').text();
  expect(count).toBe('0')
})

describe('error When counter goes below zero',()=>{
  test('error does not show when not needed',() =>{
    const wrapper =setup();
    const errorDiv = findByTestAttr(wrapper,'error-message');

    const errorHasHiddenClass = errorDiv.hasClass('hidden');
    expect(errorHasHiddenClass).toBe(true);
  });

describe('counter is clicked and decrement is zero',()=>{
  
  let wrapper;
  beforeEach(()=>{
  wrapper =setup();

  const decButton = findByTestAttr(wrapper,'decrement-button');
  decButton.simulate('click');
  });

  test('error shows', () =>{

    const errorDiv = findByTestAttr(wrapper,'error-message');
    const errorHasHiddenClass = errorDiv.hasClass('hidden');
    expect(errorHasHiddenClass).toBe(false)
  });

  test('counter still displays 0',()=>{
    const count = findByTestAttr(wrapper,'count').text();
    expect(count).toBe("0");
  });

  test("clicking increment clears the error", () => {
    // find and click the increment button
    const incButton = findByTestAttr(wrapper, "increment-button");
    incButton.simulate("click");

    // check the class of the error message
    const errorDiv = findByTestAttr(wrapper, "error-message");
    const errorHasHiddenClass = errorDiv.hasClass("hidden");
    expect(errorHasHiddenClass).toBe(true);
});

});

});