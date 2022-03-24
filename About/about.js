const NASA_API_KEY = "OH7EcsbJosWOagiPImRUGXITcyoUJb5pDczobR4d"
const NASA_API_ROOT = "https://images-api.nasa.gov/search?"
/*
Query Params

Name Type Description
q (optional) string Free text search terms to compare to all indexed metadata.
center (optional) string NASA center which published the media.
description
(optional)
string Terms to search for in “Description” fields.
description_508
(optional)
string Terms to search for in “508 Description” fields.
keywords (optional) string Terms to search for in “Keywords” fields. Separate multiple values with commas.
location (optional) string Terms to search for in “Location” fields.
media_type
(optional)
string Media types to restrict the search to. Available types: [“image”, “audio”]. Separate multiple
values with commas.
nasa_id (optional) string The media asset’s NASA ID.
page (optional) integer Page number, starting at 1, of results to get.
photographer
(optional)
string The primary photographer’s name.
secondary_creator
(optional)
string A secondary photographer/videographer’s name.
title (optional) string Terms to search for in “Title” fields.
year_start (optional) string The start year for results. Format: YYYY.
year_end (optional) string The end year for results. Format: YYYY.
*/

const imgContainer = document.getElementById("image_carousel_container")

const audioContainer = document.getElementById("audio_carousel_container")

window.addEventListener("load", handlePageLoad)

const nasaImagesUrl = `${NASA_API_ROOT}q=mars rover&media_type=image&year_start=2022&year_end=2022`

const nasaAudioUrl = `${NASA_API_ROOT}q=mars&media_type=audio&year_start=2021&year_end=2022`

function handlePageLoad() {
    getNasaItems(nasaImagesUrl, displayImages)
    getNasaItems(nasaAudioUrl, displayAudio)

    function getNasaItems(url, displayFunction) {
        fetch(url)
            .then(res => res.json())
            .then(data => displayFunction(data.collection.items)) 
    }

    function displayImages(nasaImages) {
        for(let nasaImage of nasaImages) {
            const imgUrl = nasaImage.links[0].href
            
            const imgDiv = document.createElement("div")
            imgDiv.classList.add("carousel-item", "card-body")
            const img = document.createElement("img")
            img.setAttribute("src", imgUrl)
            img.setAttribute("class", "contain")
            imgDiv.appendChild(img)
            imgContainer.appendChild(imgDiv)
        }
        imgContainer.firstElementChild.classList.add("active")
    }

    function displayAudio(nasaAudioJsons) {
        for(let nasaAudioJson of nasaAudioJsons) {
            const audioTitle = nasaAudioJson.data[0].title
            const audioJsonUrl = nasaAudioJson.href
            fetch(audioJsonUrl)
                .then(res => res.json())
                .then(data => buildDisplay(data[0], audioTitle))            
        }
        function buildDisplay(nasaAudioUrl, nasaAudioTitle) {
            const audioHeader = document.createElement("h5")
            audioHeader.classList.add("mt-5", "text-center")
            audioHeader.innerText = nasaAudioTitle             
            const audioDiv = document.createElement("div")
            audioDiv.classList.add("carousel-item", "card-body")
            const audio = document.createElement("audio")
            audio.setAttribute("controls", "")
            const audioSource = document.createElement("source")
            audioSource.setAttribute("src", nasaAudioUrl)
            audioSource.setAttribute("type", "audio/mpeg")            
            audio.appendChild(audioSource)
            audioDiv.appendChild(audio)
            audioDiv.appendChild(audioHeader)
            audioContainer.appendChild(audioDiv)            
            
            audioContainer.firstElementChild.classList.add("active")
        }
    }
}












const randomMarsFacts = [
    "https://mars.nasa.gov/files/mep/facts/Planet-Mars-Facts.jpg", 
    "https://mars.nasa.gov/files/mep/facts/Moons-Mars-Facts.jpg", 
    "https://mars.nasa.gov/files/mep/facts/Size-Mars-Facts.gif", 
    "https://mars.nasa.gov/files/mep/facts/Weight-Mars-Facts.gif", 
    "https://mars.nasa.gov/files/mep/facts/Distance-Mars-Facts.gif", 
    "https://mars.nasa.gov/files/mep/facts/Mars-Year-in-Earth-Days.gif", 
    "https://mars.nasa.gov/files/mep/facts/Volume-Mars-Facts.gif", 
    "https://mars.nasa.gov/files/mep/facts/Temperature-Mars-Facts.jpg", 
    "https://mars.nasa.gov/files/mep/facts/Structure-Mars-Facts.gif", 
    "https://mars.nasa.gov/files/mep/facts/Mass-Mars-Facts.gif", 
    "https://mars.nasa.gov/files/mep/facts/Gravity-Mars-Facts.gif", 
    "https://mars.nasa.gov/files/mep/facts/Atmosphere-Mars-Facts.gif"
]

document.getElementById("random_fact_btn").addEventListener("click", generateRandomFact)

function generateRandomFact() {
    document.getElementById("random_facts_container").innerHTML = ""
    const factImg = document.createElement("img")
    const factImgUrl = pickRandomFact(randomMarsFacts)
    factImg.setAttribute("class", "img-fluid")
    factImg.setAttribute("src", factImgUrl)
    document.getElementById("random_facts_container").appendChild(factImg)
}

function pickRandomFact(facts) {
    const randIndex = Math.floor(Math.random() * randomMarsFacts.length)
    const randFact = facts[randIndex]
    return randFact
}