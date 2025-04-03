let nonce_g = null;

export async function uploadToBlockchain(player1, player2, results, tournament_id, players) {
	const web3 = new Web3("https://rpc.ankr.com/eth_sepolia/72a3339d99c6f70098e3f3859a3de371ab0ba6c90f1fae252204225ff8f3e355");
	const contract_address = "0x6207C869B67B2d6C5A96F92c82399269A74aFEfD";
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
					"internalType": "uint256",
					"name": "timestamp",
					"type": "uint256"
				}
			],
			"name": "MatchRecorded",
			"type": "event"
		},
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
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "timestamp",
					"type": "uint256"
				}
			],
			"name": "TournamentMatchRecorded",
			"type": "event"
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
				},
				{
					"internalType": "uint256",
					"name": "timestamp",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
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
			"name": "recordTournamentMatch",
			"outputs": [],
			"stateMutability": "nonpayable",
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
		if (!response.ok) {
			const err_msg = await response.json().catch(() => new Error("Private key is not valid."));
			throw Error(err_msg);
		}
	} catch (err) {
		console.log(err);
	}
	const account = web3.eth.accounts.wallet.add("0x" + wallet_priv_key);
	if (nonce_g == null)
		nonce_g = await web3.eth.getTransactionCount(account[0].address, "latest");
	const nonce = nonce_g;
	nonce_g++;
	let estimateGas, txReceipt;
	if (tournament_id == null) {
		if (players == null) {
			estimateGas = await contract.methods.recordMatch(player1, player2, results.score_player1, results.score_player2, results.winner).estimateGas({from: account[0].address});
			txReceipt = await contract.methods.recordMatch(player1, player2, results.score_player1, results.score_player2, results.winner).send({from: account[0].address, gas: estimateGas, nonce : nonce});
		} else {
			const team1 = players.player1 + "/" + players.player3;
			const team2 = players.player2 + "/" + players.player4;
			results.winner = results.winner == player1 ? team1 : team2;
			estimateGas = await contract.methods.recordMatch(team1, team2, results.score_player1, results.score_player2, results.winner).estimateGas({from: account[0].address});
			txReceipt = await contract.methods.recordMatch(team1, team2, results.score_player1, results.score_player2, results.winner).send({from: account[0].address, gas: estimateGas, nonce : nonce});
		}
	} else {
		estimateGas = await contract.methods.recordTournamentMatch(player1, player2, results.score_player1, results.score_player2, results.winner, tournament_id).estimateGas({from: account[0].address});
		txReceipt = await contract.methods.recordTournamentMatch(player1, player2, results.score_player1, results.score_player2, results.winner, tournament_id).send({from: account[0].address, gas: estimateGas, nonce : nonce});
	}
}