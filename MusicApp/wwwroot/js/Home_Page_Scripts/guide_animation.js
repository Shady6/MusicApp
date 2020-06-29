import { getViewportWidth, getViewportHeight } from "../utils/window_utils.js";
import { setLeftTopAndRotationCss } from "../utils/css_utils.js";

const guideAnimationXOffsetFactor = 1 / 6;
const guideAnimationYOffsetFactor = 1 / 10;
const guideAnimationRotation = 14;
const guideAnimationOpacity = 1;
const guideSingleAnimationTime = 400;

let animatedElementSelector = "";

export const playGuideAnimation = (_animatedElementSelector) => {
  animatedElementSelector = _animatedElementSelector;
  $(".like-indicator-mobile").removeClass("d-none");

  let totalTimeWaiting = guideSingleAnimationTime;

  animateGuide(1, true);

  setTimeout(() => {
    animateGuide(0, true);
  }, totalTimeWaiting);

  totalTimeWaiting += guideSingleAnimationTime;

  setTimeout(() => {
    animateGuide(-1, false);
  }, totalTimeWaiting);

  totalTimeWaiting += guideSingleAnimationTime;

  setTimeout(() => {
    animateGuide(0, false);
  }, totalTimeWaiting);

  totalTimeWaiting += guideSingleAnimationTime;

  setTimeout(() => {
    cleanupCssAfterAnimation();
  }, totalTimeWaiting);

  return totalTimeWaiting;
};

const animateGuide = (directionSign, isLikeButton) => {
  const left = directionSign * getViewportWidth() * guideAnimationXOffsetFactor;
  const top =
    -Math.abs(directionSign) *
    getViewportHeight() *
    guideAnimationYOffsetFactor;
  const rotation = directionSign * guideAnimationRotation;
  const opacity = Math.abs(directionSign) * guideAnimationOpacity;
  const thumbIndicatorSelector = isLikeButton
    ? ".thumbs-up-div-mobile"
    : ".thumbs-down-div-mobile";

  setLeftTopAndRotationCss(animatedElementSelector, left, top, rotation);
  $(thumbIndicatorSelector).css("opacity", opacity);
};

const cleanupCssAfterAnimation = () => {
  $(".hovereffect").removeClass("ease-out-transition-all-long");
  $(".like-indicator-mobile").removeClass("ease-out-transition-all-long");
  $(".like-indicator-mobile").addClass("d-none");
};
