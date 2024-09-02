import React, { useState, useEffect } from 'react'; // Importing necessary React components and hooks
import { View, Text, Button, PermissionsAndroid, Platform } from 'react-native'; // Importing React Native components and API modules
import Geolocation from 'react-native-geolocation-service'; // Importing geolocation service for accessing device location

const LocationPermission = () => {
  const [location, setLocation] = useState(null); // Defining state variable for storing location data
  const [error, setError] = useState(null); // Defining state variable for storing error messages

  useEffect(() => {
    requestLocationPermission(); // Requesting location permission when the component mounts
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') { // Checking if the platform is iOS
      getLocation(); // Directly getting location for iOS as permissions are handled differently
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, // Requesting fine location permission for Android
          {
            title: 'Location Permission', // Title of the permission dialog
            message: 'We need access to your location.', // Message of the permission dialog
            buttonNeutral: 'Ask Me Later', // Neutral button text
            buttonNegative: 'Cancel', // Negative button text
            buttonPositive: 'OK', // Positive button text
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) { // Checking if the permission was granted
          getLocation(); // Calling getLocation method if permission is granted
        } else {
          setError('Location permission denied'); // Setting error if permission is denied
        }
      } catch (err) {
        setError(err.message); // Setting error if there is an exception
      }
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation(position); // Setting location state with the obtained position
        setError(null); // Clearing any previous errors
      },
      (error) => {
        setError(error.message); // Setting error message if there is an issue getting the location
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 } // Configuring geolocation options
    );
  };

  return (
    <Text>

    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {location ? (
          <Text>Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}</Text>
        ) : (
            <Text>{error ? `Error: ${error}` : 'Getting Location...'}</Text>
        )}
      <Button title="Get Location" onPress={getLocation} />
    </View>
        </Text>
  );
};

export default LocationPermission; // Exporting the component as default
