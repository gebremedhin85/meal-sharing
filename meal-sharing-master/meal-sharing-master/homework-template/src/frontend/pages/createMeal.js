function createNewMeals() {
	const insertTitle = document.getElementById("title");
	const insertDescription = document.getElementById("description");
	const insertLocation = document.getElementById("location");
	const insertForWhen = document.getElementById("when");
	const insertMaxReservation = document.getElementById("max_reservations");
	const insertPrice = document.getElementById("price");
	const insertCreated_date = document.getElementById("created_date");
	let insertNewMeal = {
		title: insertTitle.value,
		description: insertDescription.value,
		location: insertLocation.value,
		for_when: insertForWhen.value,
		max_reservations: insertMaxReservation.value,
		price: insertPrice.value,
		created_date: insertCreated_date.value,
	};
	console.log(insertNewMeal);
	
	fetch("/api/meals", {
		method: "POST",
		mode: "cors",
		cache: "no-cache",
		credentials: "same-origin",
		headers: { "Content-Type": "application/json" },
		redirect: "follow",
		referrerPolicy: "no-referrer",
		body: JSON.stringify(insertNewMeal),
	})
		.then(() => {
			alert(`You have inserted ${title.value} to meals table succesfully`);
		})
		.catch((err) => {
			console.log(err);
		});
}

window.handleNewMealRequest = () => {
	document.body.innerHTML = `
	<header class="newMeal"> 
		<a href="/" data-navigo>Home</a>
		<a href="/meals" data-navigo>Meals</a>
	</header>
	<main class="newMeal">
		<h3>Create a new meal</h3>
		<form action="/api/meals" class="mealForm" id="mealForm">
			<div class="name">
				<input type="text" class="title" id="title" name="title" placeholder="Title"/>
			</div>
			<div>
				<textarea type="text" class="description" name="description" id="description" placeholder="Description"></textarea>
			</div>
			<div>
				<input type="text" class="location" name="location" id="location" placeholder="Location"/>
			</div>
			<div>
				<input type="datetime" class="when" name="for_when" id="when" placeholder="For when"/>
			</div>
			<div>
				<input type="Number" class="max_reservations" name="max_reservations" id="max_reservations" placeholder="Max. reservations">
			</div>
			<div>
			<input type="Number" class="price" name="price" id="price" placeholder="Price"/>
			</div>		
			<div>
				<input type="datetime" class="created_date" name="for_when" id="created_date" placeholder="Created date"/>
			</div>
		</form>
		<div>
			<button type="submit" class="newMeal" id="newMeal" onClick ="createNewMeals()">Create a new meal</button>   
		</div>
	</main>`;
};
