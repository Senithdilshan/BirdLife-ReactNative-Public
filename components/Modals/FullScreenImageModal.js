import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, Pressable } from 'react-native';

const FullScreenImageModal = ({ isVisible, onClose, imageUrl }) => {
    if (!isVisible) return null;

    return (
        <View style={styles.modalOverlay}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Pressable onPress={onClose}>
                    <Text style={styles.closeButtonText}>Close</Text>
                </Pressable>
            </TouchableOpacity>
            <Image source={{ uri: imageUrl }} style={styles.fullscreenImage} />
        </View>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,
    },
    closeButtonText: {
        color: 'black',
    },
    fullscreenImage: {
        width: '60%',
        height: '100%',
        resizeMode: 'contain', // Adjust resizeMode as needed
    },
});

export default FullScreenImageModal;