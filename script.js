// event listener
// load - for video
window.addEventListener("load", handleLandingPageLoad)

// event handler
function handleLandingPageLoad() {
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

    // API query search
    const nasaMarsReportUrl = `${NASA_API_ROOT}q=mars report&media_type=video&year_start=2020&year_end=2022`

    // fetch to receive another JSON
    fetch(nasaMarsReportUrl)
        .then(res => res.json())
        .then(data => displayMarsReportVideos(data.collection.items)) // drill down to desired obj
        // items for video include JSON to drill into
    
    // display video runs fetch for multiple JSONs
    function displayMarsReportVideos(marsReportJsons) {       
        // run for first 3
        for (let index = 0; index < 3; index++) {            
            const marsReportJson = marsReportJsons[index];
            // set JSON URL by drilling down to desired obj
            const reportJsonUrl = marsReportJson.href                        
            // run fetch again on JSON URL
            fetch(reportJsonUrl)
                .then(res => res.json())
                .then(data => buildVidDisplay(data[0])) // drill down to video URL
        }
        
        // build video display with video URL
        function buildVidDisplay(marsReportVidUrl) {
            // get container element for populating inside
            const marsReportContainer = document.getElementById("mars_report_container")

            // make the elements and set att
            const video = document.createElement("video")
            video.setAttribute("width", "420")
            video.setAttribute("height", "315")
            video.setAttribute("controls", "")

            const videoSrc = document.createElement("source")
            videoSrc.setAttribute("src", marsReportVidUrl)
            videoSrc.setAttribute("type", "video/mp4")

            // append source to video, video to container
            video.appendChild(videoSrc)
            marsReportContainer.appendChild(video)
        }    
    }
}