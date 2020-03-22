let track = null;

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

const setTrackAbout = () => {
	setTrackAuthor();
	setTrackTitle();
	setTrackAlbumTitle();
}

const createMusicCard = (trackArg) =>
{
	track = trackArg;

	showCard();

	setTrackAbout();
}

export default createMusicCard;



