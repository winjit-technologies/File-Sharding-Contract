'use strict';
module.exports = function(app) {
  var fileshardingcontroller = 
  require('../controllers/fileshardingController.js');


 app.route('/GetFileChunksCount')
    .post(fileshardingcontroller.getFileChunksCount); 

  app.route('/WriteFileChunksToDatabase')
    .post(fileshardingcontroller.writeFileChunksToDatabase)  ;

   app.route('/GetLatestBlock')
    .post(fileshardingcontroller.getLatestBlock)  ;

  app.route('/GetFileChunksFromDatabase')
    .post(fileshardingcontroller.getFileChunksFromDatabase)  ;  
   
};