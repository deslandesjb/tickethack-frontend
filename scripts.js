document.querySelector("#todo").addEventListener("click", function () {
  const cityDeparture = document.querySelector("#todo");
  const cityArrival = document.querySelector("#todo");
  const cityDate = document.querySelector("#todo");

  fetch("http://localhost:3000/trips", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(
      { departure: cityDeparture.value },
      { arrival: cityArrival.value },
      { date: cityDate.value }
    ),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.result) {
        cityDeparture.value = "";
        cityArrival.value = "";
        cityDate.value = "";
      }
    });
});

//
