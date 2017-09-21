module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  rinkeby: {
    host: "localhost", // Connect to geth on the specified
    port: 8545,
    from: "0x262b76dF1dCb6542AA4a19296A824F0fDD1B4B04", // default address to use for any transaction Truffle makes during migrations
    network_id: 4,
    gas: 4612388 // Gas limit used for deploys
  }


};
