$(window).load(function() {
	var windowW = $(window).width();

	var nav = function() {
		var $menubtn = $('#menu-static-wrap'),
			$body = $('body'),
			liDelay = 70,
			clicked = false;

		$menubtn.on('click', function() {
			var list = $('#client-list');
				
			if(!clicked) {
				list.fadeIn(200);

				$(this).addClass('active');
				createBG();
				listItemIn();

				clicked = true;
			} else {
				console.log('close')
				list.delay(400).fadeOut(200);

				$(this).removeClass('active');
				destroyBG();
				listItemOut();

				clicked = false;
			}
		})	

		function listItemIn() {
			var li = $('.client-list-item');

			li.each(function(index) {
				var $this = $(this),
					moveIn = function() {
						$this.addClass('animIn')
					};

				setTimeout( moveIn, index * liDelay )
			})
		}
		function listItemOut() {
			var li = $('.client-list-item');

			li.each(function(index) {
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

			console.log(menuAnimTime)

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
			$innerWrap = $('#image-inner-wrap');

		function getWidth() {
			var	width = 0;

			$item.each(function() {
				width += $(this).outerWidth(true);
				console.log($(this).width())
			});
		
			console.log(width);

			return width;
		}
		function applyWidth() {
			var width = getWidth();

			console.log(width, typeof width);

			$innerWrap.css({
				'width': width
			});
		}
		function itemAppear() {
			$item.appear();

	        $(".project-item").appear() 

	        $(document.body).on("appear", ".project-item", function() {
	            $(this).addClass("appeared")
	        })
	       	$.force_appear()
		}
		function slideLeft() {
			var lastImgW = 

			$innerWrap.animate('left', lastImgW);
		}
		function slideInit() {
			itemAppear();
			applyWidth();
			
		}
		slideInit();
	}();
})
