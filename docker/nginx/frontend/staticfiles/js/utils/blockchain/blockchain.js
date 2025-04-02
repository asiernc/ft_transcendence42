export async function uploadToBlockchain(player1, player2, results, tournament_id) {
	const web3 = new Web3("https://rpc.ankr.com/eth_sepolia/72a3339d99c6f70098e3f3859a3de371ab0ba6c90f1fae252204225ff8f3e355");
	const contract_address = "0x15Dc4A2EA437dF9ad394090C04CC730AfE8a9DD7";
	const contract_abi = [
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "string",
					"name": "player1",
					"type": "string"
				},
				{
					"indexed": false,
					"internalType": "string",
					"name": "player2",
					"type": "string"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "score1",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "score2",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "string",
					"name": "winner",
					"type": "string"
				},
				{
					"indexed": false,
					"internalType": "int256",
					"name": "tournament_id",
					"type": "int256"
				}
			],
			"name": "MatchRecorded",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "_player1",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "_player2",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "_score1",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_score2",
					"type": "uint256"
				},
				{
					"internalType": "string",
					"name": "_winner",
					"type": "string"
				},
				{
					"internalType": "int256",
					"name": "_tournament_id",
					"type": "int256"
				}
			],
			"name": "recordMatch",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "matches",
			"outputs": [
				{
					"internalType": "string",
					"name": "player1",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "player2",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "score1",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "score2",
					"type": "uint256"
				},
				{
					"internalType": "string",
					"name": "winner",
					"type": "string"
				},
				{
					"internalType": "int256",
					"name": "tournament_id",
					"type": "int256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	];
	const contract = new web3.eth.Contract(contract_abi, contract_address);
	let wallet_priv_key;
	try {
		const response = await fetch('/api/get-wallet-key', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
			},
		});
		const data = await response.json();
		wallet_priv_key = data.wallet_key;
		console.log('wallet_key', wallet_priv_key);
		if (!response.ok) {
			const err_msg = await response.json().catch(() => new Error("Private key is not valid."));
			throw Error(err_msg);
		}
	} catch (err) {
		console.log(err);
	}
	const account = web3.eth.accounts.wallet.add("0x" + wallet_priv_key);
	if (tournament_id == null)
		tournament_id = -1;
	console.log('data', results, tournament_id);
	const estimateGas = await contract.methods.recordMatch(player1, player2, results.score_player1, results.score_player2, results.winner, tournament_id).estimateGas({from: account[0].address});
	const txReceipt = await contract.methods.recordMatch(player1, player2, results.score_player1, results.score_player2, results.winner, tournament_id).send({from: account[0].address, gas: estimateGas});
	console.log('txReceipt: ', txReceipt);
}