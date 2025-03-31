// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PongTournaments {
    struct Match {
        string	player1;
        string	player2;
        uint256	score1;
        uint256	score2;
		string	winner;
		string	round;
		int		tournament_id;
		uint256	timestamp;
    }

	Match[] public matches;

    event MatchRecorded(string player1, string player2, uint256 score1, uint256 score2, string winner, string round, int tournament_id, uint256 timestamp);

    function recordMatch(
		string memory _player1,
		string memory _player2,
		uint256 _score1, 
		uint256 _score2,
		string memory _winner, 
		string memory _round,
		int _tournament_id) public
	{
		matches.push(Match(_player1, _player2, _score1, _score2, _winner, _round, _tournament_id, block.timestamp));
		emit MatchRecorded(_player1, _player2, _score1, _score2, _winner, _round, _tournament_id, block.timestamp);
    }
}
