var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express', author: 'Erandini', appName: 'webApp', company: 'Awsome Software' });
});

/*agregando nueva ruta*/
router.get('/greeting', function(req, res, next){
  res.status(200).json({message:'Hola campeon FullStack'})
})

module.exports = router;
