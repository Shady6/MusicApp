const loadTracksInfo = (count) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `https://localhost:44325/api/deezer/${count}`,
    })
      .then((data) => {
        if (data.length >= 1) {
          resolve(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

const setImageDownloadingListeners = (downloadingImage, track) => {
  downloadingImage.onabort = function () {
    handleImageNotLoaded(downloadingImage, track);
  };
  downloadingImage.onerror = function () {
    handleImageNotLoaded(downloadingImage, track);
  };
  downloadingImage.onsuccess = function () {
    track.Album.imageLoadedMessage = "OK";

  }
};

const handleImageNotLoaded = (downloadingImage, track) => {
  track.Album.imageLoadedMessage = "Couldn't load the image.";
  loadBackgroundImage(downloadingImage, "./images/music_note_background.png");
}

const loadBackgroundImage = (downloadingImage, src) => {
  downloadingImage.src = src;
};

const tryToLoadBackgroundImage = (track) => {
  let downloadingImage = new Image();
  track.Album.image = downloadingImage;
  setImageDownloadingListeners(downloadingImage, track);

  loadBackgroundImage(downloadingImage, track.Album.Cover_Big);
}

const setAudioDownloadingListeners = (downloadingAudio, track) => {
  downloadingAudio.onabort = function () {
    track.audioLoadedMessage = "Couldn't load the audio.";
  };
  downloadingAudio.onerror = function () {
    track.audioLoadedMessage = "Couldn't load the audio.";
  };
};

const loadAudio = (track) => {
  let downloadingAudio = new Audio();

  track.audio = downloadingAudio;
  track.audioLoadedMessage = "OK";

  setAudioDownloadingListeners(downloadingAudio, track);
  downloadingAudio.src = track.Preview;
  downloadingAudio.controls = true;
};

async function getTracks(count) {
  let tracks = await loadTracksInfo(count);

  tracks.forEach((track, i) => {
    tryToLoadBackgroundImage(track);
    loadAudio(track);
  });

  return tracks;
}

export default getTracks;
