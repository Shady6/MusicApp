import {
  tracksOnPage,
  currentPage,
  getTracksLength,
  goToPage
} from "./fav_tracks_pagination.js";
import { getViewportWidth} from "../utils/window_utils.js";

import { convertPixelUnitStringToNumber } from "../utils/css_utils.js";
import { firstImage } from "../Home_Page_Scripts/tracks_loader.js";

let upperRowTopCss = 0;
let bottomRowTopCss = 0;
let cardWidth = 0;
let topCssValuesAndCardWidthSet = false;

let xCoords = [];

let firstMiddleCard = null;

const swipeTransitionTime = 300;
const transitionClassName = "transition-all-ease-out"

$(document).ready(() => {
  setEventListeners();
});

const setEventListeners = () => {
  document.addEventListener("onFirstTracksRendered", () => {
    if (!topCssValuesAndCardWidthSet) handleFirstTracksRendered();
    if (getTracksLength() > tracksOnPage) setSwipeListeners();
  });
};

const handleFirstTracksRendered = () => {
  topCssValuesAndCardWidthSet = true;
  setTopCssAndCardWidth();
};

const setSwipeListeners = () => {
  document
    .querySelector("#track-list-container")
    .addEventListener("touchstart", (e) => {
      if (!topCssValuesAndCardWidthSet) {
        topCssValuesAndCardWidthSet = true;
        setTopCssAndCardWidth();
      }
      handleSwipeStart(e);
    });

  document
    .querySelector("#track-list-container")
    .addEventListener("touchmove", (e) => {
      handleSwipeMove(e);
    });

  document
    .querySelector("#track-list-container")
    .addEventListener("touchend", (e) => {
      handleSwipeEnd(e);
    });
};

const handleSwipeStart = (e) => {
  $(".image-card-wrapper").removeClass(transitionClassName);
  positionAllCardsAtStart();

  firstMiddleCard = getIndexOfFirstMiddleCard();

  $(".image-card-wrapper").removeClass("d-none");
  $(".image-card-wrapper").css("position", "fixed");
};

const handleSwipeMove = (e) => {
  xCoords.push(e.touches[0].pageX);

  if (xCoords.length == 2) {
    const deltaCoords = xCoords[1] - xCoords[0];
    const firstMiddleCardLeftCss = convertPixelUnitStringToNumber(
      firstMiddleCard.css("left")
    );
    for (let i = 0; i < $(".image-card-wrapper").length; i++) {
      const card = $($(".image-card-wrapper")[i]);
      if (
        (firstMiddleCardLeftCss >= 0 && currentPage !== 0) ||
        (firstMiddleCardLeftCss <= 0 &&
          currentPage !== Math.floor((getTracksLength() - 1) / tracksOnPage))
      )
        moveElementXAxis(card, deltaCoords);
    }

    xCoords = [];
  }
};

const getIndexOfFirstMiddleCard = () => {
  const cards = $(".image-card-wrapper");
  for (let i = 0; i < cards.length; i++) {
    if ($(cards[i]).css("left") === "0px") return $(cards[i]);
  }
};

const handleSwipeEnd = (e) => {
  const firstMiddleCardLeftCss = convertPixelUnitStringToNumber(
    firstMiddleCard.css("left")
  );
  $(".image-card-wrapper").addClass(transitionClassName);

  let nextPageNum = currentPage;

  if (firstMiddleCardLeftCss > getViewportWidth() / 3) {
    positionCards(0, tracksOnPage, 0);
    positionCards(tracksOnPage, tracksOnPage * 2, getViewportWidth());
    nextPageNum--;
  } else if (
    firstMiddleCardLeftCss < 0 &&
    Math.abs(firstMiddleCardLeftCss) > getViewportWidth() / 3
  ) {
    const cardsLength = $(".image-card-wrapper").length;
    positionCards(
      cardsLength - tracksOnPage * 2,
      cardsLength - tracksOnPage,
      -getViewportWidth()
    );
    positionCards(cardsLength - tracksOnPage, cardsLength, 0);
    nextPageNum++;
  } else positionAllCardsAtStart();

  xCoords = [];

  setTimeout(() => {
    if (nextPageNum !== currentPage) goToPage(nextPageNum);
  }, swipeTransitionTime);
};

const moveElementXAxis = (element, offset) => {
  const cssLeftNumericalValue = convertPixelUnitStringToNumber(
    element.css("left")
  );
  element.css("left", cssLeftNumericalValue + offset);
};

const positionRightSideCards = () => {
  const cardsLength = $(".image-card-wrapper").length;
  positionCards(cardsLength - tracksOnPage, cardsLength, getViewportWidth());
};

const positionMiddleCards = (edgeLeft, edgeRight) => {
  const cardsLength = $(".image-card-wrapper").length;
  if (edgeLeft) positionCards(0, tracksOnPage, 0);
  else if (edgeRight)
    positionCards(
      cardsLength - (getTracksLength() - currentPage * tracksOnPage),
      cardsLength,
      0
    );
  else positionCards(tracksOnPage, tracksOnPage * 2, 0);
};

const positionLeftSideCards = () => {
  positionCards(0, tracksOnPage, -getViewportWidth());
};

const positionCards = (sliceFrom, sliceTo, leftOffset) => {
  let cards = $(".image-card-wrapper").slice(sliceFrom, sliceTo);

  for (let i = 0; i < cards.length; i++) {
    let card = $(cards[i]);
    const leftCss = leftOffset + cardWidth * (i % Math.floor(tracksOnPage / 2));

    card.css("left", leftCss);
    card.css("top", i < tracksOnPage / 2 ? upperRowTopCss : bottomRowTopCss);
  }
};

const setTopCssAndCardWidth = () => {
  let cards = $(".image-card-wrapper").filter(
    (i, e) => $(e).css("display") != "none"
  );

  cardWidth = $(cards[0]).width();
  upperRowTopCss = $(cards[0]).position().top;
  bottomRowTopCss = $(cards[cards.length / 2]).position().top;
};

const positionAllCardsAtStart = () => {
  let edgeLeft = true;
  let edgeRight = true;

  if (currentPage != Math.floor((getTracksLength() - 1) / tracksOnPage)) {
    edgeRight = false;
    positionRightSideCards();
  }
  if (currentPage != 0) {
    edgeLeft = false;
    positionLeftSideCards();
  }
  positionMiddleCards(edgeLeft, edgeRight);
};
