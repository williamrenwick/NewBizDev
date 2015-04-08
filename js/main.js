$(window).load(function() {
	var windowW = $(window).width();

	var nav = function() {
		var $menubtn = $('#menu-static-wrap'),
			$body = $('body'),
			$li = $('.client-list-item'),
			liDelay = 70,
			clicked = false;

		$menubtn.on('click', function() {
			var list = $('#client-list');
				
			if(!clicked) {
				list.fadeIn(200);

				$(this).addClass('active');
				createBG();
				listItemIn();
				imageSlider.destroyEvents();

				clicked = true;
			} else {

				list.delay(400).fadeOut(200);

				$(this).removeClass('active');
				destroyBG();
				listItemOut();
				imageSlider.enableEvents();

				clicked = false;
			}
		})	

		$li.on('click', function() {
			var url = $(this).data('url') + '.html';
			//animate out

			//ajax call
			$.ajax({
			  url: url,
			  isLocal: true,
			  context: document.body
			}).done(function() {
			  //animate
			  console.log('done')
			});

		});

		function listItemIn() {

			$li.each(function(index) {
				var $this = $(this),
					moveIn = function() {
						$this.addClass('animIn')
					};

				setTimeout( moveIn, index * liDelay )
			})
		}
		function listItemOut() {

			$li.each(function(index) {
				var $this = $(this),
					moveOut = function() {
						$this.removeClass('animIn');
					};
				setTimeout( moveOut, index * liDelay )
			})
		}
		function createBG() {
			var cover = '<div id="menu-bg"></div>';

			$body.prepend(cover);

			var bg = $('#menu-bg');

			bg.fadeIn(200);
		}
		function destroyBG() {
			var bg = $('#menu-bg'),
				menuAnimTime = $('.client-list-item').length * 70;

			function fade() {
				bg.fadeOut(200, function() {
					$(this).remove();
				});
			}

			setTimeout(fade, menuAnimTime);
		}
	}();
	var imageSlider = function() {
		var $item = $('#image-inner-wrap .project-item'),
			$innerWrap = $('#image-inner-wrap'),
			$imageWrap = $('#image-wrap'),
			$rightArrow = $('#right-arrow'),
			$leftArrow = $('#left-arrow'),
			$dots,
			wrapW = $('#image-wrap').width(),
			totalItemNum = $('.project-item').length;



		function applyWidth() {

			$item.css({
				width: wrapW
			});
			$innerWrap.css({
				width: totalItemNum * 100 + "%"
			});
		}
		
		function itemAppear() {
	        $(".project-item").appear() 

	        $(document.body).on("appear", ".project-item", function() {
	            $(this).addClass("appeared")
	        })
	       	$.force_appear()
		}
		function createDots() {
			var dot = '<li class="dot"></li>',
				ul = $('#project-nav ul');

			for (i=0; i < totalItemNum; i++) {
				ul.append(dot);
			}

			$dots = $('.dot');
			$dots.first().addClass('active');
		}

		function slideLeft(dotIndex) {
			var $current = $('.project-item.active'),
				next = $current.next();

			if (next.length != 0) {

				if (typeof dotIndex !== "undefined") {
					$innerWrap.transition({
						x: -(dotIndex * wrapW)
					});
					$item.eq(dotIndex).addClass('active');
				} else {
					$innerWrap.transition({
						x: "-=" + wrapW
					});

					next.addClass('active');
				}

				$current.removeClass('active');
				updateDots();
			}
		}
		function slideRight(dotIndex) {
			var $current = $('.project-item.active'),
				prev = $current.prev();

			if (prev.length !== 0) {

				if (typeof dotIndex !== "undefined") {
					$innerWrap.transition({
						x: -(dotIndex * wrapW)
					});
					$item.eq(dotIndex).addClass('active');
				} else {
					$innerWrap.transition({
						x: "+=" + wrapW
					});
					prev.addClass('active');
				}
				
				$current.removeClass('active');
				updateDots();
			}
		}
		function updateDots() {
			var currentProjIdx = $('.project-item.active').index(),
				currentDot = $('.dot.active').removeClass('active');

			$dots.eq(currentProjIdx).addClass('active');

		}
		function slideEvents() {

			$imageWrap.swipe({
				swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
					if (direction == 'right') {
						slideRight();
					} else if (direction == 'left') {
						slideLeft();
					}
				}
			});

			$dots.on('click', function() {
				var self = $(this),
					$current = $('.dot.active'),
					prevIndex = $current.index(),
					newIndex = self.index();
						

				if (prevIndex < newIndex) {
					slideLeft(newIndex);
				} else if (prevIndex > newIndex) {
					slideRight(newIndex);
				}

			});

		}
		function destroyEvents() {
			$dots.off();
			$imageWrap.swipe('destroy');
		}
		function slideInit() {
			createDots();
			itemAppear();
			applyWidth();
			slideEvents();
		}
		slideInit();

		return {
			enableEvents: slideEvents,
			destroyEvents: destroyEvents
		}
	}();



})
