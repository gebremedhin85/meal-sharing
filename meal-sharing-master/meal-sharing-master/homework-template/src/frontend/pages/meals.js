function renderMeals(meals) {
	const ul = document.createElement("ul");

	for (let i = 0; i < meals.length; i++) {
		const li = document.createElement("li");

		li.innerHTML = `<p>Meal name: <a href="/meal/${meals[i].id}">${meals[i].title}</a></p>
		<p>Price : ${meals[i].price}</p>
		<p>Description: ${meals[i].description}</p>`;
		ul.appendChild(li);
	}

	const footer = document.createElement("footer");
	footer.innerHTML = `
            <p>Telephone</p>
            <p>Adress</p`;
	document.body.appendChild(ul);
	document.body.appendChild(footer);
}

window.handleMealsRequest = () => {
	document.body.innerHTML = `
	<header>
        <h1 class="mealsHeader">Our delicious meals </h1>
        <div>
            <a href="/" data-navigo>Home</a> 
        </div>
	</header> 
	<div class="insertNewMeal"><a href="create-meal" data-navigo>Create a new meal</a></div>`;

	// make sure the backend api works before working with it here
	fetch("/api/meals")
		.then((response) => response.json())
		.then(renderMeals);
};
