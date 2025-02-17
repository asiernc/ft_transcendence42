import { navigateTo } from '../app.js';

export function handleCallback() {
	const urlParameters = new URLSearchParams(window.location.search);
	const code = urlParameters.get('code');
	const state = urlParameters.get('state');
	console.log("inside handleCallback");

	if ( code && state ) {
		fetch('https://localhost:3042/api/callback42/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({ code, state }),
		})
		.then(response => response.json())
		.then(data => {
			if (data.access_token && data.refresh_token) {
				localStorage.setItem('access_token', data.access_token);
				localStorage.setItem('refresh_token', data.refresh_token);
				console.log("outside handleCallback1");
				navigateTo('/home');
			}
			else {
				console.log("outside handleCallback2");
				navigateTo('/login');
			}
		})
		.catch(error => {
			console.error('Error during fetch:', error);
			navigateTo('/login');
		});
	} else {
		navigateTo('/login');
	}
}
