# Weather Lookup App 🌤️

**Assignment B — Weather Lookup (API Fetch)**  
A React Native app built with Expo that fetches and displays current weather data for any city using the Open-Meteo API.

## 📋 Assignment Requirements

This app fulfills all the requirements for Assignment B:

✅ **Input for city name and Search button**  
✅ **Loading indicator while fetching**  
✅ **Display city name, temperature, and weather description**  
✅ **Proper error handling with user-friendly messages**  
✅ **Clean, organized folder structure**

## 🚀 How to Run the App

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo Go app on your mobile device (iOS/Android) OR an emulator

### Installation & Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the Expo development server**
   ```bash
   npx expo start
   ```
   Or use the shortcut:
   ```bash
   npm start
   ```

3. **Run the app**
   - **On your phone**: Scan the QR code with the Expo Go app (Android) or Camera app (iOS)
   - **On Android emulator**: Press `a` in the terminal
   - **On iOS simulator**: Press `i` in the terminal (macOS only)
   - **On web browser**: Press `w` in the terminal

## 📱 Features

- **Beautiful Weather Cards**: Modern card-based UI with gradient backgrounds
- **Dynamic Gradients**: Background colors change based on weather conditions
- **Large Temperature Display**: Clear, easy-to-read temperature with degree symbol
- **Hourly Forecast**: Shows weather for the next 4 hours with icons and temperatures
- **Weather Today Section**: Dedicated card showing hourly breakdown
- **City Search**: Enter any city name to get current weather
- **Multi-word Support**: Works with multi-word cities like "New York", "San Francisco", "Los Angeles"
- **Real-time Data**: Fetches live weather data from Open-Meteo API (free, no API key required)
- **Location Info**: Displays city with location pin icon
- **Weather Icons**: Dynamic icons change based on conditions (sunny, cloudy, rainy, etc.)
- **Loading States**: Clear loading indicator during API requests
- **Error Handling**: User-friendly error messages for invalid cities or network issues
- **Smooth Animations**: Gradient transitions and smooth scrolling

## 🏗️ Project Structure

```
weather-lookup-app/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx          # Main weather screen
│   │   ├── explore.tsx         # Explore tab (default Expo)
│   │   └── _layout.tsx         # Tab navigation layout
│   ├── _layout.tsx             # Root layout
│   └── modal.tsx               # Modal screen (default Expo)
├── src/
│   ├── api/
│   │   └── weather.ts          # Weather API service & hourly forecast
│   └── components/
│       ├── WeatherCard.tsx     # Beautiful weather card with gradients
│       ├── SearchInput.tsx     # City search input component
│       ├── WeatherDisplay.tsx  # Legacy weather display (kept for reference)
│       └── ErrorMessage.tsx    # Error message component
├── components/                  # Reusable UI components
├── constants/                   # Theme constants
├── hooks/                       # Custom React hooks
├── assets/                      # Images and static files
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠️ Technologies Used

- **React Native** (v0.81.5) - Mobile app framework
- **Expo** (~54.0.27) - Development platform
- **TypeScript** (~5.9.2) - Type-safe JavaScript
- **Expo Router** (~6.0.17) - File-based navigation
- **Expo Linear Gradient** - Beautiful gradient backgrounds
- **Expo Vector Icons (Ionicons)** - Weather and UI icons
- **Open-Meteo API** - Free weather data API (no key required)

## 🌐 API Information

This app uses two free APIs from Open-Meteo:

1. **Geocoding API**: Converts city names to coordinates
   - Endpoint: `https://geocoding-api.open-meteo.com/v1/search`
   
2. **Weather Forecast API**: Fetches current weather data
   - Endpoint: `https://api.open-meteo.com/v1/forecast`

**No API key is required** — Open-Meteo provides free access for educational and personal projects.

## 📖 How to Use

1. Launch the app
2. Enter a **city name** (e.g., "Mumbai", "Shimla", "New York", "Los Angeles")
3. Tap the **Search** button or press Enter
4. View the current weather with temperature and conditions
5. Try different cities to see various weather conditions!

### 💡 Important Notes
- ✅ **Search for cities**, not states/provinces
- ✅ Multi-word cities work fine: "New York", "San Francisco", etc.
- ❌ Searching "Andhra Pradesh" won't work → Try "Visakhapatnam" or "Vijayawada" instead
- ❌ Searching "Himachal Pradesh" won't work → Try "Shimla" or "Manali" instead

For more examples, see [USAGE_GUIDE.md](./USAGE_GUIDE.md)

## ✅ Assessment Checklist

- [x] **Working app**: Runs with `expo start` and behaves as expected
- [x] **Required features**: City input, search button, loading indicator, weather display
- [x] **Code quality**: Clean folder structure, small reusable components, TypeScript
- [x] **UI/UX**: Modern design, responsive layout, user-friendly error messages
- [x] **README**: Clear setup and run instructions

## 🎓 Learning Goals Achieved

- ✅ Making network requests with `fetch` API
- ✅ Handling loading states with `useState`
- ✅ Proper error handling with try-catch
- ✅ Displaying API-driven UI with TypeScript interfaces
- ✅ Component composition and reusability
- ✅ Clean code organization and folder structure

## 📱 Expo Version

- **Expo SDK**: ~54.0.27
- **React**: 19.1.0
- **React Native**: 0.81.5

## 👨‍💻 Development Commands

```bash
npm start          # Start Expo dev server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run on web
npm run lint       # Run ESLint
```

## 📝 Notes

- The app uses TypeScript for type safety
- Weather data updates in real-time when you search
- Error messages are descriptive and help users understand issues
- The UI adapts to different weather conditions with appropriate icons
- All components are well-documented and follow React best practices

---

