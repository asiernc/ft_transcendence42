// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PongTournaments {
    struct Match {
        string	player1;
        string	player2;
        uint256	score1;
        uint256	score2;
		string	winner;
		int		tournament_id;
		uint256 timestamp;
    }

	Match[] public matches;

    event MatchRecorded(string player1, string player2, uint256 score1, uint256 score2, string winner, uint256 timestamp);
	event TournamentMatchRecorded(string player1, string player2, uint256 score1, uint256 score2, string winner, int tournament_id, uint256 timestamp);


    function recordTournamentMatch(
		string memory _player1,
		string memory _player2,
		uint256 _score1, 
		uint256 _score2,
		string memory _winner, 
		int _tournament_id) public
	{
		matches.push(Match(_player1, _player2, _score1, _score2, _winner, _tournament_id, block.timestamp));
		emit TournamentMatchRecorded(_player1, _player2, _score1, _score2, _winner, _tournament_id, block.timestamp);
    }
	function recordMatch(
		string memory _player1,
		string memory _player2,
		uint256 _score1, 
		uint256 _score2,
		string memory _winner) public
	{
		matches.push(Match(_player1, _player2, _score1, _score2, _winner, 0, block.timestamp));
		emit MatchRecorded(_player1, _player2, _score1, _score2, _winner, block.timestamp);
	}
}
