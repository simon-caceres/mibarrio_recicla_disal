import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

const Item = ({onPress, title, subtitle, id }) => (
    <TouchableHighlight
      onPress={onPress}
      activeOpacity={0.6}
      underlayColor="#eee"
    >
      <View style={styles.item} >
        <View style={styles.address}>
          <Text style={styles.title}><Text style={{fontWeight: 'bold'}}>Dirección:</Text> {title}</Text>
          <Text style={styles.subtitle}><Text style={{fontWeight: 'bold'}}>Comuna:</Text> {subtitle}</Text>
        </View>
        <View style={styles.arrow}>
          <Ionicons name="ios-arrow-forward" size={24} color="grey" />
        </View>
        
      </View>
     </TouchableHighlight>
  );

const styles = StyleSheet.create({
    item: {
        borderBottomColor: '#eee',
        borderBottomWidth: 2,
        margin: 10,
        paddingBottom: 10,
        width: '100%',
        flexDirection: 'row'
      },
    address:{
      width: '80%'
    },
    arrow: {
      justifyContent: 'center',
      alignItems: 'flex-end',
      width: '10%'
    }
})


  export default Item