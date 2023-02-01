const searchElement=document.getElementById("searchElement");
const hideen = document.getElementById("hideen");
const error = document.getElementById("error");
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  }
  
  function showPosition(position) {
    fetchTimeZone(position.coords.latitude, position.coords.longitude,0);
  }
  function fetchTimeZone(lat,lon){
    fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=fb51aeb813fc45a09db3139d429de128`)
    .then(resp => resp.json())
    .then((result) => {
        yourTimeZone(result.results[0],lat,lon);
    });
}

function searchTimeZone(data){
    const name = document.getElementById("name-l")
    const lati = document.getElementById("lati-l")
    const longi = document.getElementById("longi-l")
    const offSTD = document.getElementById("offSTD-l")
    const offSTDsec = document.getElementById("offSTDsec-l")
    const offDST = document.getElementById("offDST-l")
    const offDSTsec = document.getElementById("offDSTsec-l")
    const country = document.getElementById("country-l")
    const city = document.getElementById("city-l")
    name.textContent = data.timezone.name;
    lati.textContent = data.lat;
    longi.textContent = data.lon;
    offSTD.textContent = data.timezone.offset_DST;
    offSTDsec.textContent = data.timezone.offset_STD_seconds;
    offDST.textContent = data.timezone.offset_DST;
    offDSTsec.textContent = data.timezone.offset_DST_seconds;
    country.textContent = data.country;
    city.textContent = data.city;
    function search(){
        const address = searchElement.value;
    
        fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=bbd0901e47e149958f85c0bdd765359b`)
        .then(resp => resp.json())
        .then((geocodingResult) => {
            if(geocodingResult.features.length > 0){
                error.classList.add("hide")
                hideen.classList.remove("hide")
                searchTimeZone(geocodingResult.features[0].properties)
            }else{
                hideen.classList.add("hide")
                error.classList.remove("hide")
            }
        });
        return false;
    }
    function yourTimeZone(data,lat,lon){
        const name = document.getElementById("name")
        const lati = document.getElementById("lati")
        const longi = document.getElementById("longi")
        const offSTD = document.getElementById("offSTD")
        const offSTDsec = document.getElementById("offSTDsec")
        const offDST = document.getElementById("offDST")
        const offDSTsec = document.getElementById("offDSTsec")
        const country = document.getElementById("country")
        const city = document.getElementById("city")
        const post = document.getElementById("post")
        name.textContent = data.timezone.name;
        lati.textContent = lat;
        longi.textContent = lon;
        offSTD.textContent = data.timezone.offset_DST;
        offSTDsec.textContent = data.timezone.offset_STD_seconds;
        offDST.textContent = data.timezone.offset_DST;
        offDSTsec.textContent = data.timezone.offset_DST_seconds;
        country.textContent = data.country;
        city.textContent = data.city;
        post.textContent = data.postcode;
    }
    document.addEventListener("DOMContentLoaded",getLocation);

