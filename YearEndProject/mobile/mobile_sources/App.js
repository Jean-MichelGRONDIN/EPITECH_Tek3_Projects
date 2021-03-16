import React from 'react';
import { StyleSheet, View } from 'react-native';
import IpManager from './IpManager'

export default function App() {
  return (
    <View style={styles.container}>
      <IpManager/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#11659f',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
