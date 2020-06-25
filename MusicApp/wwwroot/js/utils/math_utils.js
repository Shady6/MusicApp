export const clamp = function (clampedNumber ,min, max) {
    return Math.min(Math.max(clampedNumber, min), max);
  };