const apiId="fd9dc91624c151ec1c24527b60d2f050";
const url =`https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;
const search=document.querySelector(".search-bar");
const searchBtn=document.querySelector(".search button");
icon = document.querySelector(".weather-img");
try{

    function resetPlaceholder() {
        search.placeholder = "Enter city name";
    }
    
       async function getweather(city){
        const responce = await fetch(url +city +`&appid=${apiId}`);

        if(responce.status==404){
            search.placeholder = "City not found";
            // alert("City not found");
            document.querySelector(".weather").style.display = "none";
            //reset console
            setTimeout(() => {resetPlaceholder() + console.log("placeholder reset");}, 2000); 
            
            
        }
        else{
            let data = await responce.json();
            console.log(data);
            document.querySelector(".city"  ).innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "&deg;C";
            document.querySelector(".humidity"  ).innerHTML = Math.round(data.main.humidity) +"%" ;
            document.querySelector(".wind"  ).innerHTML = data.wind.speed + "km/h";
    
            console.log(data.weather[0].main);
            if(data.weather[0].main=="Clouds"){ 
                icon.src ="/weather-app-img/images/clouds.png";
            }
            else if(data.weather[0].main=="Clear"){
                icon.src ="/weather-app-img/images/clear.png";
            }
            else if(data.weather[0].main=="Rain"){
                icon.src ="/weather-app-img/images/rain.png";
            }
            else if(data.weather[0].main=="Snow"){
                icon.src ="/weather-app-img/images/snow.png";
            }
            else if(data.weather[0].main=="Drizzle"){
                icon.src ="/weather-app-img/images/drizzle.png";
            }
            document.querySelector(".weather").style.display = "block";
        }
        
     }
        
     function handleSearch() {
        getweather(search.value);
        console.log(search.value);
        search.value = "";
    }
    
    searchBtn.addEventListener("click", handleSearch);
    
    search.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    });
    
      
        
}
catch(error){
    console.log(error);
}


