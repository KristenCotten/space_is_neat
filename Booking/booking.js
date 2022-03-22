const form = document.getElementById("booking_form"); //variable for the whole form

form.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(evt) {
  evt.preventDefault(); //pause the submit

  //save input as form variables
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const flight = document.getElementById("flight").value;

  //reset form
  form.reset();

  bookTrip({
    firstName,
    lastName,
    email,
    flight,
  });
}

//get Mars GIF for card
async function getMarsGif() {
  //build api url
  const url = "https://g.tenor.com/v1/search?key=$LIVDSRZULELA&q=mars";

  randNum = Math.floor(Math.random() * 12);

  const results = await fetch(url);
  const data = await results.json();
  const srcUrl = data.results[randNum].media[0].tinygif.url;

  return srcUrl;
}

//function to create a card with the booked trip info
async function bookTrip({ firstName, lastName, email, flight }) {
  const card = document.createElement("div");
  card.setAttribute("class", "card");
  card.setAttribute("style", "width: 18");
  document.getElementById("trip_container").appendChild(card);

  const cardImage = document.createElement("img");
  cardImage.setAttribute("class", "card-img-top");

  const imgUrl = await getMarsGif();
  cardImage.setAttribute("src", imgUrl);

  cardImage.setAttribute("alt", "Mars trip information");
  card.appendChild(cardImage);

  const cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");
  card.appendChild(cardBody);

  const cardFlight = document.createElement("h6");
  cardFlight.setAttribute("class", "card-title");
  cardFlight.innerText = flight;
  cardBody.appendChild(cardFlight);

  const cardPassenger = document.createElement("p");
  cardPassenger.setAttribute("class", "card-text");
  cardPassenger.innerText = `${lastName}, ${firstName}`;
  cardBody.appendChild(cardPassenger);

  const cardEmail = document.createElement("p");
  cardEmail.setAttribute("class", "card-text");
  cardEmail.innerText = email;
  cardBody.appendChild(cardEmail);

  // <button class="btn btn-warning">Edit</button>
  const editBtn = document.createElement("button"); // <button></button
  editBtn.classList.add("btn", "btn-warning");
  editBtn.innerText = "Edit";
  editBtn.addEventListener("click", handleEditCard);
  cardBody.appendChild(editBtn);

  // <button class="btn btn-danger">Delete</button>
  const deleteBtn = document.createElement("button"); // <button></button
  deleteBtn.classList.add("btn", "btn-danger");
  deleteBtn.innerText = "Delete";
  deleteBtn.addEventListener("click", handleDeleteCard);
  cardBody.appendChild(deleteBtn);
}

function handleDeleteCard(evt) {
  evt.target.parentElement.parentElement.remove();
}

function handleEditCard() {}

//Event listener to populate YouTube videos on page load
window.addEventListener("load", loadLaunchVids);

//function to get youtube video from spaceX api
async function getRecentLaunchVids() {
  const url = "https://api.spacexdata.com/v4/launches/past";
  const results = await fetch(url);
  const launches = await results.json();

  //filter by unix date and youtube vid not null
  const recentLaunches = launches.filter(
    (launch) => (launch.date_unix > 1646092800) & (launch.links[5] !== null)
  );
  console.log(recentLaunches); //checking I get array of just launch objects from march 1, 2022

  const vids = recentLaunches.map((vid) => vid.links.webcast);
  console.log(vids);
  return vids;
}

async function loadLaunchVids() {
  const vids = await getRecentLaunchVids();

  //build carousel to hold videos
  const carouselContainer = document.createElement("div");
  carouselContainer.setAttribute("id", "carousel_container");
  carouselContainer.setAttribute("class", "carousel-slide carousel-fade");
  carouselContainer.setAttribute("data-bs-ride", "carousel");

  carouselContainer.innerHTML = `<div class="carousel-inner">
  <div class="carousel-item active">
    <iframe src="${}" class="d-block w-100" alt="..."></iframe>
  </div>
  <div class="carousel-item">
    <iframe src="${}" class="d-block w-100" alt="..."></iframe>
  </div>
  <div class="carousel-item">
    <iframe src="${}" class="d-block w-100" alt="..."></iframe>
  </div>
</div>`;
}

/*
<iframe width="420" height="315"
src="https://www.youtube.com/embed/tgbNymZ7vqY">
</iframe>
*/
