import createNextMusicCard, {
  getDisplayedTrackJson,
} from "./music_card_manager.js";
import { emptyMusicCard } from "./DOM_music_card_creator.js";
import { addTrackToFavorites } from "./track_actions.js";
import { getViewportWidth, getViewportHeight } from "./utils/window_utils.js";
import { clamp } from "./utils/math_utils.js";
import {
  setCssPropertyCrossBrowser,
  convertPixelUnitStringToNumber,
} from "./utils/css_utils.js";

let swipesXCoords = [];
const maxRotation = 20;
const maxOffscrenRotation = 45;
const maxYOffset = 25;
const yOffseetFactor = 1 / 3;
const rotationFactor = 1 / 10;
const xOffsetScreenWidthRatioToCreateNextCard = 1 / 3;

$(document).ready(() => {
  setupLikeControlsListeners();
});

const setupLikeControlsListeners = () => {
  setThumbsClicksListeners();
  setUpSwipeListeners();
};

const setThumbsClicksListeners = () => {
  $("#thumbsUpBtn").on("click", () => {
    addTrackToFavorites();
    createNextMusicCard();
  });

  $("#thumbsDownBtn").on("click", () => {
    createNextMusicCard();
  });
};

const setUpSwipeListeners = () => {
  document
    .querySelector(".albumCoverContainer")
    .addEventListener("touchstart", () => {
      hadnleSwipeStart();
    });

  document 
    .querySelector(".albumCoverContainer")
    .addEventListener("touchmove", (e) => {
      handleSwipe(e);
    });

  document
    .querySelector(".albumCoverContainer")
    .addEventListener("touchend", () => {
      handleSwipeEnd();
    });
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
  const cssTopNumericalValue = convertPixelUnitStringToNumber(
    $("img").css("top")
  );

  const xOffsetScreenWidthRatio = cssLeftNumericalValue / getViewportWidth();

  if (xOffsetScreenWidthRatio > xOffsetScreenWidthRatioToCreateNextCard) {
    moveImageOffscreen();
    addTrackToFavorites();
    createNextMusicCard();
  } else if (xOffsetScreenWidthRatio < -xOffsetScreenWidthRatioToCreateNextCard)
    createNextMusicCard();
  else setLeftTopAndRotation(0, 0, 0);
};

const moveImageOffscreen = () => {
  const {xOffset, yOffset} = calculateOffscrenPositionForCard();

  setLeftTopAndRotation(xOffset, yOffset, maxRotation);
}

const calculateOffscrenPositionForCard = (
  cssLeftNumericalValue,
  cssTopNumericalValue
) => {

  const xOffset = getViewportWidth() / 2 - $("img").width() / 2 - cssLeftNumericalValue;
  const yOffset = getViewportHeight() / 2 - $("img").height() / 2 + cssTopNumericalValue;
  return {xOffset, yOffset};
};

const tiltImage = (cssLeftNumericalValue, deltaSwpieXCoords) => {
  const { xOffset, yOffset, rotation } = calculateLeftTopAndRotation(
    cssLeftNumericalValue,
    deltaSwpieXCoords
  );
  setLeftTopAndRotation(xOffset, yOffset, rotation);
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

const setLeftTopAndRotation = (xOffset, yOffset, rotation) => {
  $("img").css("left", `${xOffset}px`);
  $("img").css("top", `${yOffset}px`);
  setCssPropertyCrossBrowser("img", "transform", `rotate(${rotation}deg)`);
};

export const setLoadingOnLikeControl = () => {
  emptyMusicCard();
  $(".albumCoverContainer > .spinner").addClass("d-flex");
  $(".albumCoverContainer > .spinner").removeClass("d-none");
};
