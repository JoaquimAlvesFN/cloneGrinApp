import React, { useState, useEffect } from 'react';
import { Alert, SafeAreaView, View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {getCurrentPositionAsync, requestPermissionsAsync} from 'expo-location';
import { Camera } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';

export default function Home({navigation}) {
    const [region, setRegion] = useState(null);

    const data = [
        {"id":1, "latitude":-3.8205798641876383, "longitude":-38.50870633497834},
        {"id":2, "latitude":-3.8203463184271396, "longitude":-38.509089555591345},
        {"id":3, "latitude":-3.8115831644674536, "longitude":-38.509606048464775},
        {"id":4, "latitude":-3.8138300828147385, "longitude":-38.516211826354265},
        {"id":5, "latitude":-3.8080651369727754, "longitude":-38.51818324998021},
    ]

    useEffect(() => {
        async function loadingPosition() {
            const {granted} = await requestPermissionsAsync();

            if (granted) {
                const {coords} = await getCurrentPositionAsync({
                    enableHighAccuracy: true
                });

                const {latitude, longitude} = coords;
                setRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                });
            }
        }

        loadingPosition();

        if (!region) {
            setRegion(null);
        }

    },[]);

    function handleRegion(region) {
        setRegion(region);
    }

    async function handleCamera() {
        const {granted} = await Camera.requestPermissionsAsync();

        if (granted) {
        }
    }

    /*async function handlePositionNow() {
        const {coords} = await getCurrentPositionAsync({
            enableHighAccuracy: true
        });

        const {latitude, longitude} = coords;
        setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04
        });
    }*/

    navigation.setOptions({
        title: 'Grin Clone',
        headerLeft: () => (
            <TouchableOpacity onPress={() => {navigation.openDrawer()}}>
                <MaterialIcons style={{marginLeft: 10}} name="person-outline" size={25} color="#FFF"/>
            </TouchableOpacity>
        )
    });
    
    return (
        <>
            <MapView 
                rotateEnabled={false}
                showsMyLocationButton={false} 
                onRegionChangeComplete={handleRegion} 
                initialRegion={region} 
                region={region}
                style={styles.container}
            >
                {data.map(bike => (
                    <Marker key={bike.id} coordinate={{
                        latitude: bike.latitude,
                        longitude: bike.longitude,
                    }}>
                        <View style={styles.bikers}>
                            <MaterialIcons name="directions-bike" size={20} color="#50C878"/>
                        </View>
                    </Marker>
                ))}
            </MapView>
            <View style={styles.itemMaps}>
                <TouchableOpacity style={styles.button}>
                    <Text>Tem 3 viagens grátis</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonFooter}>
                <TouchableOpacity onPress={() => {navigation.navigate('start')}} style={styles.buttonStart}>
                    <Text style={styles.textStartButton}>Iniciar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.locationButton}>
                    <MaterialIcons name="my-location" size={25} color="#50C878"/>
                </TouchableOpacity>
            </View>
        </>
  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemMaps: {
        position: 'absolute',
        marginVertical: 20,
        marginHorizontal: 20,
    },
    button: {
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 5,
        elevation: 2,
        alignItems: 'center',
        width: Dimensions.get('window').width - 40,
    },
    buttonFooter: {
        position: 'absolute',
        bottom: 30,
        flexDirection: 'row',
        marginLeft: Dimensions.get('window').width / 3,
    },
    buttonStart: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#50C878',
        width: 150,
        height: 48,
        borderRadius: 25,
        elevation: 2
    },
    textStartButton: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    },
    bikers: {
        backgroundColor: '#FFF',
        width: 40,
        height: 40,
        borderRadius: 25,
        elevation: 4,
        borderColor: '#50C878',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    locationButton: {
        backgroundColor: '#FFF',
        width: 50,
        height: 50,
        borderRadius: 25,
        marginLeft: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
});