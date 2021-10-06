const path = require('path');
module.exports = {
    // 1. Se estrablece modo desarrollo
    mode: 'development',
    // 2. Especificar archivo entrada
    entry: './client/index.js',
    // 3. Salida de empaquetado
    output: {
        // 4. Ruta absoluta salida
        path: path.join(__dirname, 'public'),
        // 5. Nombre archivo salida
        filename: 'js/bundle.js',
        // 6. Servidor desarrollo, ruta path publico 
        publicPath: '/'
    },
    devServer: {
        static: path.join(__dirname, 'public'),
        port: 8085,
        host: 'localhost'
    }
}