import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { WeatherData } from '@/src/api/weather';
import { Ionicons } from '@expo/vector-icons';

interface WeatherCardProps {
  weather: WeatherData;
}

const { width } = Dimensions.get('window');

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  // Get gradient colors based on weather condition
  const getGradientColors = (condition: string): string[] => {
    const gradients: Record<string, string[]> = {
      'Clear': ['#5374E7', '#77B9F5'],
      'Mainly Clear': ['#5374E7', '#77B9F5'],
      'Partly Cloudy': ['#54717A', '#9AB8C5'],
      'Overcast': ['#57575D', '#989AA2'],
      'Foggy': ['#57575D', '#989AA2'],
      'Drizzle': ['#5374E7', '#6C91C2'],
      'Rain': ['#4B6B9B', '#6C91C2'],
      'Snow': ['#A3D5F0', '#E0F5FF'],
      'Rain Showers': ['#4B6B9B', '#6C91C2'],
      'Snow Showers': ['#A3D5F0', '#E0F5FF'],
      'Thunderstorm': ['#494F6B', '#6C7AA1'],
    };
    return gradients[condition] || ['#5374E7', '#77B9F5'];
  };

  // Get weather icon based on condition
  const getWeatherIcon = (condition: string) => {
    const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
      'Clear': 'sunny',
      'Mainly Clear': 'partly-sunny',
      'Partly Cloudy': 'partly-sunny',
      'Overcast': 'cloudy',
      'Foggy': 'cloud',
      'Drizzle': 'rainy',
      'Rain': 'rainy',
      'Snow': 'snow',
      'Rain Showers': 'rainy',
      'Snow Showers': 'snow',
      'Thunderstorm': 'thunderstorm',
    };
    return icons[condition] || 'sunny';
  };

  // Get simplified weather icon for hourly forecast
  const getSimpleWeatherIcon = (code: number) => {
    if (code === 0 || code === 1) return 'sunny';
    if (code === 2 || code === 3) return 'partly-sunny';
    if (code >= 45 && code <= 48) return 'cloud';
    if (code >= 51 && code <= 67) return 'rainy';
    if (code >= 71 && code <= 86) return 'snow';
    if (code >= 95) return 'thunderstorm';
    return 'sunny';
  };

  const gradientColors = getGradientColors(weather.condition);
  const cityName = weather.city.split(',')[0]; // Get just the city name

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={gradientColors}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.locationContainer}>
            <Ionicons name="location" size={16} color="#fff" />
            <Text style={styles.cityName}>{cityName}</Text>
          </View>
          <Ionicons name="menu" size={24} color="#fff" />
        </View>

        {/* Main Weather Display */}
        <View style={styles.mainWeather}>
          <View style={styles.temperatureContainer}>
            <Text style={styles.temperature}>{weather.temperature}</Text>
            <Text style={styles.degree}>°</Text>
          </View>
          <Text style={styles.sunny}>It's Sunny</Text>
        </View>

        {/* Weather Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.conditionText}>{weather.condition}</Text>
          <Text style={styles.descriptionText}>{weather.description}</Text>
        </View>

        {/* Weather Icon - Large */}
        <View style={styles.iconContainer}>
          <Ionicons 
            name={getWeatherIcon(weather.condition)} 
            size={120} 
            color="rgba(255, 255, 255, 0.9)" 
          />
        </View>

        {/* Illustrated Background Placeholder */}
        <View style={styles.illustrationContainer}>
          {/* This would be where the illustrated landscape goes */}
          <View style={styles.illustrationPlaceholder} />
        </View>

        {/* Weather Today Card */}
        <View style={styles.todayCard}>
          <Text style={styles.todayTitle}>Weather Today</Text>
          <View style={styles.hourlyContainer}>
            {weather.hourlyForecast?.map((hour, index) => (
              <View key={index} style={styles.hourlyItem}>
                <Ionicons 
                  name={getSimpleWeatherIcon(hour.weatherCode)} 
                  size={32} 
                  color="#FFB800" 
                />
                <Text style={styles.hourlyTime}>{hour.time}</Text>
                <Text style={styles.hourlyTemp}>{hour.temperature}</Text>
              </View>
            ))}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width - 40,
    height: 620,
    alignSelf: 'center',
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    marginVertical: 20,
  },
  gradient: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cityName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  mainWeather: {
    marginBottom: 10,
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  conditionText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  descriptionText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    fontWeight: '400',
  },
  temperatureContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  temperature: {
    color: '#fff',
    fontSize: 120,
    fontWeight: '200',
    lineHeight: 120,
  },
  degree: {
    color: '#fff',
    fontSize: 48,
    fontWeight: '200',
    marginTop: 10,
  },
  sunny: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '300',
    marginTop: 10,
    transform: [{ rotate: '90deg' }],
    position: 'absolute',
    right: -80,
    top: 40,
  },
  iconContainer: {
    position: 'absolute',
    right: 40,
    top: 180,
    opacity: 0.8,
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  illustrationPlaceholder: {
    height: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    marginBottom: 15,
  },
  todayCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    paddingBottom: 16,
  },
  todayTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
    textAlign: 'center',
  },
  hourlyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  hourlyItem: {
    alignItems: 'center',
    gap: 8,
  },
  hourlyTime: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
  },
  hourlyTemp: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
});
