function addToCart() {
  const addCta = document.querySelectorAll(".add");

  // console.log(addCta);
  for (let cta of addCta) {
    cta.addEventListener("click", function () {
      console.log(this.id);

      // fetch(`http://localhost:3000/weather/${this.id}`, {
      //   method: "DELETE",
      // });
      // this.parentNode.remove();

      fetch("http://localhost:3000/cart/", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({tripId: this.id}),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          window.location.assign("cart.html");
        });
    });
  }
}

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
        addToCart();
      } else {
        document.querySelector("#menu-2-error-img").src = "./images/notfound.png";
      }
      // cityDeparture.value = "";
      // cityArrival.value = "";
      // cityDate.value = "";
    });
});
