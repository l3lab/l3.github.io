(function script() {

	const texDimension = 2;
	const texSize = texDimension * texDimension;

	const scene = new THREE.Scene();
	const geometry = new THREE.OctahedronBufferGeometry(0.2);
	

	const uniforms = {
		time: { value: 1.0 }
	};

	var camera, renderer;
	var mesh;
	var sreenDimensions = {
		width: window.innerWidth - 5,
		height: window.innerHeight - 5
	}
	
	const vertexShader = document.getElementById("vertexShader").textContent;
	const fragmentShader = document.getElementById("fragmentShader").textContent;

	function init() {
		camera = new THREE.PerspectiveCamera(40, sreenDimensions.width / sreenDimensions.height, 0.01, 10);
		camera.position.z = 0.5;

		mesh = new THREE.Mesh(geometry, new THREE.ShaderMaterial( {
			uniforms: uniforms,
			vertexShader: vertexShader,
			fragmentShader: fragmentShader
		}));

		scene.add(mesh);

		renderer = new THREE.WebGLRenderer({
			antialias: true
		});
		renderer.setSize(sreenDimensions.width, sreenDimensions.height);
		
		document.body.appendChild(renderer.domElement);
	}

	function animate() {
		mesh.rotation.x += 0.001;
		mesh.rotation.y += 0.01;
		mesh.rotation.z += 0.001;
		uniforms.time.value += 0.1;
		requestAnimationFrame(animate);
		renderer.render(scene, camera);
	}

	init();
	animate();

})()
