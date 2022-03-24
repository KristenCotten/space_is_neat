const form = document.getElementById("booking_form"); //variable for the whole form

form.addEventListener("submit", handleFormSubmit); //event listen for form submit

async function handleFormSubmit(evt) {
  evt.preventDefault(); //pause the submit

  //save input as form variables
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const flight = document.getElementById("flight").value;

  //reset form
  form.reset();

  //call function to book a trip/create a trip card
  await bookTrip({
    firstName,
    lastName,
    email,
    flight,
  });

  //save data to session storage
  sessionStorage.setItem(
    "tripListItems",
    document.getElementById("trip_container").innerHTML
  );
}

//check if we have saved data and update page
let savedData = sessionStorage.getItem("tripListItems");
if (savedData !== null && savedData.length > 0) {
  document.getElementById("trip_container").innerHTML = savedData;
}

//get Mars GIF for card
async function getMarsGif() {
  //build api url
  const url = "https://g.tenor.com/v1/search?key=$LIVDSRZULELA&q=mars";

  randNum = Math.floor(Math.random() * 20); //get random number to be used to select gif

  const results = await fetch(url); //get all the api results
  const data = await results.json(); //parse them into json
  const srcUrl = data.results[randNum].media[0].tinygif.url; //grab the tiny gif url from the gifobj

  return srcUrl; //return just the url
}

//function to create a card with the booked trip info
async function bookTrip({ firstName, lastName, email, flight }) {
  const card = document.createElement("div");
  card.setAttribute("class", "card");
  card.setAttribute("style", "width: 18rem");
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

  sessionStorage.setItem(
    "tripListItems",
    document.getElementById("trip_container").innerHTML
  );
}

function handleEditCard(evt) {
  //ask user for new info to change
  const newFirstName = prompt("Enter passenger's first name");
  const newLastName = prompt("Enter passenger's last name");
  const newEmail = prompt("Enter passenger's email address");

  const cardBody = evt.target.parentElement;

  if (
    newLastName !== null &&
    newLastName.length > 0 &&
    newFirstName !== null &&
    newFirstName.length > 0
  ) {
    const passengerElt = cardBody.children[1];
    passengerElt.innerText = `${newLastName}, ${newFirstName}`;
  }

  if (newEmail !== null && newEmail.length > 0) {
    const emailElt = cardBody.children[2];
    emailElt.innerText = newEmail;
  }

  sessionStorage.setItem(
    "tripListItems",
    document.getElementById("trip_container").innerHTML
  );
}

//Event listener to populate YouTube videos on page load
window.addEventListener("load", loadLaunchVids);

//function to get youtube video from spaceX api
async function getRecentLaunchVids() {
  const url = "https://api.spacexdata.com/v4/launches/past";
  const results = await fetch(url);
  const launches = await results.json();

  //filter by unix date and youtube vid not null
  const recentLaunches = launches.filter(
    (launch) => launch.date_unix > 1646092800 && launch.links[5] !== null
  );
  // console.log(recentLaunches); //checking I get array of just launch objects from march 1, 2022

  const vids = recentLaunches.map((vid) => vid.links.youtube_id);
  // console.log(vids); //checking I get youtube links in an array
  return vids;
}

async function loadLaunchVids() {
  const vids = await getRecentLaunchVids();
  //creating Youtube embed links needed for iframe
  const video1 = "https://www.youtube.com/embed/" + vids[0];
  const video2 = "https://www.youtube.com/embed/" + vids[1];
  const video3 = "https://www.youtube.com/embed/" + vids[2];

  //build space to hold videos
  const launchVidContainer = document.getElementById("launch_vid_container");

  //creating videos/iframes in the container
  launchVidContainer.innerHTML = `
   <div class="you_tube_vid_container">
   <iframe class="responsive_iframe" width="420" height="315" src="${video1}"></iframe>
   </div>
   <div class="you_tube_vid_container">
   <iframe class="responsive_iframe" width="420" height="315" src="${video2}"></iframe>
  </div>
  <div class="you_tube_vid_container">
  <iframe class="responsive_iframe" width="420" height="315" src="${video3}"></iframe>
  </div>
  `;
}
