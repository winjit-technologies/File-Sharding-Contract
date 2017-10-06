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

 //This Function is used to write data into the database 
  function writeFileChunksToDatabase(bytes32 dateTime,uint sequence,string hashOfFile, string hashOfFileChunk,string uuid,uint256[] miners) public {         
    //first get any previous chunks of file as array    
    FileDataChunk memory filedatachunk = FileDataChunk(dateTime,sequence,hashOfFileChunk,uuid,miners);
    FileDataChunk[] storage tempdatachunks = filedataMapping[hashOfFile];
    tempdatachunks.push(filedatachunk);
        
}
 
 // This function returns the all chunk written for the particular UUID of the file
 /*function getFileChunksFromDatabase(string hash) constant public returns 
 (bytes32[],uint[], string[5] ,bytes32[],uint256[5][] ) 
 {  

    bytes32[] memory datetime = new bytes32[](5);
    uint[] memory sequence = new uint[](5);   
    string[] memory hashOfFileChunk = new string[](5);
    bytes32[] memory uuid = new bytes32[](5);
    uint256[5][] memory miners = new uint256[5][](5);

    FileDataChunk[]  memory filedataobj = filedataMapping[hash];

     for (uint i = 0; i < filedataobj.length; ++i) {      
        datetime[i] = filedataobj[i].dateTime;
        sequence[i] = filedataobj[i].sequence;         
        hashOfFileChunk[i] = filedataobj[i].hashOfFileChunk;         
        uuid[i] = filedataobj[i].uuid;  

        for (uint j = 0;j < 5; j++) {                
            miners[i][j] = filedataobj[i].miners[j];
        }       
  }
    return (datetime, sequence,hashOfFileChunk,uuid,miners);
 }*/


   // This function returns the particular chunk written for the particular hash of the file
 function getFileChunksFromDatabase(string hash,uint index) constant public returns 
 (bytes32,uint, string ,string,uint256[]) 
 {  
      bytes32  datetime; 
      uint  sequence;   
      string  memory hashOfFileChunk; 
      string memory uuid;
      uint256[] memory miners = new uint256[](5);

      FileDataChunk[]  memory filedataobj = filedataMapping[hash];
      FileDataChunk memory filedatatempobj = filedataobj[index];     
      datetime = filedatatempobj.dateTime;
      sequence = filedatatempobj.sequence;   
      hashOfFileChunk = filedatatempobj.hashOfFileChunk;     
      uuid = filedatatempobj.uuid;
      miners = filedatatempobj.miners;    

      return (datetime, sequence,hashOfFileChunk,uuid,miners);
 }

   //This function is used to get number of chunks written for the file
   function getNumberOfFileChunks(string hashOfFile) view public returns (uint) {
     return filedataMapping[hashOfFile].length;      
   }
   
}


