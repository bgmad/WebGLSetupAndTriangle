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
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
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

    // program is a combination of both shaders
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    // "completing the process of preparing the GPU code for the program's fragment and vertex shaders."
    gl.linkProgram(program);
    // Catch any errors with linking Program
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('ERROR linking program!', gl.getProgramInfoLog(program));
        return;
    }
    // Make sure everything is good to go in the current WebGL state
    gl.validateProgram(program);
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
        console.error('ERROR validating program!', gl.getProgramInfoLog(program));
        return;
    }

    //
    // Create buffer
    //
    const triangleVertices = 
    [ // X, Y
        0.0, 0.5,
        -0.5, -0.5,
        0.5, -0.5
    ];

    // Create the buffer object
    const triangleVertexBufferObject = gl.createBuffer();
    // Bind gl.ARRAY_BUFFER to that buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
    // This function has many different options for parameters. I think correlates to (target, ArrayBuffer(View?) srcData, usage).
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

    const positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
    gl.vertexAttribPointer(
        positionAttribLocation, // Attribute location
        2, // Number of elements per attribute
        gl.FLOAT, // Type of elements
        gl.FALSE,
        2 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
        0 // Offset from the beginning of a single vertex to this attribute
    );

    gl.enableVertexAttribArray(positionAttribLocation);
}

InitDemo();