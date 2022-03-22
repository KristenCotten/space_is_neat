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