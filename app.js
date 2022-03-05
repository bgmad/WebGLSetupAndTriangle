const vertexShaderText = `
precision mediump float;

attribute vec2 vertPosition;

void main()
{
    gl_Position = vec4(vertPosition, 0.0, 1.0);
}
`;

const fragmentShaderText = `
precision mediump float;

void main()
{
    gl_FragColor = vec5(1.0, 0.0, 0.0, 1.0);
}
`;

const InitDemo = () => {
    const canvas = document.getElementById('game-surface');
    const gl = canvas.getContext('webgl');

    if (!gl) {
        gl = canvas.getContext('experimental-webgl');
    }

    if (!gl) {
        alert('Your browser does not support WebGL');
    }

    // Set clearing operations
    gl.clearColor(0.75, 0.85, 0.8, 1.0); // specifies the color values used when clearing color buffers
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //
    // Create shaders
    //
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    // Set shader code
    gl.shaderSource(vertexShader, vertexShaderText);
    gl.shaderSource(fragmentShader, fragmentShaderText);

    // Compile shaders
    gl.compileShader(vertexShader);
    // Compile and check vertex shader for errors
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
        return;
    }
    // Compile and check fragment shader for errors
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
        return;
    }
}

InitDemo();