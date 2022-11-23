import * as React from 'react';
import { View, Text, StyleSheet} from 'react-native';

export const ComingSoonScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.onlyText}>Coming Soon</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        display: 'flex',
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },

    onlyText:{
        color: "#000000",
        fontSize: 30,
        fontWeight: 'bold',
    },
})