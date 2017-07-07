$(function() {
	var sectionTop = $("#section2").offset().top;
	sectionTop -= $(".nav").height();
	var sectionBottom = $("#section2").height() + sectionTop;

	$(window).scroll(function() {
		var scroll = $(window).scrollTop();
		if(scroll < sectionTop ) {
			if ($(".navElement").hasClass("animate")) {
				$(".navElement").removeClass("animate").addClass("unanimate");
			}
		} else if(scroll > sectionBottom) {
			if ($(".navElement").hasClass("animate")) {
				$(".navElement").removeClass("animate").addClass("unanimate");
			}
		} else if(scroll > sectionTop) {
			if ($(".navElement").hasClass("unanimate")) {
				$(".navElement").removeClass("unanimate");
			}
			$(".navElement").addClass("animate");
		}
	});
});