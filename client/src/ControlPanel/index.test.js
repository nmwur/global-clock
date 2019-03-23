import React from "react";
import { shallow, mount } from "enzyme";
import sinon from "sinon";

import { ControlPanel } from "./index";

it("renders correctly", () => {
  const wrapper = shallow(
    <ControlPanel
      isEditMode={false}
      isLoggedIn={false}
      toggleEditMode={() => {}}
      resetShift={() => {}}
      updateClockList={() => {}}
    />
  );

  expect(wrapper).toMatchSnapshot();
});

it("calls resetShift on click", () => {
  const spy = sinon.spy();
  const wrapper = mount(
    <ControlPanel
      isEditMode={false}
      isLoggedIn={false}
      toggleEditMode={() => {}}
      resetShift={spy}
      updateClockList={() => {}}
    />
  );

  wrapper
    .find("button")
    .at(0)
    .simulate("click");

  expect(spy.calledOnce).toBe(true);
});

it("calls toggleEditMode on click", () => {
  const spy = sinon.spy();
  const wrapper = mount(
    <ControlPanel
      isEditMode={false}
      isLoggedIn={false}
      toggleEditMode={spy}
      resetShift={() => {}}
      updateClockList={() => {}}
    />
  );

  wrapper
    .find("button")
    .at(1)
    .simulate("click");

  expect(spy.calledOnce).toBe(true);
});
