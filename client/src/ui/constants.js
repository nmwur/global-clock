const hue = Math.random() * 255;

module.exports = {
  colors: {
    bg: `hsl(${hue}, 30%, 80%)`,
    text: `hsl(${hue}, 20%, 40%)`
  },
  timeline: {
    width: 30,
    days: 40
  }
};
