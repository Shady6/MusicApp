export const convertToTrackDto = (track) => {
    let trackDto = {...track};

    delete trackDto.audio;
    delete trackDto.Album.Image;
    delete trackDto.Album.imageLoadedMessage;
    delete trackDto.audioLoadedMessage;

    return trackDto;
}