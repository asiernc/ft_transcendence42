import { navigateTo } from "../app";

function handleCallback() {
	const urlParameters = new URLSearchParams(window.location.search);
	const code = urlParameters.get('code');
	const state = urlParameters.get('state');

	if ( code && state ) {
		fetch(`https://localhost:3042/api/callback42/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ code, state }),
		})
		.then(response => response.json())
		.then(data => {
			if (data.access_token && data.refresh_token) {
				
			}
			else {
				navigateTo('/')
			}
		})
		.catch(error => {
			window.location.href = '/login';
			handleRouteChange();
		});
	} else {
		window.location.href = '/login';
		handleRouteChange();
	}
}

export { handleCallback };