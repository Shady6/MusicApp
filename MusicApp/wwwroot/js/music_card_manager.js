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

    initializeTrackBufferEvent();
    createInitialMusicCard();
    disposeMainLoadingScreen();
    loadTracksToBuffer();
});

const initializeTrackBufferEvent = () => {
    trackBufferEvent = new Event("trackLoaded");
    window.addEventListener("trackLoaded", () => {
        if (waitingForNextTrack) {
            waitingForNextTrack = false;
            createNextMusicCard();
        }
    });
}

const createNextMusicCard = () => {
    if (!((displayedTrackIndex == maxTracksCount - 1 && !leftHalfOfTracksLoaded) ||
        (displayedTrackIndex == maxTracksCount / 2 - 1 && !rightHalfOfTracksLoaded) ||
        (!leftHalfOfTracksLoaded && !rightHalfOfTracksLoaded))) {

        if (displayedTrackIndex == maxTracksCount - 1)
            displayedTrackIndex = -1;
        displayedTrackIndex++;
        createMusicCard(tracks[displayedTrackIndex]);
        loadTracksToBuffer();
    }
    else {
        if (!waitingForNextTrack)
            setLoadingOnLikeControl();

        waitingForNextTrack = true;
    }
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

    if (firstBuffering) {
        let loadedTracks = await getTracks(maxTracksCount - 1);
        tracks.push(...loadedTracks);
        leftHalfOfTracksLoaded = true;
        rightHalfOfTracksLoaded = true;
        firstBuffering = false;
    }
    else if (displayedTrackIndex == maxTracksCount / 2) {
        let loadedTracks = await getTracks(maxTracksCount / 2);
        for (let i = 0; i < loadedTracks.length; i++)
            tracks[i] = loadedTracks[i];
        leftHalfOfTracksLoaded = true;
        rightHalfOfTracksLoaded = false;
    }
    else if (displayedTrackIndex == maxTracksCount - 1) {
        let loadedTracks = await getTracks(maxTracksCount / 2);
        for (let i = 0; i < loadedTracks.length; i++)
            tracks[i + maxTracksCount / 2] = loadedTracks[i];
        leftHalfOfTracksLoaded = false;
        rightHalfOfTracksLoaded = true;
    }

    window.dispatchEvent(trackBufferEvent);
}


export default createNextMusicCard;



