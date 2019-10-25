
// Fonction appelée lors du click du bouton
function start() {
	
	monNomVille = document.getElementById("city-input").value;
	
  // Création de l'objet apiWeather
	if(monNomVille != ''){
		apiWeather = new API_WEATHER(monNomVille);
	}
	else{
		apiWeather = new API_WEATHER();
	}
  // Appel de la fonction fetchTodayForecast

  apiWeather
    .fetchTodayForecast()
    .then(function(response) {
      // Récupère la donnée d'une API
      const data = response.data;

      // On récupère l'information principal
      const main = data.weather[0].main;
      const description = data.weather[0].description;
      const temp = data.main.temp;
      const icon = apiWeather.getHTMLElementFromIcon(data.weather[0].icon);

      // Modifier le DOM
      document.getElementById('today-forecast-main').innerHTML = main;
      document.getElementById('today-forecast-more-info').innerHTML = description;
      document.getElementById('icon-weather-container').innerHTML = icon;
      document.getElementById('today-forecast-temp').innerHTML = `${temp}°C`;
      
    })
	.catch(function(error) {
      // Affiche une erreur
      console.error(error);
    });
	
	apiWeather
	.getThreeDayForecast()
	.then (function(response) {
	  // Récupère la donnée d'une API
      const data = response.data;
		
		
	  for(let jour = 0; jour<3; jour++)
	  {
		const main = data.weather[jour].main;
		const description = data.weather[jour].description;
		const temp = data.main.temp;
		const icon = apiWeather.getHTMLElementFromIcon(data.weather[jour].icon);
	  
		document.getElementById(`${jour+1}-forecast-main`).innerHTML = main;
		document.getElementById(`${jour+1}-forecast-more-info`).innerHTML = description;
		document.getElementById(`${jour+1}-icon-weather-container`).innerHTML = icon;
		document.getElementById(`${jour+1}-forecast-temp`).innerHTML = `${temp}°C`; 
		
	  }
	})
    .catch(function(error) {
      // Affiche une erreur
      console.error(error);
    });
}
