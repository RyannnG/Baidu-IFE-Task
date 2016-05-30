window.onload = function () {
	// body...
	var container = document.getElementById("container");
	var list = document.getElementById("list");
	var disc = document.getElementById("disc-nav").getElementsByTagName("a");
	var prev = document.getElementById("prev");
	var next = document.getElementById("next");
	var index = 1;
	var animating = false;
	var timer;

	function showDisc() {
		for (var i = 0; i < disc.length; i++) {
			if (disc[i].className == "active") {
				disc[i].className = "";
				break;
			}
		}
		disc[index - 1].className = "active";
	}

	function animated (offset) {
		animating = true;
		var newLeft = parseInt(list.style.left) + offset;
		var time = 200;
		var interval = 10;
		var speed = offset/(time/interval);
		

		function go() {
			if (speed < 0 && parseInt(list.style.left) > newLeft || (speed > 0 && parseInt(list.style.left) < newLeft)) {
				list.style.left = parseInt(list.style.left) + speed + "px"; 
				setTimeout(go, interval);
			} else {
				animating = false;
				list.style.left = newLeft + "px";
				if ( newLeft > -680) {
					list.style.left = -4080 + "px";
				}
				if ( newLeft < -4080) {
					list.style.left = -680 + "px";
				}
				}
		}
			go();
	}
	
	function play() {
		timer = setInterval(function () {
			next.onclick();
		}, 2000);
	}

	function stop() {
		clearInterval(timer);
	}

	next.onclick = function () {
		if (index == 6) {
			index = 1;
		} else {
			index += 1;
		}
		
		showDisc();
		if (!animating) {
			animated(-680);
		}
		
	}

	prev.onclick = function () {
		if (index == 1) {
			index = 6;
		} else {
			index -= 1;
		}
		
		showDisc();
		if (!animating) {
			animated(680);
		}
		
	}

	for (var i = 0; i < disc.length; i++) {
		disc[i].onclick = function () {
			var myIndex = parseInt(this.getAttribute("index"));
			var offset = -680 * (myIndex - index);

			animated(offset);
			index = myIndex;
			showDisc();
		}
	}

	container.onmouseover = stop;
	container.onmouseout = play;
	play();
}