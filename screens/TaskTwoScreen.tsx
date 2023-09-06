import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome'; // Replace with the appropriate icon library

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const markers = [
    { id: 1, latitude: 23.81426279756788, longitude: 90.40413862620731 },
    { id: 2, latitude: 23.808106397946844, longitude: 90.40328323667977 },
    { id: 3, latitude: 23.798141522836097, longitude: 90.40168671183021 },
    { id: 4, latitude: 23.78979393341548, longitude: 90.40020439868736 },
    { id: 5, latitude: 23.77941034563629, longitude: 90.39837976942222 },
];

const initialRegion = {
    latitude: markers[0].latitude,
    longitude: markers[0].longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
};

const animationDuration = 3000; // Adjust the duration as needed
const animationStepDuration = 16; // 60 FPS

const TaskTwoScreen: React.FC = () => {
    const [currentMarkerIndex, setCurrentMarkerIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [vehiclePosition, setVehiclePosition] = useState({
        latitude: markers[0].latitude,
        longitude: markers[0].longitude,
    });
    const [mapRegion, setMapRegion] = useState(initialRegion);
    const [isDraggingEnabled, setIsDraggingEnabled] = useState(false);

    const vehicleMarkerRef = useRef<any>(null);

    const animateVehicle = () => {
        setIsAnimating(true);

        const startTime = Date.now();
        const endTime = startTime + animationDuration;

        const moveVehicle = () => {
            const currentTime = Date.now();
            const progress = (currentTime - startTime) / animationDuration;

            if (progress >= 1) {
                setIsAnimating(false);
                return;
            }

            const currentMarkerIndex = Math.floor(progress * (markers.length - 1));
            setCurrentMarkerIndex(currentMarkerIndex);

            const currentMarker = markers[currentMarkerIndex];
            const nextMarker = markers[currentMarkerIndex + 1];
            const interpolation = progress * (markers.length - 1) - currentMarkerIndex;

            const latitude = currentMarker.latitude + (nextMarker.latitude - currentMarker.latitude) * interpolation;
            const longitude = currentMarker.longitude + (nextMarker.longitude - currentMarker.longitude) * interpolation;

            setVehiclePosition({ latitude, longitude });

            requestAnimationFrame(moveVehicle);
        };

        moveVehicle();
    };

    useEffect(() => {
        // Initialize the vehicle marker position
        const initialMarker = markers[currentMarkerIndex];
        setVehiclePosition(initialMarker);
    }, [currentMarkerIndex]);

    const handleZoomIn = () => {
        // Implement zoom in logic here
        const newRegion = {
            ...mapRegion,
            latitudeDelta: mapRegion.latitudeDelta / 2,
            longitudeDelta: mapRegion.longitudeDelta / 2,
        };
        setMapRegion(newRegion);
    };

    const handleZoomOut = () => {
        // Implement zoom out logic here
        const newRegion = {
            ...mapRegion,
            latitudeDelta: mapRegion.latitudeDelta * 2,
            longitudeDelta: mapRegion.longitudeDelta * 2,
        };
        setMapRegion(newRegion);
    };

    const handleMapDrag = () => {
        // Enable map dragging when the user interacts with the map
        setIsDraggingEnabled(true);
    };

    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
                region={mapRegion}
                onRegionChange={setMapRegion}
                scrollEnabled={isDraggingEnabled} // Enable/disable map dragging based on state
                onPanDrag={handleMapDrag} // Handle map dragging
            >
                {markers.map((marker) => (
                    <Marker
                        key={marker.id}
                        coordinate={{
                            latitude: marker.latitude,
                            longitude: marker.longitude,
                        }}
                    />
                ))}
                <Polyline
                    coordinates={markers.map((marker) => ({
                        latitude: marker.latitude,
                        longitude: marker.longitude,
                    }))}
                    strokeColor="#ff9900"
                    strokeWidth={6}
                />
                <Marker coordinate={vehiclePosition}>
                    <View style={{ backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 30, color: 'blue' }}>🚗</Text>
                    </View>
                </Marker>
            </MapView>
            <TouchableOpacity
                style={styles.zoomButton}
                onPress={handleZoomIn}
            >
                <Icon name="plus" size={20} color="#ff9900" />
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.zoomButton, { top: 70 }]}
                onPress={handleZoomOut}
            >
                <Icon name="minus" size={20} color="red" />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.moveVehicleButton}
                onPress={animateVehicle}
                disabled={isAnimating}
            >
                <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>Move Vehicle  🚗</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    zoomButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 20,
        padding: 10,
    },
    moveVehicleButton: {
        width: '100%',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 153, 0, 0.8)',
        position: 'absolute',
        bottom: 0,
    },
});

export default TaskTwoScreen;
