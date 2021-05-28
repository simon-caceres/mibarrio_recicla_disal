import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';


export default ({general,papel,glass,latas, ton }) => {
    return (
        <View style={styles.container}>
                <View style={styles.listView}>
                    <View styles={styles.imageList}>
                        <Image
                            style={{
                            width: 55,
                            height: 55,
                            marginRight: 40
                            }}
                            source={require('../assets/svg/01.png')}
                        />
                    </View>
                    <View >
                        <Text style={styles.title}>{general} kg por Departamento</Text>
                        <Text>{ton} Toneladas Recicladas</Text>
                    </View>
                </View>
        
                <View style={styles.listView}>
                    <View styles={styles.imageList}>
                        <Image
                            style={styles.tinyLogo}
                            source={require('../assets/svg/05.png')}
                        />
                    </View>
                    <View>
                        <Text style={styles.title} >Papel y Carton</Text>
                        <Text>{papel} kg por Departamento</Text>
                    </View>
                </View>
        
                <View style={styles.listView}>
                    <View styles={styles.imageList}>
                        <Image
                            style={styles.tinyLogo}
                            source={require('../assets/svg/wine.png')}
                        />
                    </View>
                    <View>
                        <Text style={styles.title} >Vidrio</Text>
                        <Text>{glass} Kg por Departamento</Text>
                    </View>
                </View>
                <View style={styles.listView}>
                    <View styles={styles.imageList}>
                        <Image
                            style={styles.tinyLogo}
                            source={require('../assets/svg/04.png')}
                        />
                    </View>
                    <View>
                        <Text style={styles.title} >Envases livianos</Text>
                        <Text>{latas} Kg por Departamento</Text>
                    </View>
                </View>
        
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    listView: {
        margin: 5,
        padding: 20,
        width: '90%',
        //height: Dimensions.get('screen').height - 1000,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#51b055',
        borderWidth: 1,
        borderRadius: 15,
        flex: 1,
      },
      tinyLogo: {
        width: 40,
        height: 50,
        marginRight: 50
      },
      imageList: {
        marginRight: 100
      },
    title: {
        fontWeight: 'bold'
    }
})