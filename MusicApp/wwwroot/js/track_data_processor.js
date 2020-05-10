export const convertToTrackDto = (track) => {
    let trackDto = {...track};

    delete trackDto.audio;
    delete trackDto.album.image;
    delete trackDto.album.imageLoadedMessage;
    delete trackDto.audioLoadedMessage;

    return trackDto;
}