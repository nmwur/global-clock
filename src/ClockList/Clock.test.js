import { Clock } from "./Clock";

it("renders correctly", () => {
  const wrapper = shallow(<Clock city={`New York`} timezone={-7} shift={2} />);

  expect(wrapper).toMatchSnapshot();
});

it("renders correctly again", () => {
  const wrapper = render(<Clock city={`New York`} timezone={-7} shift={2} />);
  expect(wrapper).toMatchSnapshot();
});

// it("formats city correctly", () => {
//   const wrapper = mount(<Clock city={`New York`} timezone={-7} shift={2} />);

//   // set property displayName of City component to "City" so that enzyme could find it
//   const text = wrapper.find("City").text();
//   expect(text).toEqual("New York");
// });
