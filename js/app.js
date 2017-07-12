$(function() {
	// Gets data from the Unsplash API and serves it to the App
	var Data = {
		init: function() {
			// Return the promise of fetching photos
			return this.getUnsplashData()
				.then(function(response) {
					response.forEach(function(res) {
						/* Throw an error if there is an error while fetching
						 * photos
						 */
						if(!res.ok) {
							throw Error(response.responseText);
						}
					});

					// And return response to next then
					return response;
				}).then(function(response) {
					var arr = [];

					// Resolve responses in the array to corresponding json
					response.forEach(function(photo) {
						arr.push(photo.json());
					});

					// Return the array of json
					return arr;
				}).catch(function(error) {
					alert("Cannot connect to Unsplash: " + error);
				});

		},
		getUnsplashData: function() {
			// Unsplash API credentials
			var applicationId = "5770f078e5fdb0501d809bb170d4e1f6fb4ae42e165463ece323f9ef9563c5bb";
			var secret = "3db9df5fd874cf75db46e61025edfc0aacd7f45fb9b7c21bb567676d8b15fbb2";

			// Fetch pages of photos
			var arrayOfPromises = [];
			for(let i = 1; i <= 1; i++) {
				var url = 'https://api.unsplash.com/photos/?page=' + i +
					"&client_id=" + applicationId + "&client_secret=" + secret;
				arrayOfPromises.push(fetch(url, {method: "GET"}));
			}

			return Promise.all(arrayOfPromises);
		}
	};

	// Controls the app
	var App = {
		init: function() {
			// Setup the View
			View.init();

			// Fetch data
			Data.init().then(function(photos) {
				var unsplashData = [];
				photos.forEach(function(photo) {
					photo.then(function(data) {
						// Populate the Gallery
						View.populateGallery(data);
					});
				});

			});

		}
	}

	// This module takes care of the view
	var View = {
		photos: [],
		init: function(photos) {
			/* Activates custom scroll spy, the nav bar changes color
			 * on scroll
			 */
			this.setCustomScrollSpy();

			// Animates scroll on click on nav bar elements
			this.setClickOnNav();

			// Enlarge to gallery on click on thumbnail
			this.openGallery();

			// Close gallery when close is clicked
			$(".closeGallery").click(function() {
				$(".gallerySection").animate({
					"right": "100%"
				});
			});


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
		},
		populateGallery: function(photo) {
			// Make variable i store its state
			if( typeof i == 'undefined' ) {
        		i = 0;
    		}

			var html = '<div class="photos" id=' + i++ + '>' +
					'<img src="' + photo[0].urls.thumb
					+ '" alt="" class="thumb">' +
				'</div>';
			// Add a new photos div
			$(".photosDiv").append(html);

			View.preloadImages(photo);
		},
		openGallery: function() {
			// Click handler for opening gallery section
			$(".photosDiv").on("click", ".photos", function() {
				var id = $(this).attr("id");

				var img = View.photos[id][0];

				$(img).css({
					height: "100%",
					width: "100%"
				});

				$(".gallerySection").append(View.photos[id]);

				$(".gallerySection").animate({
					right: "0%",
					top: $("#section2").offset().top
				}, 500);

				var i = 0;
				var lastScroll = new Date().getTime();
				$(".unsplashImage").on("DOMMouseScroll wheel touchmove", function(event) {
					event.preventDefault();
					var currentScroll = new Date().getTime();
					if(currentScroll - lastScroll > 1000) {
						if(event.originalEvent.deltaY >= 1) {
							console.log(i);
							if(i < View.photos[id].length) {
								// $(img).attr("src", View.photos[id][++i].currentSrc);
								$("html, body").animate({
									scrollTop: $("#img" + ++i).offset().top
								}, 500);
							}
						} else if(event.originalEvent.deltaY <= -1) {
							if(i >= 0) {
								$("html, body").animate({
									scrollTop: $("#img" + --i).offset().top
								}, 500);
							}
								// $(img).attr("src", View.photos[id][--i].currentSrc);
						}
						lastScroll = currentScroll;
					}
					else {
						console.log("nope");
					}
				});
			});
		},
		preloadImages: function(photos) {
			var i = i || 0;
			View.photos.push([]);
			var j = 0;
			photos.forEach(function(photo) {
				// console.log(photo);
				var img = new Image();
				img.src = photo.urls.regular;
				$(img).attr("id", "img" + j++);
				$(img).attr("class", "unsplashImage");
				View.photos[i].push(img);
			});
			i++;
		}
	};

	// Initiate the app
	App.init();
});