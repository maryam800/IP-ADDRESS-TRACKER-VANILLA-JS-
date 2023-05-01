// IP api Information

const baseUrl ='https://geo.ipify.org/api/v2/country?apiKey=at_vhJl8Mhk8VcYhvvG9Asf8yCwbmqfK'
const searchBtn=document.getElementById('searchBtn');
const searchInput=document.getElementById('searchInput')
const ipAddress=document.querySelector('.ip-address p')
const userLocation=document.querySelector('.location p')
const timezone=document.querySelector('.timezone p')
const isp=document.querySelector('.isp p')

//Set Up The Map
let map = L.map('map').setView([24.774265, 46.738586], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const updateMarker=(updatedMarker=[24.5 ,46.738586])=>{
    map.setView(updatedMarker , 13)
    L.marker(updatedMarker).addTo(map)
}
// initlize marker

updateMarker([24.774265, 46.738586])

let url=''
function getData(ip) {
    if(ip== undefined){
        url=`${baseUrl}`
    }
    else{
        url=`${baseUrl}&ipaddress=${ip}`
    }
    axios.get(url )
    .then(response=>{
        let data=response.data
        console.log(data)
        ipAddress.innerHTML=data.ip;
        isp.innerHTML=data.isp
        userLocation.innerHTML=data.location.country+ ", " +data.location.region;
        timezone.innerHTML=data.location.timezone
        updateMarker(data.location.lat,data.location.lng)
        
    })
    .catch(error=>alert("Error Fetching Data"))  
}

searchBtn.addEventListener('click' ,(e)=>{
    e.preventDefault()
    let value=searchInput.value;
    getData(value)
    searchInput.value=''
})