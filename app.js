const InitDemo = () => {
    console.log('Hello World');
    
    const canvas = document.getElementById('game-surface');
    const gl = canvas.getContext('webgl');

    if (!gl) {
        gl = canvas.getContext('experimental-webgl');
    }

    if (!gl) {
        alert('Your browser does not support WebGL');
    }

    //Set clearing operations
    gl.clearColor(0.75, 0.85, 0.8, 1.0); // specifies the color values used when clearing color buffers
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

InitDemo();