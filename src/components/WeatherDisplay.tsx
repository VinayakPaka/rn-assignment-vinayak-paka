import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WeatherData } from '@/src/api/weather';

interface WeatherDisplayProps {
  weather: WeatherData;
}

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather }) => {
  // Get weather icon based on condition
  const getWeatherIcon = (condition: string): string => {
    const icons: Record<string, string> = {
      'Clear': '☀️',
      'Mainly Clear': '🌤️',
      'Partly Cloudy': '⛅',
      'Overcast': '☁️',
      'Foggy': '🌫️',
      'Drizzle': '🌦️',
      'Rain': '🌧️',
      'Snow': '❄️',
      'Rain Showers': '🌧️',
      'Snow Showers': '🌨️',
      'Thunderstorm': '⛈️',
    };
    return icons[condition] || '🌡️';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{getWeatherIcon(weather.condition)}</Text>
      <Text style={styles.city}>{weather.city}</Text>
      <Text style={styles.temperature}>{weather.temperature}°C</Text>
      <Text style={styles.condition}>{weather.condition}</Text>
      <Text style={styles.description}>{weather.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  icon: {
    fontSize: 80,
    marginBottom: 16,
  },
  city: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
    textAlign: 'center',
  },
  temperature: {
    fontSize: 64,
    fontWeight: '300',
    color: '#2563eb',
    marginBottom: 8,
  },
  condition: {
    fontSize: 24,
    fontWeight: '600',
    color: '#4b5563',
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
});
