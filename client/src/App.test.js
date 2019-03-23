import React from "react";
import { mount, shallow } from "enzyme";

import App from "./App.js";

it("renders correctly", () => {
  const wrapper = shallow(<App />);

  expect(wrapper).toMatchSnapshot();
});

it("toggles edit mode", () => {
  const wrapper = mount(<App />);
  const instance = wrapper.instance();
  expect(instance.state.isEditMode).toEqual(false);
  instance.toggleEditMode();
  expect(instance.state.isEditMode).toEqual(true);
});

it("toggles edit mode", () => {
  const wrapper = mount(<App />);
  const instance = wrapper.instance();
  expect(instance.state.isEditMode).toEqual(false);
  instance.toggleEditMode();
  expect(instance.state.isEditMode).toEqual(true);
});
