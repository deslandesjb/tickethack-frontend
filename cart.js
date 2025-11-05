const elementsContainer = document.querySelector("#elementsContainer");
function getAllCart() {
  fetch(`http://localhost:3000/cart`)
    .then((response) => response.json())
    .then((data) => {
      if (data.result) {
        for (let i = 0; i < data.trips.length; i++) {
          const fullTime = new Date(data.trips[i].trips[0].date);
          let getHour = fullTime.getHours();
          let getMinutes = fullTime.getMinutes();
          if (getMinutes < 10) {
            getMinutes = "0" + getMinutes;
          }
          // console.log(data.trips[i]);
          // console.log(data.trips[i].trips[0].departure);
          elementsContainer.innerHTML += `
            <div class="elements">
              <p class="roads"><span class="departure">${data.trips[i].trips[0].departure}</span> > <span class="arrival">${data.trips[i].trips[0].arrival}</span></p>
              <div class="time">${getHour}:${getMinutes}</div>
              <div class="price"><span class="priceToShow">${data.trips[i].trips[0].price}</span>€</div>
              <button class="remove" id="${data.trips[i]._id}">x</button>
            </div>
          `;
        }
      } else {
        console.log("empty");
        const myCart = document.querySelector("#myCart");
        if (myCart) {
          myCart.remove();
        }
        elementsContainer.innerHTML += `
          <div id="empty">
            <p>No booking yet.</p>
            <p>Why not plan a trip?</p>
          </div>
        `;
      }
    });
}

getAllCart();
// elementsContainer.addEventListener("click", getAllCart());
