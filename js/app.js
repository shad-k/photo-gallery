$(function() {
	$('#section2').on('scrollSpy:enter', function() {
		$(".navElement").addClass("animate");
	});

	$('#section2').on('scrollSpy:exit', function() {
		$(".navElement").removeClass("animate");
	});

	$('#section2').scrollSpy();
});