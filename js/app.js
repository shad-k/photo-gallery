$(function() {
	$('#section2').on('scrollSpy:enter', function() {
		$(".nav").addClass("animate");
		$(".nav").css("background-color", "#FFF");
	});

	$('#section2').on('scrollSpy:exit', function() {
		$(".nav").removeClass("animate");
	});

	$('#section2').scrollSpy();
});