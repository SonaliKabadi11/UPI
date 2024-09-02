import React, { useEffect, useState } from 'react';
import { View, Text, Button, Linking } from 'react-native';

const PaymentScreen = () => {
  const [paymentStatus, setPaymentStatus] = useState('Pending');

  useEffect(() => {
    const handleUrl = (event) => {
      const { url } = event;
      // Example URL parsing logic
      if (url.includes('txnStatus=SUCCESS')) {
        setPaymentStatus('Success');
      } else if (url.includes('txnStatus=FAILED')) {
        setPaymentStatus('Failed');
      }
    };

    Linking.addEventListener('url', handleUrl);

    return () => {
      Linking.removeEventListener('url', handleUrl);
    };
  }, []);

  const initiateUPIPayment = () => {
    const upiUrl = 'upi://pay?pa=9632310963@ybl&pn=Ayaz&tid=txn789&tr=ref456&tn=OrderPayment&am=500&cu=INR';
    Linking.openURL(upiUrl).catch((err) => console.error('An error occurred', err));
  };

  return (
    <View>
      <Text>Payment Status: {paymentStatus}</Text>
      <Button title="Pay with UPI" onPress={initiateUPIPayment} />
    </View>
  );
};

export default PaymentScreen;
