function makeNewReservaton(id) {
	const insertNumberOfGuests = document.getElementById("guests");
	const insertName = document.getElementById("name");
	const insertEmail = document.getElementById("email");
	const insertPhone = document.getElementById("phoneNum");
	const insertCreatedAt = document.getElementById("created_at");

	let insertReservation = {
		number_of_guests: insertNumberOfGuests.value,
		meal_id: id,
		created_date: insertCreatedAt.value,
		name: insertName.value,
		email: insertEmail.value,
		phone_number: insertPhone.value,
	};
	console.log(insertReservation);

	fetch("/api/reservations", {
		method: "POST",
		mode: "cors",
		cache: "no-cache",
		credentials: "same-origin",
		headers: { "Content-Type": "application/json" },
		redirect: "follow",
		referrerPolicy: "no-referrer",
		body: JSON.stringify(insertReservation),
	})
		.then(() => {
			alert("Your booking is submited succesfully");
		})
		.catch((err) => {
			consele.log(err);
		});
}

window.handleMealRequest = (params, query) => {
	fetch(`/api/meals/${params.id}${query.availableReservations}`)
		.then((res) => res.json())
		.then((res) => {
			if (res.length === 0) {
				fetch(`/api/meals/${params.id}`)
					.then((res) => res.json())
					.then(
						(res) =>
							document.body.innerHTML = `
                    <header class="meal">
                        <h1>Meals Information</h1>
                        <div>
                            <a href="/" data-navigo>Home</a>
                            <a href="/meals" data-navigo>Meals</a> 
                        </div>
                    </header>
            
                    <main class="meal">
                        <h3>Meal name:   ${res[0].title}</h2>
                        <p>Description: ${res[0].description}</p>
                        <p>Price :${res[0].price}</p>
                        <footer class="meal">
                        <p>Telephone</p>
                        <p>Adress</p>
                    </footer>`
					);
			} else {
				document.body.innerHTML = `
                <header class="meal">
                    <h1>Meals Information</h1>
                    <div>
                        <a href="/" data-navigo>Home</a>
                        <a href="/meals" data-navigo>Meals</a> 
                    </div>
                </header>

                <main class="meal">
                    <h3>Meal name:   ${res[0].title}</h3>
                    <p>Description: ${res[0].description}</p>
                    <p>Price : ${res[0].price} kr</p>
                    <form class="reservation" id="form">
                    <h3>Reserve for this meal</h3>
                    <div class="reserveInput">
                        <input type="number" class="guests" id="guests" name="number_of_guests" placeholder="Number of guests">
                    </div>
                    <div class="reserveInput">
                        <input type="datetime" class="created_date" name="for_when" id="created_at" placeholder="Created date"/>
                    </div>
                    <div class="reserveInput">
                        <input type="text" class="name" id="name" name="name" placeholder="Name">
                    </div>
                    <div class="reserveInput">
                        <input type="email" class="email" name="email" id="email" placeholder="Email">
                    </div>
                    <div class="reserveInput">
                        <input type="text" class="phone" name="phone_number" id="phoneNum" placeholder="Phone number">
                    </div>
                </form>
                <div>
                    <button type="submit" class="bookButton" id="button" onClick="makeNewReservaton(${res[0].id})">Book seat</button>   
                </div>
            </main>
            <footer class="meal">
                <p>Telephone</p>
                <p>Adress</p>
            </footer>`;
			}
		});
};
