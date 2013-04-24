$(function() {

	var socket = io.connect('epuakhaw0143:8080');;

	function handleEvent(event) {
		var x = event.beta,
			y = event.gamma,
			z = event.alpha;

		socket.emit('setorientation', {
			x: x,
			y: y,
			z: z
		});

		$("#alpha").html(z.toFixed(2));
		$("#beta").html(x.toFixed(2));
		$("#gamma").html(y.toFixed(2));
	}

	window.addEventListener("deviceorientation", handleEvent, true);
});