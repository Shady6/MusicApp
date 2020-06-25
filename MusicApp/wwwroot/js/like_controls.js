import createNextMusicCard, {
  getDisplayedTrackJson,
} from "./music_card_manager.js";
import { emptyMusicCard } from "./DOM_music_card_creator.js";
import { addTrackToFavorites } from "./track_actions.js";
import { getViewportWidth, getViewportHeight } from "./utils/window_utils.js";
import { clamp } from "./utils/math_utils.js";
import {
  setImgLeftTopAndRotationCss,
  convertPixelUnitStringToNumber,
} from "./utils/css_utils.js";

let swipesXCoords = [];
const maxRotation = 20;
const maxOffscrenRotation = 45;
const maxYOffset = 25;

const yOffseetFactor = 1 / 3;
const rotationFactor = 1 / 10;

const xOffsetOffscreenPositionFactor = 0.77;
const yOffsetOffscreenPositionFactor = 0.5;

const xOffsetScreenWidthRatioToCreateNextCard = 1 / 3;

const timeToGoOffScreen = 300;

let canStartToSwipeAgain = true;

$(document).ready(() => {
  setupLikeControlsListeners();
});

const setupLikeControlsListeners = () => {
  setThumbsClicksListeners();
  setUpSwipeListeners();
};

const setThumbsClicksListeners = () => {
  $("#thumbsUpBtn").on("click", () => {
    likeTrack();
  });

  $("#thumbsDownBtn").on("click", () => {
    dislikeTrack();
  });
};

const setUpSwipeListeners = () => {
  document
    .querySelector(".albumCoverContainer")
    .addEventListener("touchstart", () => {
      if (canStartToSwipeAgain) hadnleSwipeStart();
    });

  document
    .querySelector(".albumCoverContainer")
    .addEventListener("touchmove", (e) => {
      if (canStartToSwipeAgain) handleSwipe(e);
    });

  document
    .querySelector(".albumCoverContainer")
    .addEventListener("touchend", () => {
      if (canStartToSwipeAgain) handleSwipeEnd();
    });
};

const likeTrack = () => {
  addTrackToFavorites();
  createNextMusicCard();
};

const dislikeTrack = () => {
  createNextMusicCard();
};

const hadnleSwipeStart = () => {
  $("img").removeClass("ease-out-transition-all");
  swipesXCoords = [];
};

const handleSwipe = (e) => {
  swipesXCoords.push(e.touches[0].pageX);

  if (swipesXCoords.length == 2) {
    let cssLeftNumericalValue = convertPixelUnitStringToNumber(
      $("img").css("left")
    );
    const deltaSwpieXCoords = swipesXCoords[1] - swipesXCoords[0];

    tiltImage(cssLeftNumericalValue, deltaSwpieXCoords);

    swipesXCoords = [];
  }
};

const handleSwipeEnd = () => {
  $("img").addClass("ease-out-transition-all");

  const cssLeftNumericalValue = convertPixelUnitStringToNumber(
    $("img").css("left")
  );
  const xOffsetScreenWidthRatio = cssLeftNumericalValue / getViewportWidth();

  if (xOffsetScreenWidthRatio > xOffsetScreenWidthRatioToCreateNextCard) {
    swipe(true);
  } else if (xOffsetScreenWidthRatio < -xOffsetScreenWidthRatioToCreateNextCard)
    swipe(false);
  else setImgLeftTopAndRotationCss(0, 0, 0);
};

const swipe = (swipedRight = true) => {
  canStartToSwipeAgain = false;
  moveImageOffscreen(swipedRight);

  setTimeout(() => {
    if (swipedRight) likeTrack();
    else dislikeTrack();

    canStartToSwipeAgain = true;
  }, timeToGoOffScreen);
};

const moveImageOffscreen = (goRight) => {
  const directionValue = goRight ? 1 : -1;
  const { xOffset, yOffset } = calculateOffscrenPositionForCard(directionValue);
  setImgLeftTopAndRotationCss(xOffset, yOffset, maxOffscrenRotation * directionValue);
};

const calculateOffscrenPositionForCard = (directionValue) => {
  const xOffset =
  directionValue *
    (getViewportWidth() * xOffsetOffscreenPositionFactor +
      $("img").width() / 2);
  const yOffset = -getViewportHeight() * yOffsetOffscreenPositionFactor;
  return { xOffset, yOffset };
};

const tiltImage = (cssLeftNumericalValue, deltaSwpieXCoords) => {
  const { xOffset, yOffset, rotation } = calculateLeftTopAndRotation(
    cssLeftNumericalValue,
    deltaSwpieXCoords
  );
  setImgLeftTopAndRotationCss(xOffset, yOffset, rotation);
};

const calculateLeftTopAndRotation = (
  cssLeftNumericalValue,
  deltaSwpieXCoords
) => {
  const xOffset = cssLeftNumericalValue + deltaSwpieXCoords;
  const yOffset = clamp(
    -Math.abs(cssLeftNumericalValue) * yOffseetFactor,
    -maxYOffset,
    0
  );
  const rotation = clamp(
    cssLeftNumericalValue * rotationFactor,
    -maxRotation,
    maxRotation
  );
  return { xOffset, yOffset, rotation };
};

export const setLoadingOnLikeControl = () => {
  emptyMusicCard();
  $(".albumCoverContainer > .spinner").addClass("d-flex");
  $(".albumCoverContainer > .spinner").removeClass("d-none");
};
