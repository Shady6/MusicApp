const loadTracksInfo = (count) => {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: `https://localhost:44325/api/deezer/${count}`
		}).then((data) => {
			if (data.length >= 1) {
				resolve(data);
			}
		}).catch(err => { console.log(err) });
	});
}


const setImageDownloadingListeners = (downloadingImage, track) => {
	downloadingImage.onabort = function () {
		track.album.imageLoadedMessage = "Couldn't load the image.";
	}
	downloadingImage.onerror = function () {
		track.album.imageLoadedMessage = "Couldn't load the image.";
	}
}

const loadBackgroundImage = (track) => {
	let downloadingImage = new Image();

	track.album.image = downloadingImage;
	track.album.imageLoadedMessage = "OK";

	setImageDownloadingListeners(downloadingImage, track);
	downloadingImage.src = track.album.cover_Big;
}

const setAudioDownloadingListeners = (downloadingAudio, track) => {
	downloadingAudio.onabort = function () {
		track.audioLoadedMessage = "Couldn't load the audio.";
	}
	downloadingAudio.onerror = function () {
		track.audioLoadedMessage = "Couldn't load the audio.";
	}
}

const loadAudio = (track) => {
	let downloadingAudio = new Audio();

	track.audio = downloadingAudio;
	track.audioLoadedMessage = "OK";

	setAudioDownloadingListeners(downloadingAudio, track);
	downloadingAudio.src = track.preview;
	downloadingAudio.controls = true;
}

async function getTracks(count) {
	let tracks = await loadTracksInfo(count);

	tracks.forEach((track, i) => {
		loadBackgroundImage(track);
		loadAudio(track);
	});

	return tracks;
}

export default getTracks;












