import {
  createTrackLinksOverlay,
  createTrackAboutOverlay,
} from "../TrackList_Page_Scripts/DOM_fav_tracks_creator.js";
import { firstImage } from "./tracks_loader.js";
import { getViewportWidth } from "../utils/window_utils.js";

let track = null;
let firstTrack = true;
let prevVolume = 1;

export const emptyMusicCard = () => {
  $(".trackAuthor").text("");
  $(".trackTitle").text("");
  $(".albumTitle").text("");
  $(".albumCoverContainer img").remove();
  $(".audioControls").html("");
  $(".trackReleaseDate").html("");
  $(".trackDeezerRank").html("");
  $(".hovereffect").addClass("d-none");
  $(".track-info").remove();
  $(".track-links").remove();
};

const showCard = () => {
  $(".music-card-container").css("display", "block");
  $(".hovereffect").removeClass("d-none");
};

const setTrackLinks = () => {
  $(".track-links-pc").html(
    createTrackLinksOverlay(`${track.Title} ${track.Artist.Name}`, track.Link)
  );
};

const setTrackReleaseDate = () => {
  $(".trackReleaseDate").text(
    track.release_date == "0000-00-00" ? "Unknown" : track.Release_date
  );
};

const setTrackDeezerRank = () => {
  let trackRank = "Unknown";
  if (track.Rank && track.Rank > 10) trackRank = track.Rank;
  $(".trackDeezerRank").text(trackRank);
};

const setTrackAuthor = () => {
  $(".trackAuthor").text(track.Artist.Name);
};

const setTrackTitle = () => {
  $(".trackTitle").text(track.Title);
};

const setTrackAlbumTitle = () => {
  $(".albumTitle").text(track.Album.Title);
};

const setTrackAlbumCoverImage = () => {
  if ($(".albumCoverContainer img").length === 1)
    $(".albumCoverContainer img").remove();

  $(".hovereffect").prepend(track.Album.image);
};

const setTrackAudio = () => {
  $("audio").remove();
  if (track.audioLoadedMessage.toLowerCase() !== "ok") {
    $(".audioControls").html(
      "<p>Couldn't load preview audio for this track. Please try next one.</p>"
    );
  } else {
    $(".audioControls").html(track.audio);
    $("audio").prop("volume", prevVolume);

    if (firstTrack) firstTrack = false;
    else if (document.querySelector("audio"))
      document.querySelector("audio").play();
  }
};

const setTrackAboutOverlayMobile = () => {
  $(".overlay").append(createTrackAboutOverlay(track));
};

const setTrackLinksOverlayMobile = () => {
  $(".overlay").append(
    createTrackLinksOverlay(`${track.Title} ${track.Artist.Name}`, track.Link)
  );

  if ($(".hovereffect").is(":hover"))
    $(".track-links").removeClass("disabled-link-mobile");
};

const setTrackAbout = () => {
  setTrackAboutOverlayMobile();
  setTrackLinksOverlayMobile();

  setTrackAudio();
  setTrackAlbumCoverImage();
  setTrackAuthor();
  setTrackTitle();
  setTrackAlbumTitle();
  setTrackReleaseDate();
  setTrackDeezerRank();
  setTrackLinks();
};

const hideLoadingSpinner = () => {
  $(".albumCoverContainer > .spinner").removeClass("d-flex");
  $(".albumCoverContainer > .spinner").addClass("d-none");
};

const createMusicCard = (trackArg) => {
  if ($("audio")) prevVolume = $("audio").prop("volume");
  track = trackArg;

  setFirstAlbumCoverImageLoadedListener();

  emptyMusicCard();

  hideLoadingSpinner();

  if (!firstImage) showCard();

  setTrackAbout();
};

const setFirstAlbumCoverImageLoadedListener = () => {
  document.addEventListener("onFirstAlbumCoverImageLoaded", () => {
    showCard();
  });
};

export default createMusicCard;
