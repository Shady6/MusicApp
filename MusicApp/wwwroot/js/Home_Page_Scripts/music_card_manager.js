import getTracks from "./tracks_loader.js";
import createMusicCard from "./DOM_music_card_creator.js";
import { disposeMainLoadingScreen } from "./loading_screen_handler.js";
import { setLoadingOnLikeControl } from "./like_controls.js";

let maxTracksCount = 8;
let tracks = [];
let displayedTrackIndex = -1;
let firstBuffering = true;
let leftHalfOfTracksLoaded = false;
let rightHalfOfTracksLoaded = false;
let waitingForNextTrack = false;
let trackBufferEvent;

$(document).ready(() => {
  if (window.location.href.slice(-5) !== "Track") {
    setOnFirstAlbumCoverImageLoadedListener();
    initializeTrackBufferEvent();
    createInitialMusicCard();
    loadTracksToBuffer();
  }
});

const setOnFirstAlbumCoverImageLoadedListener = () => {
  document.addEventListener("onFirstAlbumCoverImageLoaded", () => {
    disposeMainLoadingScreen();
  });
};

export const getDisplayedTrackJson = () => {
  return tracks[displayedTrackIndex];
};

const initializeTrackBufferEvent = () => {
  trackBufferEvent = new Event("trackLoaded");
  window.addEventListener("trackLoaded", () => {
    if (waitingForNextTrack) {
      waitingForNextTrack = false;
      createNextMusicCard();
    }
  });
};

const createNextMusicCard = () => {
  if (canDisplayNextCard()) {
    if (displayedTrackIndex == maxTracksCount - 1) displayedTrackIndex = -1;

    displayedTrackIndex++;
    createMusicCard(tracks[displayedTrackIndex]);
    loadTracksToBuffer();
  } else {
    if (!waitingForNextTrack) setLoadingOnLikeControl();

    waitingForNextTrack = true;
  }
};

function canDisplayNextCard() {
  return !(
    (displayedTrackIndex == maxTracksCount - 1 && !leftHalfOfTracksLoaded) ||
    (displayedTrackIndex == maxTracksCount / 2 - 1 &&
      !rightHalfOfTracksLoaded) ||
    (!leftHalfOfTracksLoaded && !rightHalfOfTracksLoaded)
  );
}

async function createInitialMusicCard() {
  displayedTrackIndex++;
  await loadInitialTrack();
  createMusicCard(tracks[displayedTrackIndex]);
}

async function loadInitialTrack() {
  let loadedTrack = (await getTracks(1))[0];
  tracks.push(loadedTrack);
}

async function loadTracksToBuffer() {
  if (firstBuffering) await loadFullBufffer();
  else if (displayedTrackIndex == maxTracksCount / 2)
    await loadLeftHalfOfBuffer();
  else if (displayedTrackIndex == 0) await loadRightHalfOfBuffer();
  window.dispatchEvent(trackBufferEvent);
}

async function loadRightHalfOfBuffer() {
  let loadedTracks = await getTracks(maxTracksCount / 2);
  for (let i = 0; i < loadedTracks.length; i++)
    tracks[i + maxTracksCount / 2] = loadedTracks[i];
  leftHalfOfTracksLoaded = false;
  rightHalfOfTracksLoaded = true;
}

async function loadLeftHalfOfBuffer() {
  let loadedTracks = await getTracks(maxTracksCount / 2);
  for (let i = 0; i < loadedTracks.length; i++) tracks[i] = loadedTracks[i];
  leftHalfOfTracksLoaded = true;
  rightHalfOfTracksLoaded = false;
}

async function loadFullBufffer() {
  let loadedTracks = await getTracks(maxTracksCount - 1);
  tracks.push(...loadedTracks);
  leftHalfOfTracksLoaded = true;
  rightHalfOfTracksLoaded = true;
  firstBuffering = false;
}

export default createNextMusicCard;
