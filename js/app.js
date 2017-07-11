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
			this.setCustomScrollSpy();
			this.setClickOnNav();
		},
		setCustomScrollSpy: function() {
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
		},
		setClickOnNav: function() {
			$(".home").click(function() {
				$("html, body").animate({scrollTop: 0}, 500);
				// $(window).scrollTop();
			});

			$(".gallery").click(function() {
				var gallery = $("#section2").offset().top;
				$("html, body").animate({scrollTop: gallery}, 500);
				// $(window).scrollTop();
			});

			$(".contact").click(function() {
				var contact = $("#section3").offset().top;
				$("html, body").animate({scrollTop: contact}, 500);
				// $(window).scrollTop();
			});
		}
	};

	App.init();
});