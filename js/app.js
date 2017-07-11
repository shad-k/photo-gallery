$(function() {
	// Gets data from the Unsplash API and serves it to the App
	var Data = {
		photos:[],
		init: function() {
			this.getUnsplashData();
			console.log(this.photos);
		},
		getUnsplashData: function() {
			var applicationId = "5770f078e5fdb0501d809bb170d4e1f6fb4ae42e165463ece323f9ef9563c5bb";
			var secret = "3db9df5fd874cf75db46e61025edfc0aacd7f45fb9b7c21bb567676d8b15fbb2";
			for(let i = 1; i <= 4; i++) {
				var url = 'https://api.unsplash.com/photos/?page=' + i +
					"&client_id=" + applicationId + "&client_secret=" + secret;
				console.log(url);
				$.ajax({
					url: url,
					method: 'GET',
					success: function(response) {
						Data.photos.push(response);
					},
					error: function(error) {
						alert("Cannot connect to Unsplash: ", error);
					}
				});
			}
		}
	};

	// Controls the app
	var App = {
		init: function() {
			Data.init();
			View.init();
		}
	}

	// This module takes care of the view
	var View = {
		init: function() {
			/* Activates custom scroll spy, the nav bar changes color
			 * on scroll
			 */
			this.setCustomScrollSpy();

			// Animates scroll on click on nav bar elements
			this.setClickOnNav();
		},
		setCustomScrollSpy: function() {
			var sectionTop = $("#section2").offset().top;

			// Subtract the height of the nav since the nav is fixed
			sectionTop -= $(".nav").height();

			var sectionBottom = $("#section2").height() + sectionTop;

			$(window).scroll(function() {
				// The current scroll offset from top
				var scroll = $(window).scrollTop();

				// If the user has scrolled into the 'home' section
				if(scroll < sectionTop ) {
					if ($(".navElement").hasClass("animate")) {
						$(".navElement").removeClass("animate").addClass("unanimate");
					}
				}
				// If the user has scrolled into the 'contact' section
				else if(scroll > sectionBottom) {
					if ($(".navElement").hasClass("animate")) {
						$(".navElement").removeClass("animate").addClass("unanimate");
					}
				}
				// If the user has scrolled into the 'gallery' section
				else if(scroll > sectionTop) {
					if ($(".navElement").hasClass("unanimate")) {
						$(".navElement").removeClass("unanimate");
					}
					$(".navElement").addClass("animate");
				}
			});
		},
		// Animates scroll to a section on clicking the nav element
		setClickOnNav: function() {
			$(".home").click(function() {
				$("html, body").animate({scrollTop: 0}, 500);
			});

			$(".gallery").click(function() {
				var gallery = $("#section2").offset().top;
				$("html, body").animate({scrollTop: gallery}, 500);
			});

			$(".contact").click(function() {
				var contact = $("#section3").offset().top;
				$("html, body").animate({scrollTop: contact}, 500);
			});
		}
	};

	// Initiate the app
	App.init();
});