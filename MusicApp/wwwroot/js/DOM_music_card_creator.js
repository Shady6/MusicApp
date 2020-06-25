﻿import { createTrackLinks } from "./DOM_fav_tracks_creator.js";

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
};

const showCard = () => {
  $(".music-card-container").css("display", "block");
};

const setTrackLinks = () => {
  $(".track-links").html(
    createTrackLinks(`${track.title} ${track.artist.name}`, track.link)
  );
};

const setTrackReleaseDate = () => {
  $(".trackReleaseDate").text(
    track.release_date == "0000-00-00" ? "Unknown" : track.release_date
  );
};

const setTrackDeezerRank = () => {
  let trackRank = "Unknown";
  if (track.rank && track.rank > 10) trackRank = track.rank;
  $(".trackDeezerRank").text(trackRank);
};

const setTrackAuthor = () => {
  $(".trackAuthor").text(track.artist.name);
};

const setTrackTitle = () => {
  $(".trackTitle").text(track.title);
};

const setTrackAlbumTitle = () => {
  $(".albumTitle").text(track.album.title);
};

const setTrackAlbumCoverImage = () => {
  if ($(".albumCoverContainer img").length === 1)
    $(".albumCoverContainer img").remove();

  $(".albumCoverContainer").prepend(track.album.image);
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

const setTrackAbout = () => {
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
}

const createMusicCard = (trackArg) => {
  if ($("audio")) prevVolume = $("audio").prop("volume");
  track = trackArg;

  hideLoadingSpinner();

  showCard();

  setTrackAbout();
};

export default createMusicCard;
