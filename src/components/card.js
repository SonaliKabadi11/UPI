

import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';


const Card = ({ cardItem, numColumns }) => {
    const data = Array.isArray(cardItem) && cardItem.length > 0 ? cardItem[0] : [];
    
const events = [
    {
      id: '1',
      title: 'French dinner in Paris',
      location: 'Paris',
      image: require('../assets/profile.png'), // Add your image paths here
    },
    {
      id: '2',
      title: 'Sushi making class',
      location: 'Tokyo',
      image: require('../assets/profile.png'),
    },
    {
        id: '3',
        title: 'Indian Chai',
        location: 'India',
        image: require('../assets/profile.png'),
      },
      {
        id: '4',
        title: 'Momos Love',
        location: 'Nepal',
        image: require('../assets/profile.png'),
      },
    // Add more events here
  ];
  return (
    <View>        
        <Text style={styles.pagetitle}> Featured Events</Text>
         <View style={styles.container}>
        <FlatList
            data={events}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
            <TouchableOpacity style={styles.Hcard}>
                <Image source={item.image} style={styles.Himage} />
                <Text style={styles.Htitle}>{item.title}</Text>
                <Text style={styles.Hlocation}>{item.location}</Text>
            </TouchableOpacity>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.list}
        />
          </View>
        <View style={styles.container}>
            <Text style={styles.pagetitle}> Events near you</Text>
        
        <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
            <TouchableOpacity style={styles.card}>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.title}>{item.eventName}</Text>
                <Text style={styles.chef}>Hosted By -{item.hostedBy}</Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.seats}>{item.timeOfDay}</Text>
                    <Text style={styles.price}>{item.price}$/person</Text>
                </View>
                
            </TouchableOpacity>
            
            )}
            scrollEnabled={false} 
        />
        
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
  },
  card: {
    margin: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    overflow: 'hidden',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  Hcard: {
    marginRight: 10,
    backgroundColor: '#fff',
   
    overflow: 'hidden',
    width: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
   
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
  },
  pagetitle:{
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
  },
  chef: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  price: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  seats: {
    fontSize: 14,
    color: 'grey',
    margin: 10,
  },
  infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      Himage: {
        width: '95%',
        height: 150,
        borderRadius: 10,
        padding:2,
        alignSelf:'center'
      },
      Htitle: {
        fontSize: 16,
        fontWeight: 'bold',
        margin: 5,
      },
      Hlocation: {
        fontSize: 14,
        color: 'grey',
        marginHorizontal: 5,
        marginBottom: 5,
      },
      list: {
        paddingHorizontal: 10,
      },
});



export default Card;
