import React from "react";
import { shallow } from "enzyme";

import { ClockList } from "./index";

it("scrolls to given time", () => {
  const wrapper = shallow(
    <ClockList
      clockList={[]}
      isEditMode={false}
      isLoggedIn={false}
      addClock={() => {}}
      deleteClock={() => {}}
      onRef={() => {}}
    />
  );
  const instance = wrapper.instance();

  const time = new Date("2019-03-01");
  instance.scrollTo(time);
  expect(instance.state.time).toEqual(time);
});
