function App() {
    let _weatherAppStatesService,
        _weatherAppElement,
        _currentWeatherAppData;

    function init() {
        console.log('1 Initialize the application');
        console.log('1.1 Create a WeatherAppService object');
        _weatherAppStatesService = new WeatherAppService();
        console.log('1.2 Cache the active DOM-elements');
        _weatherAppElement = document.querySelector('.weather_container');
        console.log('1.3 Load the weather service via _weatherAppStatesService object');
        
        loadWeatherAppData();
        // We moeten niet meer updateWeatherAppUI doen omdat dit al staat in loadWeatherAppData();

    }

    function loadWeatherAppData() {
        _weatherAppStatesService.loadWeatherApp()
            .then(function(data) {
                console.log('2.1 Save the loaded data in _currentWeatherAppData');
                _currentWeatherAppData = data;
                // Het object
                console.log(_currentWeatherAppData);
                console.log('2.2 Update weather app user interface');
                console.log(_currentWeatherAppData); 
                // Als we herladen dan komt er gewoon een random email op
                //console.log(__currentWeatherAppData.location.city);
                updateWeatherAppUI();
            
            })
            .catch(function(reject) {
                console.log('Something went wrong!');
            });
    }

    let tempStr = '';

    function updateWeatherAppUI() {
       // if(_tinderAppElement != null && _tinderAppElement != undefined && _currentTinderAppData != null && _currentTinderAppData != undefined && _currentTinderAppData.length > 0) {
            
            console.log('3.1 We get the data on the screen!');

            
            // Anders is het veel te langdradig om alles zo uit te schrijven
            _currentWeatherAppData.query.results.channel.forEach(function(element, index) {

                let temperature = element.item.condition.temp;
                


                tempStr += `
                
                
                <div class="container">
                <div class=row sm-5>
                    <div class="col-sm-6">
                        <div class="card">
                            <div class="card-body" style="background-color:#51A7BD">
                                <h4 class="card-title">${element.location.city}, ${element.location.country}</h4>
                                <div class="card-text">Temperature : ${temperature} °C</div>
                                <div class="card-text">Sunrise: ${element.astronomy.sunrise} </div>
                                <div class="card-text">Sunset: ${element.astronomy.sunset} </div>
                                <input type="text" class="form-control search_input" name="search_input" placeholder="Zoek een stad">
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="card">
                            <div class="backgroundColorId_${createColors(temperature)}">
                                <div class="status_text">Status of weather</div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                
                `;

            }, this); 

            _weatherAppElement.innerHTML = tempStr;
        
    }

    function createColors(temperature) {

        color = '';

        if (temperature >= 30) {
            return color = "red";
        }  else if (temperature >= 20 && temperature < 30) {
            return color = "orange";
        } else if (temperature >= 10 && temperature < 20) {
            return color = "blue";
        } else {
            return color = "grey";
        }

        _weatherAppElement.innerHTML += color
}
 

    return {
        init: init
    }

};

// load event window object
// all resources are loaded
window.addEventListener('load', function(ev) {
    // Make new instance of app
    const app = new App();
    app.init();
});