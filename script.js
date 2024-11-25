const API_KEY = "4c8f4d0e24224b74a2b102657242511"; // Your API key

// Function to fetch weather data
async function fetchWeather() {
    const location = document.getElementById("location").value;
    const weatherInfoDiv = document.getElementById("weather-info");
    
    // Check if location is entered
    if (!location) {
        alert("Please enter a location!");
        weatherInfoDiv.style.display = "none"; // Hide weather info if location is missing
        return;
    }

    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Unable to fetch weather data. Please check the location and try again.");
        }
        
        const data = await response.json();
        displayWeather(data);
        weatherInfoDiv.style.display = "block";
    } catch (error) {
        alert("Error: " + error.message);
        weatherInfoDiv.style.display = "none"; // Hide weather info if there is an error
    }
}

// Function to display weather data
function displayWeather(data) {
    // Display weather information
    document.getElementById("location-name").innerText = `${data.location.name}, ${data.location.country}`;
    document.getElementById("temperature").innerText = data.current.temp_c;
    document.getElementById("condition").innerText = data.current.condition.text;
    document.getElementById("humidity").innerText = data.current.humidity;

    updateBackground(data.current.condition.text);
}

// Function to update the background based on weather condition (without images)
function updateBackground(condition) {
    const body = document.body;

    // Reset the background image and color to default
    body.style.backgroundImage = "none";
    body.style.backgroundColor = "#f0f0f0"; // Light gray background or choose any color

    body.style.backgroundSize = "cover";
    body.style.backgroundRepeat = "no-repeat";
}
