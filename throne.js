(function($) {

    $('document').ready(function() {

        // Loader
        gsap.to('.loader', {
            opacity: 0,
            duration: 0.3,
            delay: 1.2,
            onComplete: function() {
                gsap.to('.loader', {
                    display: 'none'
                });
            }
        });

        $('header').load('navbar.html');

        // Popup
        gsap.to('.popup', {
            display: 'block',
            delay: 2,
            onComplete: function() {
                gsap.to('.popup', {
                    opacity: 1,
                    duration: 0.3,
                });
            }
        });

        // Close Popup  
        $('.close-popup').on('click', function() {
            gsap.to('.popup', {
                opacity: 0,
                duration: 0.2,
                onComplete: function() {
                    gsap.to('.popup', {
                        display: 'none'
                    });
                }
            });
        });

        // WMO Weather interpretation codes (WW)
        // Code	Description:

        // 0	        Clear sky
        // 1, 2, 3	    Mainly clear, partly cloudy, and overcast
        // 45, 48	    Fog and depositing rime fog
        // 51, 53, 55	Drizzle: Light, moderate, and dense intensity
        // 56, 57	    Freezing Drizzle: Light and dense intensity
        // 61, 63, 65	Rain: Slight, moderate and heavy intensity
        // 66, 67	    Freezing Rain: Light and heavy intensity
        // 71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
        // 77	        Snow grains
        // 80, 81, 82	Rain showers: Slight, moderate, and violent
        // 85, 86	    Snow showers slight and heavy
        // 95 *	        Thunderstorm: Slight or moderate
        // 96, 99 *	    Thunderstorm with slight and heavy hail


        const options = {method: 'GET', headers: {accept: 'application/json'}};

        fetch('https://api.open-meteo.com/v1/forecast?latitude=34.052235&longitude=-118.243683&temperature_unit=fahrenheit&current_weather=true&weathercode=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m', options)
        .then(response => response.json())
        .then((response) => {

            var weatherCode = response.current_weather.weathercode;
            var currentTemp = response.current_weather.temperature;
            
          
            var currentRead = 'Reading...';
            
            if (weatherCode == 0) {
                var currentRead = 'Clear';
            } else if (weatherCode == 1 || weatherCode == 2 || weatherCode == 3) {
                var currentRead = 'Partly Cloudy';
            } else if (weatherCode == 45 || weatherCode == 48) {
                var currentRead = 'Foggy';
            } else if (weatherCode == 51 || weatherCode == 53 || weatherCode == 55) {
                var currentRead = 'Drizzle';
            } else if (weatherCode == 56 || weatherCode == 57) {
                var currentRead = 'Freezing';
            } else if (weatherCode == 61 || weatherCode == 63 || weatherCode == 65) {
                var currentRead = 'Rain';
            } else if (weatherCode == 66 || weatherCode == 67) {
                var currentRead = 'Freezing Rain';
            } else if (weatherCode == 71 || weatherCode == 73 || weatherCode == 75) {
                var currentRead = 'Snowing';
            } else if (weatherCode == 77) {
                var currentRead = 'Snow';
            } else if (weatherCode == 80 || weatherCode == 81 || weatherCode == 82) {
                var currentRead = 'Rain Showers';
            } else if (weatherCode == 85 || weatherCode == 86) {
                var currentRead = 'Snow Showers';
            } else if (weatherCode == 95) {
                var currentRead = 'Thunder Storms';
            } else if (weatherCode == 96 || weatherCode == 99) {
                currentRead == 'Hail';
            }

            console.log(response);
            console.log(weatherCode);
            console.log(currentRead);
            $('.current-weather').html(currentRead);
            $('.current-temperature').html(currentTemp);
        })
        .catch(err => console.error(err));

        

    });

})(jQuery);


