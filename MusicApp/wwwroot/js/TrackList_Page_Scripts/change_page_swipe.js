import {
  tracksOnPage,
  currentPage,
  getTracksLength,
} from "./fav_tracks_pagination.js";
import { getViewportWidth } from "../utils/window_utils.js";

let upperRowTopCss = 0;
let bottomRowTopCss = 0;
let cardWidth = 0;
let topCssValuesAndCardWidthSet = false;

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
    .addEventListener("touchstart", () => {
      if (!topCssValuesAndCardWidthSet) {
        topCssValuesAndCardWidthSet = true;
        setTopCssAndCardWidth();
      }
      handleSwipeStart();
    });

  document
    .querySelector("#track-list-container")
    .addEventListener("touchmove", (e) => {
      handleSwipeMove(e);
    });

  document
    .querySelector("#track-list-container")
    .addEventListener("touchend", () => {});
};

const handleSwipeMove = (e) => {};

const handleSwipeStart = () => {
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

  $(".image-card-wrapper").css("position", "absolute");
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
      cardsLength - (getTracksLength() - (currentPage) * tracksOnPage),
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
