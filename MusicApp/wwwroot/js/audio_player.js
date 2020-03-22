

$(window).on("onmusiccardscreated",
	(event) =>
	{
		$(".audioControls > audio").attr("src", $(".trackAudioSource").val());
	});


