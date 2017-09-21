pragma solidity ^0.4.11;

/**
 This contract is used to pass data to blockchain to store on miners data
 */
contract BlockchainData {

  // entity made to store chunks of file in the database
    struct FileDataChunk {       
        bytes32 dateTime;
        uint sequence;       
        string hashOfFileChunk;
        string uuid;        
        uint256[] miners;
    }

  mapping (string => FileDataChunk[])  filedataMapping;
 
  //Empty Constructor for blockchain contract , we can further make any initialisations if required  
  function BlockchainData() public {
     
  }
   
}


