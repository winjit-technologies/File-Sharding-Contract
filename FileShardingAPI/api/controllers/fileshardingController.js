
var request = require('request');
var express = require('express');        
var app  = express();                 
var bodyParser = require('body-parser');
var Web3 = require('web3');
var fs = require('fs');

let abi =JSON.parse(fs.readFileSync("contract.json"));

var web3 =  new Web3(new Web3.providers.HttpProvider("http://192.168.0.164:8545"));
let contract = web3.eth.contract(abi);
let contractInstance = contract.at("0x010604899Ac97252f4d4095a0F221f62DE9d6428");


/**
 * This method is used to get file chunks count for a given hash of file
 * @param {*} req 
 * @param {*} res 
 */
exports.getFileChunksCount = function(req, res) {      
    var hashoffile=req.body.filehash;     
    if(!hashoffile)
    {           
        res.send({
            "StatusCode": 200,
            "Data": "Hash of the file  required"
        });
    }
else
{   
   
    res.send({
        "StatusCode": 200,
        "FileChunksCount": 5
    }); 
}         
};

/**
 * This method  is used to get latest block details from the database
 */
exports.getLatestBlock = function (req, res) {   
    var count = req.body.count;
    if(!count)
    {
        res.send({
            "StatusCode": 200,
            "Data": "count of the blocks required"
        });
    }
    else
    {
            var JsonResponse = [];   
            var CountJson = [
                {
                    "StatusCode": 200,
                }
            ];
            var currentBlockNumber = web3.eth.blockNumber;
            var result = '';
            for (var i = 0; i < count; i++) {
                if (i <= currentBlockNumber) {                    
                    JsonResponse.push(web3.eth.getBlock(web3.eth.blockNumber - i));
                }
            }
            res.send({
                "StatusCode": 200,
                "Data": JsonResponse
            }
            );
    }
};

/**
 * This method  is used to get  file chunks from database for a given hash of file
 */
exports.getFileChunksFromDatabase = function (req, res) {
    console.log("in get function");
    var hashoffile = req.body.filehash;
    console.log(hashoffile);
    if(!hashoffile)
    {
        res.send({
            "StatusCode": 200,
            "Data": "Hash of the file  required"
        });
    }
    else
    {       
                   
        var JsonResponse = [];   
        var NumberOfFileChunks = 5;

        //get each chunk one by one 
        for(var i=0;i<NumberOfFileChunks;i++)
        {
            var result= contractInstance.getFileChunksFromDatabase.call(hashoffile,i);   

            var datetime = web3.toAscii(result[0]).replace(/\u0000/g, '');
            var sequence = result[1].toLocaleString();
            var hashOfChunk = result[2].toLocaleString();
            var uuid = result[3].toLocaleString();
            var miners=[];

            for (var j = 0; j < 5; j++) {
                miners.push(result[4][j].toLocaleString());
            }

            var response = {
                datetime: datetime,
                sequence: sequence,
                uuid: uuid,
                hashOfFileChunk:hashOfChunk,
                miner:miners
            }          
            JsonResponse.push(response);
        }
        res.send({
            "StatusCode": 200,
            "Data": JsonResponse
        }
        );

     
        }

        
    
}

/**
 * This method  is used to write specific chunks of file to the blockchain database
 */
exports.writeFileChunksToDatabase = function(req, res) {      

    var Data=req.body.Data;
    var response=[];
    Data.forEach(function(datachunk){
        var datetime=datachunk.datetime;       
        var sequence=datachunk.sequence;
        var uuid=datachunk.uuid;
        var miner=datachunk.miner;
        var hash=datachunk.hashOfFile;
        var hashChunk=datachunk.hashOfFileChunk; 
        
        if(!datetime)
        {
            res.send({
                "StatusCode": 200,
                "Data": "datetime of the file chunk is required"
            });
        }
        else  if(!sequence)
        {
            res.send({
                "StatusCode": 200,
                "Data": "sequence of the file chunk is required"
            });
        }
        else  if(!uuid)
        {
            res.send({
                "StatusCode": 200,
                "Data": "uuid of the file chunk is required"
            });
        }
        else  if(!hash)
        {
            res.send({
                "StatusCode": 200,
                "Data": "hash of the file chunk is required"
            });
        }
        else  if(!hashChunk)
        {
            res.send({
                "StatusCode": 200,
                "Data": "hashChunk of the file chunk is required"
            });
        }
        else  if(!miner)
        {
            res.send({
                "StatusCode": 200,
                "Data": "miner of the file chunk is required"
            });
        }
       else
       {
            var receipt= contractInstance.writeFileChunksToDatabase(datetime,sequence,hash,hashChunk,uuid,miner,{from:web3.eth.accounts[0], gas: 4712388 });
            response.push(receipt); 
       }
             
    });

    res.send({
        "StatusCode": 200,
        "Data":response
    }); 
    //code to get detail transaction Receipt of blockchain transaction ,currently we are only returning transaction number of the blockchain   
    /*web3.eth.getTransactionReceipt(data , function(err,receipt) 
            {
                res.send({
                    "StatusCode": 200,
                    "Data":receipt
                });   
            } );          
        })
    }*/
}