import { addDays } from "date-fns";
import * as d3 from "d3";

import { timeline } from "ui/constants";

const getDomain = time => [
  addDays(time, -timeline.days / 2),
  addDays(time, timeline.days / 2)
];

export default time =>
  d3
    .scaleTime()
    .domain(getDomain(time))
    .range([0, window.innerWidth * timeline.width]);
