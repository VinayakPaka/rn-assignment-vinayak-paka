import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { SearchInput } from '@/src/components/SearchInput';
import { WeatherCard } from '@/src/components/WeatherCard';
import { ErrorMessage } from '@/src/components/ErrorMessage';
import { fetchWeather, WeatherData } from '@/src/api/weather';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setError(null);
    setWeather(null);

    try {
      const weatherData = await fetchWeather(city);
      setWeather(weatherData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#E8EAF6', '#F5F5F5']}
        style={styles.gradient}
      >
        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Weather Lookup</Text>
            <Text style={styles.subtitle}>Get current weather for any city</Text>
          </View>

          <View style={styles.searchContainer}>
            <SearchInput onSearch={handleSearch} isLoading={isLoading} />
          </View>

          {error && <ErrorMessage message={error} />}
          
          {weather && <WeatherCard weather={weather} />}

          {!weather && !error && !isLoading && (
            <View style={styles.placeholderContainer}>
              <Text style={styles.placeholderIcon}>🔍</Text>
              <Text style={styles.placeholderText}>
                Search for a city to see the beautiful weather card
              </Text>
            </View>
          )}
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  searchContainer: {
    marginBottom: 20,
  },
  placeholderContainer: {
    alignItems: 'center',
    marginTop: 80,
  },
  placeholderIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  placeholderText: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});
