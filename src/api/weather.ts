// Weather API service using Open-Meteo (free, no API key required)

export interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  description: string;
  hourlyForecast?: Array<{
    time: string;
    temperature: number;
    weatherCode: number;
  }>;
}

interface GeocodingResult {
  results?: Array<{
    name: string;
    latitude: number;
    longitude: number;
    country: string;
    admin1?: string; // State/province name
    admin2?: string; // County/district name
  }>;
}

interface WeatherResponse {
  current: {
    temperature_2m: number;
    weather_code: number;
  };
  hourly?: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
  };
}

// Weather code descriptions based on WMO Weather interpretation codes
const getWeatherDescription = (code: number): { condition: string; description: string } => {
  const weatherCodes: Record<number, { condition: string; description: string }> = {
    0: { condition: 'Clear', description: 'Clear sky' },
    1: { condition: 'Mainly Clear', description: 'Mainly clear' },
    2: { condition: 'Partly Cloudy', description: 'Partly cloudy' },
    3: { condition: 'Overcast', description: 'Overcast' },
    45: { condition: 'Foggy', description: 'Fog' },
    48: { condition: 'Foggy', description: 'Depositing rime fog' },
    51: { condition: 'Drizzle', description: 'Light drizzle' },
    53: { condition: 'Drizzle', description: 'Moderate drizzle' },
    55: { condition: 'Drizzle', description: 'Dense drizzle' },
    61: { condition: 'Rain', description: 'Slight rain' },
    63: { condition: 'Rain', description: 'Moderate rain' },
    65: { condition: 'Rain', description: 'Heavy rain' },
    71: { condition: 'Snow', description: 'Slight snow fall' },
    73: { condition: 'Snow', description: 'Moderate snow fall' },
    75: { condition: 'Snow', description: 'Heavy snow fall' },
    77: { condition: 'Snow', description: 'Snow grains' },
    80: { condition: 'Rain Showers', description: 'Slight rain showers' },
    81: { condition: 'Rain Showers', description: 'Moderate rain showers' },
    82: { condition: 'Rain Showers', description: 'Violent rain showers' },
    85: { condition: 'Snow Showers', description: 'Slight snow showers' },
    86: { condition: 'Snow Showers', description: 'Heavy snow showers' },
    95: { condition: 'Thunderstorm', description: 'Thunderstorm' },
    96: { condition: 'Thunderstorm', description: 'Thunderstorm with slight hail' },
    99: { condition: 'Thunderstorm', description: 'Thunderstorm with heavy hail' },
  };

  return weatherCodes[code] || { condition: 'Unknown', description: 'Unknown conditions' };
};

export const fetchWeather = async (cityName: string): Promise<WeatherData> => {
  if (!cityName.trim()) {
    throw new Error('Please enter a city name');
  }

  try {
    // Step 1: Geocode the city name to get coordinates
    // Fetch multiple results to find the best match
    const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      cityName
    )}&count=5&language=en&format=json`;

    const geocodeResponse = await fetch(geocodeUrl);
    if (!geocodeResponse.ok) {
      throw new Error('Failed to search for location');
    }

    const geocodeData: GeocodingResult = await geocodeResponse.json();

    if (!geocodeData.results || geocodeData.results.length === 0) {
      throw new Error(
        'Location not found. Please try:\n• A city name (e.g., "Mumbai", "Shimla")\n• Check spelling\n• Try a major city in the region'
      );
    }

    // Get the first result (usually the most relevant)
    const { name, latitude, longitude, country, admin1 } = geocodeData.results[0];

    // Step 2: Fetch weather data using coordinates (including hourly forecast)
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&hourly=temperature_2m,weather_code&temperature_unit=celsius&forecast_days=1`;

    const weatherResponse = await fetch(weatherUrl);
    if (!weatherResponse.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const weatherData: WeatherResponse = await weatherResponse.json();

    const { condition, description } = getWeatherDescription(
      weatherData.current.weather_code
    );

    // Build display name with state/province if available
    let displayCity = name;
    if (admin1 && admin1 !== name) {
      displayCity = `${name}, ${admin1}`;
    }
    if (country) {
      displayCity = `${displayCity}, ${country}`;
    }

    // Process hourly forecast (get next 4 hours)
    const hourlyForecast = weatherData.hourly
      ? weatherData.hourly.time.slice(0, 4).map((time, index) => {
          const hour = new Date(time).getHours();
          const period = hour >= 12 ? 'PM' : 'AM';
          const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
          
          return {
            time: `${displayHour.toString().padStart(2, '0')}:00 ${period}`,
            temperature: Math.round(weatherData.hourly!.temperature_2m[index]),
            weatherCode: weatherData.hourly!.weather_code[index],
          };
        })
      : [];

    return {
      city: displayCity,
      temperature: Math.round(weatherData.current.temperature_2m),
      condition,
      description,
      hourlyForecast,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred. Please try again.');
  }
};
