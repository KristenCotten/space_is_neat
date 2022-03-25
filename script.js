const NASA_API_KEY = "OH7EcsbJosWOagiPImRUGXITcyoUJb5pDczobR4d"
const NASA_API_ROOT = "https://images-api.nasa.gov/search?"

const marsReportContainer = document.getElementById("mars_report_container")

window.addEventListener("load", handleLandingPageLoad)

const nasaMarsReportUrl = `${NASA_API_ROOT}q=mars report&media_type=video&year_start=2020&year_end=2022`

function handleLandingPageLoad() {
    fetch(nasaMarsReportUrl)
        .then(res => res.json())
        .then(data => displayMarsReportVideos(data.collection.items))
    

    function displayMarsReportVideos(marsReportJsons) {       
        // for(let marsReportJson of marsReportJsons) {
        //     const reportJsonUrl = marsReportJson.href
        // }
        for (let index = 0; index < 3; index++) {
            const marsReportJson = marsReportJsons[index];
            //console.log(marsReportJson);
            const reportJsonUrl = marsReportJson.href
            //console.log(reportJsonUrl);
            
            
            fetch(reportJsonUrl)
                .then(res => res.json())
                .then(data => buildVidDisplay(data[0]))
        }
        function buildVidDisplay(marsReportVidUrl) {
            console.log(marsReportVidUrl);
            const video = document.createElement("video")
            video.setAttribute("width", "420")
            video.setAttribute("height", "315")
            video.setAttribute("controls", "")
            const videoSrc = document.createElement("source")
            videoSrc.setAttribute("src", marsReportVidUrl)
            videoSrc.setAttribute("type", "video/mp4")
            video.appendChild(videoSrc)
            marsReportContainer.appendChild(video)
        }

        

        
    }
}