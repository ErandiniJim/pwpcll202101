module.exports = {
    //1. Especificar archivo entrada
    entry: './client/index.js',
    //2. especificar archivo de salida
    output: {
        path: '/public', //3. ruta absoluta de salida
        filename: 'bundle.js' //4. nombre archivo salida
    },
    devServer : {
        static: './public'
    }
}