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
}

InitDemo();