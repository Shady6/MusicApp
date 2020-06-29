import { getDisplayedTrackJson } from "../Home_Page_Scripts/music_card_manager.js";
import { convertToTrackDto } from "../track_data_processor.js";
import { deleteTrackFromMemory } from "./fav_tracks_pagination.js";

$(document).ready(() => {
  if (window.location.href.slice(-5) === "Track") {
    let audio = document.querySelector("audio");
    setEventListeners(audio);
  }
});

const setEventListeners = (audio) => {
  $("#track-list-container").on("click", (e) => {
    setTrackActionsListener(e);
    setAudioControlsOnCardListeners(e, audio);
  });
  setAudioStoperClickListener(audio);
  setAudioStoppedPlayingListener();
};

const setAudioStoperClickListener = (audio) => {
  $(".audio-stop-btn").on("click", () => {
    handleGlobalAudioStopBtn(audio);
  });
};

const setTrackActionsListener = (e) => {
  if ($(e.target).hasClass("fa-trash")) {
    handleTrashButtonClick(e);
  }
};

const setAudioControlsOnCardListeners = (e, audio) => {
  if ($(e.target).parent().hasClass("track-actions")) {
    const playBtn = $(e.target)
      .parent()
      .children()
      .filter((i, trackAction) => $(trackAction).hasClass("fa-play"));
    const pauseBtn = playBtn.next();

    if ($(e.target).hasClass("fa-play")) {
      handlePlayButtonClick(audio, playBtn, pauseBtn);
    }

    if ($(e.target).hasClass("fa-pause")) {
      handlePauseButtonClick(audio, playBtn, pauseBtn);
    }

    if ($(e.target).hasClass("fa-repeat")) {
      handleRepeatButtonClick(audio, playBtn, pauseBtn);
    }
  }
};

const setAudioStoppedPlayingListener = () => {
  document.querySelector("audio").addEventListener("ended", (e) => {
    $(".fa-play").show();
    $(".fa-pause").hide();
    $(".audio-stop-btn").attr("disabled", true);
  });
};

const handleRepeatButtonClick = (audio, playBtn, pauseBtn) => {
  $(".audio-stop-btn").attr("disabled", false);
  showAllPlayBtnsHidePauseBtns();
  audio.currentTime = 0;
  playAudio(audio, playBtn);
  playBtn.hide();
  pauseBtn.show();
};

const handlePauseButtonClick = (audio, playBtn, pauseBtn) => {
  audio.pause();
  $(".audio-stop-btn").attr("disabled", true);
  playBtn.show();
  pauseBtn.hide();
};

const handlePlayButtonClick = (audio, playBtn, pauseBtn) => {
  $(".audio-stop-btn").attr("disabled", false);
  showAllPlayBtnsHidePauseBtns();
  playAudio(audio, playBtn);
  playBtn.hide();
  pauseBtn.show();
};

const handleGlobalAudioStopBtn = (audio) => {
  if (!audio.paused) {
    audio.pause();
    showAllPlayBtnsHidePauseBtns();
    $(".audio-stop-btn").attr("disabled", true);
  }
};

const deleteTrack = (trackName, cardIdToRemove) => {
  console.log(trackName);
  $.ajax({
    type: "DELETE",
    contentType: "application/json",
    url: `https://localhost:44325/api/track`,
    data: JSON.stringify({
      Title: trackName,
    }),
  }).then(() => {
    $("#" + cardIdToRemove).remove();
    deleteTrackFromMemory(trackName);
  });
};

export const loadAllUserTracks = async () => {
  let tracks = await $.ajax({
    type: "GET",
    url: "https://localhost:44325/api/track",
  });

  return tracks;
};

export const addTrackToFavorites = () => {
  let trackDto = convertToTrackDto(getDisplayedTrackJson());
  $.ajax({
    contentType: "application/json",
    url: `https://localhost:44325/api/track`,
    type: "POST",
    data: JSON.stringify(trackDto),
  });
};

const handleTrashButtonClick = (e) => {
  let trackTitle = e.target.getAttribute("track-title");
  let parentWrapperId = e.target.getAttribute("parent-wrapper-id");

  deleteTrack(trackTitle, parentWrapperId);
};

const showAllPlayBtnsHidePauseBtns = () => {
  $("#track-list-container .fa-play").show();
  $("#track-list-container .fa-pause").hide();
};

const playAudio = (audio, playBtn) => {
  if (audio.getAttribute("src") == playBtn.attr("track-src")) audio.play();
  else audio.setAttribute("src", playBtn.attr("track-src"));
};
