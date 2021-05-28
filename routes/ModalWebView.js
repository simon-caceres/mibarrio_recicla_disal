import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import { WebView } from 'react-native-webview';


export default ({navigation}) => {
    const uriNews = navigation.getParam('uri')

    const Loading = () => {
        return (
            <View style={styles.containter}>
                <Text>cargando...</Text>
            </View>
        )
    }
    
    return (
        <>
        <View>
            
        </View>
        <WebView 
            source={{ uri: uriNews }} 
            startInLoadingState={true}
            renderLoading={() => <Loading />}
        />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        height: Dimensions.get('window').height
    }
})