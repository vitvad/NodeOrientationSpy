$(function() {

	var socket = io.connect('epuakhaw0143:8080');
	var canvas = $('#canvas');
	var infoBox = $('#info-box');
	var camera, scene, renderer;
	var coord = {
		x: 0,
		y: 0,
		z: 0
	};

	socket.on('getorientation', function(data) {
		coord = data;
		$("#alpha").html(data.z.toFixed(2));
		$("#beta").html(data.x.toFixed(2));
		$("#gamma").html(data.y.toFixed(2));
	});

	(function() {
		renderer = new THREE.WebGLRenderer();
		renderer.setSize(canvas.width(), canvas.height());
		canvas.append( renderer.domElement );

		camera = new THREE.PerspectiveCamera( 50, canvas.width() / canvas.height(), 1, 1000 );

		camera.position.z = 20;

		scene = new THREE.Scene();
		scene.add( camera );

		var geom = new THREE.CubeGeometry(6,0.4,3);

		var colors = [0xcccccc, 0x00ff00, 0x00ffff, 0xff0000, 0xff00ff, 0xffff00];
		for (var i = 0; i < geom.faces.length; i++) {
			var face = geom.faces[i];
			face.color.setHex( colors[i] );
		}

		var material = new THREE.MeshLambertMaterial({vertexColors: THREE.FaceColors});

		cube = new THREE.Mesh(geom, material);
		scene.add(cube);

		light = new THREE.PointLight( 0xffffff );
		light.position.set(20, 20, 20);
		scene.add( light );

		renderer.render( scene, camera );

		window.addEventListener('resize', function(){
			camera.aspect = canvas.width() / canvas.height();
			camera.updateProjectionMatrix();
			renderer.setSize(canvas.width(), canvas.height());
		}, false);

		stats = new Stats();
		infoBox.append(stats.domElement);

		animate();
	})();

	function animate() {
		requestAnimationFrame(animate);

		cube.rotation.x = coord.x * Math.PI / 180;
		cube.rotation.y = coord.y * Math.PI / 180;
		cube.rotation.z = coord.z * Math.PI / 180;

		renderer.render(scene, camera);
		stats.update();

	}
});