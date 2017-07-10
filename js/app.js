$(function() {
	var Data = {
		init: function() {

		}
	};

	var App = {
		init: function() {
			Data.init();
			View.init();
		}
	}

	var View = {
		init: function() {
			var sectionTop = $("#section2").offset().top;
			sectionTop -= $(".nav").height();
			var sectionBottom = $("#section2").height() + sectionTop;

			$(window).scroll(function() {
				var scroll = $(window).scrollTop();
				if(scroll < sectionTop ) {
					if ($(".navElement").hasClass("animate")) {
						$(".navElement").removeClass("animate").addClass("unanimate");
						$(".navText").css("color", "#000");
					}
				} else if(scroll > sectionBottom) {
					if ($(".navElement").hasClass("animate")) {
						$(".navElement").removeClass("animate").addClass("unanimate");
						$(".navText").css("color", "#000");
					}
				} else if(scroll > sectionTop) {
					if ($(".navElement").hasClass("unanimate")) {
						$(".navElement").removeClass("unanimate");
					}
					$(".navElement").addClass("animate");
					$(".navText").css("color", "#FFF");
				}
			});
		}
	}

	App.init();
});