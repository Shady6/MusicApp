let track = null;

const loadTrack = () => {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: "https://localhost:44325/api/music/1"
		}).then((data) => {
			if (data.length == 1)
				resolve(data[0]);
		}).catch(err => { console.log(err) });
	});
}

const showCard = () => {
	$(".music-card-container").css("display", "block");
}


const hideScrollbars = () => {
	$("body").css("overflow", "hidden");
}

const setImageDownloadingListeners = (downloadingImage) =>
{
	downloadingImage.onload = function () {
		$(albumCoverBackground).attr("src", this.src);
	}
	downloadingImage.onabort = function () {
		console.log("abort");
	}
	downloadingImage.onerror = function () {
		console.log("eror");
	}
}

const loadBackgroundImageForCard = () => {
	let albumCoverBackground = $(".albumCoverBackground");
	let downloadingImage = null;

	downloadingImage = new Image();
	setImageDownloadingListeners();
	downloadingImage.src = track.album.cover_Big;
}


const destroyLoadingScreen = () => {
	$("#loadingScreenTitle").fadeOut(500);
	$(".lds-ellipsis").fadeOut(500);
	$("#loadingScreen").slideUp({
		duration: 700,
		easing: "swing"
	});
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

const setTrackUrl = () => {
	$(".trackAudioSource").val(track.preview);
}

const prepareThePage = () => {
	hideScrollbars();
}

async function createMusicCard(){

	track = await loadTrack();

	loadBackgroundImageForCard();

	showCard();

	setTrackAbout();

	setTrackUrl();

	onMusicCardCreated("OK");
}

const onMusicCardCreated = (state) => {
	let event = $.Event("onmusiccardscreated");
	event.state = state;
	$(window).trigger(event);
}

 function Wrapper() {
	prepareThePage();

	createMusicCard();

	destroyLoadingScreen();
}


$(document).ready(() => {
	Wrapper();
});
