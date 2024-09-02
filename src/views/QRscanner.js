import React, {useState} from 'react';
import UpiPayment from 'react-native-upi-payments';
// import all the components we are going to use

console.log('UpiPayment:', UpiPayment);

import {
  SafeAreaView,
  Text,
  View,
  Linking,
  TouchableHighlight,
  PermissionsAndroid,
  Platform,
  StyleSheet,
} from 'react-native';

// import CameraScreen
import {CameraScreen} from 'react-native-camera-kit';

const App = () => {
  const [qrvalue, setQrvalue] = useState('');
  const [opneScanner, setOpneScanner] = useState(false);
  const [paymentView, setPaymentView] = useState(false);
  const [receiverVpa, setReceiverVpa] = useState('');
  const [receiverName, setReceiverName]= useState('');
  const [merchantCode, setMerchantCode] = useState('');
  const onOpenlink = () => {
    // If scanned then function to open URL in Browser
    Linking.openURL(qrvalue);
  };
  const extractUpiDetails = (upiUrl) => {
   // Find the start of the query parameters
   const queryStringStartIndex = upiUrl.indexOf('?');
  
   if (queryStringStartIndex === -1) {
     // Handle cases where there is no query string
     return {};
   }
   
   const queryString = upiUrl.slice(queryStringStartIndex + 1);
   const queryPairs = queryString.split('&');
   const params = {};
 
   queryPairs.forEach((pair) => {
     const [key, value] = pair.split('=');
     if (key) {
       params[decodeURIComponent(key)] = decodeURIComponent(value || '');
     }
   });
    setReceiverVpa(params['pa']);
    setReceiverName(params['pn']);
    setMerchantCode(params['mc']);
  };
  const onBarcodeScan = (qrvalue) => {
    // Called after te successful scanning of QRCode/Barcode
    setQrvalue(qrvalue);
    setOpneScanner(false);
    setPaymentView(true);
    extractUpiDetails(qrvalue);
    console.log(qrvalue);
  };

  const onOpneScanner = () => {
    // To Start Scanning
    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'App needs permission for camera access',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // If CAMERA Permission is granted
            setQrvalue('');
            setOpneScanner(true);
          } else {
            alert('CAMERA permission denied');
          }
        } catch (err) {
          alert('Camera permission err', err);
          console.warn(err);
        }
      }
      // Calling the camera permission function
      requestCameraPermission();
    } else {
      setQrvalue('');
      setOpneScanner(true);
    }
  };

   
    const payUsingUpi = () => {
      
      UpiPayment.initializePayment(
        {
          vpa: receiverVpa, // UPI ID or VPA of the receiver
          payeeName: receiverName, // Name of the receiver
          amount: '10.00', // Amount to be paid
          transactionRef: 'txn001', // A unique transaction reference ID
          merchantCode: receiverMerchantCode, // Merchant code if applicable
        },
        (status) => handlePaymentSuccess(status),
        (error) => handlePaymentError(error)
      );
    };
  
    const handlePaymentSuccess = (status) => {
      if (status === 'SUCCESS') {
        Alert.alert('Payment Successful', 'The payment was successful.');
      } else if (status === 'SUBMITTED') {
        Alert.alert('Payment Pending', 'The payment is pending.');
      } else if (status === 'FAILURE') {
        Alert.alert('Payment Failed', 'The payment failed.');
      }
    };
  
    const handlePaymentError = (error) => {
      Alert.alert('Payment Error', `An error occurred: ${error.message}`);
    };
  
  let scanner 
  if(!paymentView){
     scanner =  <View style={{flex: 1}}>
    {opneScanner ? (
      <View style={styles.cameraContainer}>
        <CameraScreen 
          showFrame={true}
          // Show/hide scan frame
          scanBarcode={true}
          // Can restrict for the QR Code only
          laserColor={'blue'}
          // Color can be of your choice
          frameColor={'yellow'}
          // If frame is visible then frame color
          colorForScannerFrame={'black'}
          // Scanner Frame color
          onReadCode={(event) =>
            onBarcodeScan(event.nativeEvent.codeStringValue)
          }
        />
      </View>
    ) : (
      <View style={styles.container}>
        <Text style={styles.titleText}>
          Barcode and QR Code Scanner using Camera in React Native
        </Text>
        <Text style={styles.textStyle}>
          {qrvalue ? 'Scanned Result: ' + qrvalue : ''}
        </Text>
        {qrvalue.includes('https://') ||
        qrvalue.includes('http://') ||
        qrvalue.includes('geo:') ? (
          <TouchableHighlight onPress={onOpenlink}>
            <Text style={styles.textLinkStyle}>
              {
                qrvalue.includes('geo:') ?
                'Open in Map' : 'Open Link'
              }
            </Text>
          </TouchableHighlight>
        ) : null}
        <TouchableHighlight
          onPress={onOpneScanner}
          style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>
          Scan
          </Text>
        </TouchableHighlight>
      </View>
    )}
   
  </View>

  }
  else{
    scanner = 
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{qrvalue} </Text>
        <TouchableHighlight
          onPress={payUsingUpi}
          style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>
          Pay 10 Rupees
          </Text>
        </TouchableHighlight>
      {/* <Button title="Pay 10 Rupees" onPress={payUsingUpi} /> */}

      </View>
   
  }
  return (
    <SafeAreaView>
      {scanner}
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  cameraContainer:{
    flex: 1,
    height: 200,
    width: 200,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textStyle: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
    marginTop: 16,
  },
  buttonStyle: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'green',
    padding: 5,
    minWidth: 250,
    height: 40,
  },
  buttonTextStyle: {
    padding: 5,
    color: 'white',
    textAlign: 'center',
  },
  textLinkStyle: {
    color: 'blue',
    paddingVertical: 20,
  },
});