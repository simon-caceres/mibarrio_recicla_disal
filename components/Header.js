import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons'; 

const Header = ({navigation}) => {
    return (
        <View style={styles.header}>
          <View style={styles.btnDrawer} >
            <SimpleLineIcons 
              name="menu" 
              size={25} 
              color="white" 
              onPress={() => navigation.openDrawer()}  
            />
          </View>
          <Text style={styles.titleText}>Mi Barrio Recicla</Text>
          <View style={styles.btnDrawer}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#51b055',
        width: '100%',
        color: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: Dimensions.get('window').height - 1000
      },
      btnDrawer: {
        height: 20,
        width: 50,
        marginTop: 10,
        marginLeft: 20,
        marginBottom: 20,
        alignSelf: 'flex-start',
      },
    titleText: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: 'bold',
      },
})

export default Header