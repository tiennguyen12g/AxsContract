// import the Web3 library
const Web3 = require('web3');
const axsStakerABI = require('RoninABI.js')
// URL of the blockchain network
const rpcUrl = "https://api-gateway.skymavis.com/rpc?apikey=vZXZcksdI14traRZYcvZyNG4LdXQx12t";

// create the connection
var web3 = new Web3(rpcUrl);
const contract_AXS_Address = '0x05b0bb3c1c320b280501b86706c3551995bc8571';
const myAddress = '0x8f1b64cb790de99e8fb635535fc4edecd07dfd2c';

// readFromSmartContract() // Function call to fetch the information
const contractAxsPool = new web3.eth.Contract(axsStakerABI, contract_AXS_Address);
// function ReadAxsContract(address){
//     return contractAxsPool.methods.getStakingAmount(address).call();
// }
// ReadAxsContract(myAddress).then((v) =>{console.log(web3.utils.fromWei(v))}).catch(console.log);

async function ReadRoninWallet(address){
    const [stakingAmount, pendingRewards] = await Promise.all([
        contractAxsPool.methods.getStakingAmount(address).call(),
        contractAxsPool.methods.getPendingRewards(address).call(),
    ])
  // Convert stakingAmount and pendingRewards to numbers, and round to 2 decimal places
  const stakingAmountInEther = Number(web3.utils.fromWei(stakingAmount)).toFixed(2);
  const pendingRewardsInEther = Number(web3.utils.fromWei(pendingRewards)).toFixed(2);

  console.log('Staking Amount:', stakingAmountInEther, 'Pending Rewards:', pendingRewardsInEther);
};
ReadRoninWallet(myAddress)

