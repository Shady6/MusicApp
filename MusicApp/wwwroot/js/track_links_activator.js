import { getViewportWidth } from "./utils/window_utils.js";

$(document).ready(() => {
  if (getViewportWidth() < 768) {
    setTouchListenersToActivateTrackLinks();
  }
});

export const setTouchListenersToActivateTrackLinks = () => {
  document.addEventListener("click", (e) => {
    disableAllTrackLinksAndActions();
    let trackCardWrapper = null;

    e.path.forEach((element) => {
      if ($(element).hasClass("hovereffect")) trackCardWrapper = $(element);
    });

    if (trackCardWrapper) {
      enableTrackLinksAndActionsOfElement(trackCardWrapper);
    }
  });
};

const enableTrackLinksAndActionsOfElement = (element) => {
  const trackLinks = element.find(".track-links");
  const trackActions = element.find(".track-actions");

  if (trackLinks) trackLinks.removeClass("disabled-link-mobile");
  if (trackActions) trackActions.removeClass("disabled-link-mobile");
};

const disableAllTrackLinksAndActions = () => {
  const trackLinks = $(".track-links");
  const trackActions = $(".track-actions");

  if (trackLinks) trackLinks.addClass("disabled-link-mobile");
  if (trackActions) trackActions.addClass("disabled-link-mobile");
};
