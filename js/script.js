
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
		
		//on récupère les données par classe
	  tabMain = document.getElementsByClassName('mainHTML');
      tabDescription = document.getElementsByClassName('descriptionHTML');
      tabIcon = document.getElementsByClassName('iconHTML');
      tabTemp = document.getElementsByClassName('tempHTML');
		
		
		//on fait une boucle pour 3 jours 
	  for(let jour = 0; jour<3; jour++)
	  {
		tabMain[jour].innerHTML = data.list[jour + 1].weather[0].main;
        tabDescription[jour].innerHTML = data.list[jour + 1].weather[0].description;
        tabIcon[jour].innerHTML = apiWeather.getHTMLElementFromIcon(data.list[jour + 1].weather[0].icon);
        myTemp = data.list[jour + 1].temp.day;
        tabTemp[jour].innerHTML = `${myTemp}°C`;
		
	  }
	})
    .catch(function(error) {
      // Affiche une erreur
      console.error(error);
    });
}
