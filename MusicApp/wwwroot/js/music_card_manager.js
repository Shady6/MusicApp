import getTracks from "./tracks_loader.js";
import createMusicCard from "./DOM_music_card_creator.js";
import destroyLoadingScreen from "./loading_screen_handler.js";

let maxTracksCount = 8;
let tracks = [];
let displayedTrackIndex = -1;
let firstBuffering = true;

$(document).ready(() => {
    createInitialMusicCard();
});

// TODO in DOM_music_card_creator add functions to insert image and audio elements into HTML

const createNextMusicCard = () =>
{
    displayedTrackIndex++;
    createMusicCard(tracks[displayedTrackIndex]);
    loadTracksToBuffer();
}

async function createInitialMusicCard(){
    displayedTrackIndex++;
    await loadInitialTrack();    
    createMusicCard(tracks[displayedTrackIndex]);
    destroyLoadingScreen();
    await loadTracksToBuffer();
}

async function loadInitialTrack() {
    let loadedTrack = (await getTracks(1))[0];
    tracks.push(loadedTrack);
}

async function loadTracksToBuffer() {
    if (firstBuffering){
        let loadedTracks = await getTracks(maxTracksCount - 1);
        tracks.push(...loadedTracks);1
        console.log(loadedTracks);
        firstBuffering = false;
    }
    else if (displayedTrackIndex == maxTracksCount / 2){
        let loadedTracks = await getTracks(maxTracksCount / 2);
        for (let i = 0; i < loadedTracks.length; i++) 
            tracks[i] = loadedTracks[i];        
    }
    else if (displayedTrackIndex == maxTracksCount - 1){
        let loadedTracks = await getTracks(maxTracksCount / 2);
        for (let i = 0; i < loadedTracks.length; i++) 
            tracks[i + maxTracksCount / 2] = loadedTracks[i];        
    }
}


