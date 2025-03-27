
async function loadTournament(tournament_id) {
	try {
		const response = await fetch(`/api-tournament/tournament/${tournament_id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
			},
		});
		const data = await response.json();
		if (response.ok)
		{
			console.log(data);
			return data;
		}
		else
			throw Error(data.error);
	}
	catch (err) {
		console.log(err);
		navigateTo('/options_tournament')
	}
}

function uploadTournament(tournament_id)
{
	const tournament = loadTournament(tournament_id);
	
}