function renderMealsToHome(meals) {
	const ul = document.createElement("ul");
	ul.setAttribute("class", "home");
	for (let i = 0; i < meals.length; i++) {
		const li = document.createElement("li");
		li.setAttribute("class", "home");
		li.innerHTML = `${meals[i].id}: ${meals[i].title}`;
		ul.appendChild(li);
	}
	const footer = document.createElement("footer");
	footer.innerHTML = `
			<h3>Contact</h3>
			<div class="contacts">
				<p>Email: ethio-habesha@gmail.dk</p>
				<p>Tlf: 91490603</p>
				<div><a href="#"><i class="fab fa-facebook"></i></a>
				<a href="#"><i class="fab fa-twitter"></i></a>
				<a href="#"><i class="fab fa-youtube"></i><div>
			</div>
            <p>Adress: Valby, Copenhagen</p`;
	document.body.appendChild(ul, footer);
	document.body.appendChild(footer);
}

window.handleHomeRequest = () => {
	document.body.innerHTML = `
    <header class="home">
        <h1 class="homeHeader">Habesha restaurant</h1>
        <a href="meals" data-navigo>To our meals</a>              
	</header>
	<h2 class="home">Our menue</h2> 
    `;
	fetch("/api/meals")
		.then((response) => response.json())
		.then(renderMealsToHome);
	// if any links are added to the dom, use this function
	// make the router handle those links.
	router.updatePageLinks();
};
