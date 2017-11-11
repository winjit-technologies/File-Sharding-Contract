'use strict';
module.exports = function(app) {
  var iagoncontroller = 
  require('../controllers/iagonController.js');


 app.route('/GetFileChunksCount')
    .post(iagoncontroller.getFileChunksCount); 

  app.route('/WriteFileChunksToDatabase')
    .post(iagoncontroller.writeFileChunksToDatabase)  ;

   app.route('/GetLatestBlock')
    .post(iagoncontroller.getLatestBlock)  ;

  app.route('/GetFileChunksFromDatabase')
    .post(iagoncontroller.getFileChunksFromDatabase)  ;  
   
};