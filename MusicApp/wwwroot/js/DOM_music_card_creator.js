let track = null;
let firstTrack = true;

export const emptyMusicCard = () => {
	$(".trackAuthor").text("");
	$(".trackTitle").text("");
	$(".albumTitle").text("");
	$(".albumCoverContainer").html("");
	$(".audioControls").html("");
}

const showCard = () => {
	$(".music-card-container").css("display", "block");
}

const setTrackAuthor = () => {
	$(".trackAuthor").text(track.artist.name);
}

const setTrackTitle = () => {
	$(".trackTitle").text(track.title);
}

const setTrackAlbumTitle = () => {
	$(".albumTitle").text(track.album.title);
}

const setTrackAlbumCoverImage = () => {
	$(".albumCoverContainer").html(track.album.image);
}

const setTrackAudio = () => {
	if (track.audioLoadedMessage.toLowerCase() !== "ok") {
		$(".audioControls").html("<p>Couldn't load preview audio for this track. Please try next one.</p>");
	}
	else {

		if (firstTrack)
			firstTrack = false;
		else
			track.audio.play()

		$(".audioControls").html(track.audio);
	}
}

const setTrackAbout = () => {
	setTrackAudio();
	setTrackAlbumCoverImage();
	setTrackAuthor();
	setTrackTitle();
	setTrackAlbumTitle();
}

const createMusicCard = (trackArg) => {
	track = trackArg;

	showCard();

	setTrackAbout();
}

export default createMusicCard;



