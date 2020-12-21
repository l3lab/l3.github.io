(function script() {

	const texDimension = 2;
	const texSize = texDimension * texDimension;

	const scene = new THREE.Scene();
	const geometry = new THREE.BoxBufferGeometry(0.3, 0.3, 0.05);

	var camera, renderer;
	var mesh;
	var sreenDimensions = {
		width: window.innerWidth - 5,
		height: window.innerHeight - 5
	}

	function init() {
		camera = new THREE.PerspectiveCamera(40, sreenDimensions.width / sreenDimensions.height, 0.01, 10);
		camera.position.z = 0.5;

		const data = new Uint8Array(3 * texSize);
		for (let i = 0; i < texSize; i++) {
			const stride = i * 3;
			data[stride] = Math.floor(Math.random() * 255);
			data[stride + 1] = Math.floor(Math.random() * 255);
			data[stride + 2] = Math.floor(Math.random() * 255);
		}

		// used the buffer to create a DataTexture	
		var texture = new THREE.DataTexture(data, texDimension, texDimension, THREE.RGBFormat, undefined, undefined, undefined, undefined,
			THREE.LinearFilter, THREE.LinearFilter);		

		mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ map: texture }));
		scene.add(mesh);

		renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize(sreenDimensions.width, sreenDimensions.height);
		document.body.appendChild(renderer.domElement);

	}

	function animate() {
		mesh.rotation.x += 0.001;
		mesh.rotation.y += 0.01;
		mesh.rotation.z += 0.01;
		requestAnimationFrame(animate);
		renderer.render(scene, camera);
	}

	init();
	animate();

})()
