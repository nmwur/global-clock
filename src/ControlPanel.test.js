import { ControlPanel } from "./ControlPanel";

it("renders correctly", () => {
  const wrapper = shallow(
    <ControlPanel
      incrementShift={() => {}}
      decrementShift={() => {}}
      resetShift={() => {}}
    />
  );

  expect(wrapper).toMatchSnapshot();
});

it("calls resetShift on click", () => {
  const spy = sinon.spy();
  const wrapper = mount(
    <ControlPanel
      incrementShift={() => {}}
      decrementShift={() => {}}
      resetShift={() => {}}
      toggleEditMode={spy}
    />
  );

  wrapper
    .find("button")
    .last()
    .simulate("click");

  expect(spy.calledOnce).toBe(true);
});
