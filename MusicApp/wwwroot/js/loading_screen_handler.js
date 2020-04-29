export const disposeMainLoadingScreen = () => {
	$("#loadingScreenTitle").fadeOut(500);
	$(".lds-ellipsis").fadeOut(500);
	$("#loadingScreen").slideUp({
		duration: 700,
		easing: "swing"
	});
}


