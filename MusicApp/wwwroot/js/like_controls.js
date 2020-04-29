import createNextMusicCard from './music_card_manager.js';
import {emptyMusicCard} from './DOM_music_card_creator.js';


$(document).ready(() =>
{
	$(".fa-thumbs-up").on("click",
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
