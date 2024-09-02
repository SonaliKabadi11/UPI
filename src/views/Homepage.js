import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, FlatList, StyleSheet, Image, ScrollView } from 'react-native';

//import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import Card from '../components/card';
const HomePage = () => {
  const data = [
    [
      {
 
        id: 0,        
        eventName: 'Music Concert',
        timeOfDay: 'Evening',
        price: 50,
        hostedBy: 'Alice',
        image: require('../assets/sss.jpg')
      },
      {
        id: 1,
        eventName: 'Art Exhibition',
        timeOfDay: 'Morning',
        price: 20,
        hostedBy: 'Bob',
        image: require('../assets/sss.jpg')
      },
      {
        id: 2,
        eventName: 'Tech Conference',
        timeOfDay: 'Afternoon',
        price: 75,
        hostedBy: 'Charlie',
        image: require('../assets/sss.jpg')
      },
      {
        id: 3,
        eventName: 'Food Festival',
        timeOfDay: 'Night',
        price: 30,
        hostedBy: 'Diana',
        image: require('../assets/sss.jpg')
      },
      {
        id: 4,
        eventName: 'Book Reading',
        timeOfDay: 'Evening',
        price: 15,
        hostedBy: 'Edward',
        image: require('../assets/sss.jpg')
      },
      {
        id: 5,
        eventName: 'Yoga Session',
        timeOfDay: 'Morning',
        price: 10,
        hostedBy: 'Fiona',
        image: require('../assets/sss.jpg')
      },
      {
        id: 6,
        eventName: 'Dance Workshop',
        timeOfDay: 'Afternoon',
        price: 25,
        hostedBy: 'George',
        image: require('../assets/sss.jpg')
      },
      {
        id: 7,
        eventName: 'Stand-up Comedy',
        timeOfDay: 'Night',
        price: 40,
        hostedBy: 'Hannah',
        image: require('../assets/sss.jpg')
      },
      {
        id: 8,
        eventName: 'Cooking Class',
        timeOfDay: 'Evening',
        price: 35,
        hostedBy: 'Irene',
        image: require('../assets/sss.jpg')
      },
      {
        id: 9,
        eventName: 'Photography Walk',
        timeOfDay: 'Morning',
        price: 20,
        hostedBy: 'Jack',
        image: require('../assets/sss.jpg')
      }
    ]
    
  ]
 const [searchText, setSearchText] = useState('');
  return (

<SafeAreaView>
    <ScrollView style={styles.container}>
 

      <Image style={styles.parentPicture}  
      source={require('../assets/profile.png')} />
     
      <View style={styles.searchContainer} >
        <TextInput 
          style={styles.searchBar}
          value={searchText}
          onChangeText={setSearchText} 
          placeholder="Search..." 
          placeholderTextColor="#ffff"/>
          
        {/* <FontAwesomeIcon icon={faSlidersH} style={styles.filterIcon} color="#ffff" /> */}

      </View>
      <Text> {searchText}</Text>
    
      <Card style={styles.card} cardItem={data} numColumns={1}/>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  parentPicture:{
    position: 'relative',
    width: '100%',
    height: '15%',

  },
  container:{
    marginTop:10,
    overflow: 'hidden',
  },
    
  searchContainer: {
    position: 'absolute',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 4,
    top: '9%',
    color: '#ffff',
  },
  searchBar: {
    width: '90%',
    height: 40,
    flex: 3,
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: 10,
    borderColor: '#ffff',
    
  },
  filterIcon: {
    marginLeft: 10,
    alignSelf: 'center',
  },
});

export default HomePage; // Exporting the component as default
