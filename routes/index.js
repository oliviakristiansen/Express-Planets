var express = require('express');
var router = express.Router();
const sqlite = require('sqlite3').verbose();
const staticModels = require('../staticModels/staticPlanets');
const models = require('../models');

/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', {
//     title: 'Express'
//   });
// });

router.get('/planets', function (req, res, next) {

  // The below is finding all planets, brings them in as an array of objects, which is then mapped over (map takes in an array and returns each value in an array as an object) and returns an object of each planet as an object. It then sends back the data in the 'res.send()`. JSON.stringify() is needed to turn the mapped objects into a JSON format. A front-end application uses JSON as its data. 
  models.planets.findAll().then(planetsAsPlainObjects => {
    const mappedPlanets = planetsAsPlainObjects.map(sequelizeModelForPlanet => 
      ({
        id: sequelizeModelForPlanet.id,
        name: sequelizeModelForPlanet.name,
        numberOfMoons: sequelizeModelForPlanet.numberOfMoons
      })  
    )
    res.send(JSON.stringify(
        mappedPlanets
      ));
    });

});

router.get('/staticPlanets', function (req, res, next) {
 
  res.send(JSON.stringify(
    staticModels.planets
  ));
});
module.exports = router;