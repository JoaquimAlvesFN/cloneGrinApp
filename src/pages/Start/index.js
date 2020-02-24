import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';

export default function Start({navigation}) {
    navigation.setOptions({
        title: 'Leia o QR Code',
        headerLeft: null,
        headerRight: () => (
            <TouchableOpacity onPress={() => {navigation.goBack()}} style={{marginRight: 20}}>
                <MaterialIcons name="close" size={25} color="#FFF" />
            </TouchableOpacity>
        )
    });

  return (
    <View style={styles.container}>
        <Text>Abrir a camera aqui...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});