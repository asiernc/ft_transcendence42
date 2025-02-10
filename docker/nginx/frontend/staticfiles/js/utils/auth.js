
function redirectTo42Login() {
	window.location.href = `https://localhost:3042/api/login42/`;
}

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
				document.cookie = `access_token=${data.access_token}`;
				document.cookie = `refresh_token=${data.refresh_token}`;
				window.location.href = '/home';
				handleRouteChange();
			}
			else {
				window.location.href = '/home';
				handleRouteChange();
			}
		})
		.catch(error => {
			window.location.href = '/home';
			handleRouteChange();
		});
	} else {
		window.location.href = '/home';
		handleRouteChange();
	}
}

export { redirectTo42Login, handleCallback };