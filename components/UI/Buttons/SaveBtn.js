import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../../constants/styles';

const SaveButton = ({ children, onPress, color, width }) => {
    return (
        <Pressable
            style={({ pressed }) => [styles.button, { width: width, backgroundColor: color }, pressed && styles.pressed]}
            onPress={onPress}
        >
            <View>
                <Text style={styles.buttonText}>{children}</Text>
            </View>
        </Pressable>
    );
}

export default SaveButton;

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        borderRadius: 6,
        paddingVertical: 2,
        paddingHorizontal: 2,
        elevation: 2,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        height: 52,
    },
    pressed: {
        opacity: 0.7,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
