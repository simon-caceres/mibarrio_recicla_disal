import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Image, Dimensions} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 


const Item = ({ item, onPress }) => (
    <View style={{marginTop: 10}}>
      <Image
        style={{width: Dimensions.get('window').width - 60, height: 180, borderRadius: 25}}
        source={{
          uri: `${item.urlToImage}`,
        }}
      />
      <View style={{backgroundColor: '#f9f7f7', marginTop: -40, borderRadius: 25, height: 200, padding: 10}}>
        <Text style={{fontSize: 20}}>{item.author} :</Text>
            <>
                <AntDesign style={{textAlign: 'right', marginTop: -32}}  name="pluscircle" size={30} color="#51b055" onPress={onPress}  />
            </>
        <Text 
          style={{marginTop: 10, textAlign: 'justify'}}
        >{item.description}</Text>
      </View>
  </View>
  );

  export default Item