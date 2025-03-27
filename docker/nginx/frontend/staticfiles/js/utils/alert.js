function displayAlert(text, status){
	const style = document.createElement("style");
	style.textContent = `
	.alertacollons {
		position: fixed;
		padding: 40px;
		top: 40%;
		left: 50%;
		font-size: larger;
		z-index = 22;
	}
	.badAlert{
		background-color: #EE7C7C;
		border: 5px solid #701717;
		color: 'white';
	}
	.goodAlert{
		background-color: #97ED93;
		border: 5px solid #1E6C1A;
		color: 'black';
	}
	`;
	const div = document.createElement("div");
	div.innerText = text;
	div.classList = "alertacollons "+status+"Alert";
	div.id = "successAlert";

	document.getElementById("app").appendChild(style);
	document.getElementById("app").appendChild(div);
	setTimeout(() => {
		div.remove();
		style.remove();
	}, 2000);
}

export {displayAlert};