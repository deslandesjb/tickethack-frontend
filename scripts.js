document.querySelector("#purchase").addEventListener("click", function () {
  const cityDeparture = document.querySelector("#cityDeparture");
  const cityArrival = document.querySelector("#cityArrival");
  const cityDate = document.querySelector("#cityDate");

  fetch("http://localhost:3000/trips", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({departure: cityDeparture.value, arrival: cityArrival.value, date: cityDate.value}),
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      if (data.result) {
        if (document.querySelector("#menu-2-error")) {
          document.querySelector("#menu-2-error").remove();
        }

        data.trips.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

        for (let i = 0; i < data.trips.length; i++) {
          const getHour = new Date(data.trips[i].date);
          let getMinutes = getHour.getMinutes();
          if (getMinutes < 10) {
            getMinutes = "0" + getMinutes;
          }

          document.querySelector("#menu-2-trips-list").innerHTML += `
            <div class="elements">
              <p class="roads"><span class="departure">${data.trips[i].departure}</span> > <span class="arrival">${data.trips[i].arrival}</span></p>
              <div class="time">${getHour.getHours()}:${getMinutes}</div>
              <div class="price"><span class="priceToShow">${data.trips[i].price}</span>€</div>
              <button class="add" id="${data.trips[i]._id}">Book</button>
            </div>
          `;
        }
      } else {
        document.querySelector("#menu-2-error-img").src = "./images/notfound.png";
      }
      // cityDeparture.value = "";
      // cityArrival.value = "";
      // cityDate.value = "";
    });
});

//
// fetch("http://localhost:3000/weather")
//   .then((response) => response.json())
//   .then((data) => {
//     if (data.weather) {
//       for (let i = 0; i < data.weather.length; i++) {
//         document.querySelector("#cityList").innerHTML += `
// 				<div class="cityContainer">
// 				<p class="name">${data.weather[i].cityName}</p>
// 				<p class="description">${data.weather[i].description}</p>
// 				<img class="weatherIcon" src="images/${data.weather[i].main}.png"/>
// 				<div class="temperature">
// 					<p class="tempMin">${data.weather[i].tempMin}°C</p>
// 					<span>-</span>
// 					<p class="tempMax">${data.weather[i].tempMax}°C</p>
// 				</div>
// 				<button class="deleteCity" id="${data.weather[i].cityName}">Delete</button>
// 			</div>
// 			`;
//       }
//       updateDeleteCityEventListener();
//     }
//   });
