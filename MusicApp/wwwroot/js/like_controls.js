import createNextMusicCard, {getDisplayedTrackJson} from './music_card_manager.js';
import {emptyMusicCard} from './DOM_music_card_creator.js';
import {convertToTrackDto} from './track_data_processor.js';


$(document).ready(() =>
{
	$("#thumbsUpBtn").on("click",
		() =>
		{
			// TODO check how to send properly data to api controller
				let trackDto = convertToTrackDto(getDisplayedTrackJson());
				console.log(trackDto);	
				$.ajax({
					contentType: 'application/json',
					url: `https://localhost:44325/api/track`,
					type: "POST",
					data: JSON.stringify(trackDto)	
				});
				createNextMusicCard();
		});

		$("#thumbsDownBtn").on("click",
		() =>
		{
				createNextMusicCard();
		});
});

export const setLoadingOnLikeControl = () => {
	emptyMusicCard();

	$(".albumCoverContainer").html(`
		<div class="d-flex justify-content-center align-items-center" style="height: 100%;">
			<div class="spinner-border" role="status">
				<span class="sr-only">Loading...</span>
			</div>
		</div>
	`);
}
