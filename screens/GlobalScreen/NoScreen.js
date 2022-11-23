import * as React from 'react';
import { View, Text, StyleSheet} from 'react-native';

export const NoScreen = ({ route, navigation }) => {
    React.useEffect(()=>{
        navigation.setOptions({
            headerTitle: route.params?.head,
        });
    }, [])
    return (
        <View style={styles.container}>
            <Text style={styles.onlyText}>Looks like you have no {route.params?.text}</Text>
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
        textAlign: 'center',
    },
})