import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, Image, TouchableHighlight} from 'react-native';
import ElementItems from '../components/Items';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 


export default ({navigation}) => {
    const id = navigation.getParam('id')
    const building = navigation.getParam('building')
    const lastRetire = navigation.getParam('lastRetire')
    const addres = navigation.getParam('addres')
    const lastDate = navigation.getParam('lastDate')

    const [filtro, setFilter] = useState(null)
    const [ton, setTon] = useState(0)
    const [papel, setPapel] = useState(0)
    const [vidrio, setVidrio] = useState(0)
    const [envases, setEnvases] = useState(0)
    const [general, setGeneral] = useState(0)
    const [last, setLast] = useState(0)

    useEffect(() => {
        
        building[1].forEach(e => {
            if (e.categoria === "vidrio") {
                setVidrio(e.valor)
            } else if (e.categoria === "envases") {
                setEnvases(e.valor)
            } else {
                setPapel(e.valor)
            }
        })
        var acumulador_per_dep = 0

        building[1].map(dato => {
            acumulador_per_dep = acumulador_per_dep + dato.valor
        })
        setTon(acumulador_per_dep / 1000)
        setGeneral(acumulador_per_dep)

        var acumulador = 0
        lastRetire[1].map(e => {
            acumulador = acumulador + e.valor
        })
        setLast(acumulador)
    }, [])

   

    useEffect(() => {
        if (id > 100 && id < 200) {
            setFilter('warning')
        } else if ( id >= 300) {
            setFilter('green')
        } else if  (id > 0 && id < 100) {
            setFilter('primary')
        }
    }, [])


    const goBack = () => {
        navigation.navigate('Inicio')
    }

    

    return (
        <View style={styles.container} >
             {filtro === 'warning'? 
                <View style={[
                    styles.positionColorHead, styles.warning]}>
                    <Text></Text>
                </View>
                : filtro === 'primary' ?
                <View style={[
                    styles.positionColorHead, styles.primary]}>
                <Text></Text>
                </View>
                : filtro === 'green' ?
                <View style={[
                    styles.positionColorHead, styles.green]}>
                <Text></Text>
                </View>
                :
                <View style={[
                    styles.positionColorHead]}>
                <Text></Text>
                </View>
            }

            <View style={styles.header}>  
                <View style={styles.BtnContain}>
                    <AntDesign 
                        name="back" 
                        size={26} 
                        color="white"
                        onPress={goBack} 
                    />

                </View>
                <Text style={styles.buildName}>{addres}</Text>
                <View style={styles.BtnContain}></View>
            </View>  

            
            <View style={styles.modalHead}>
                <Text style={styles.mensaje}>Esto es lo que tu edificio lleva reciclado a la fecha.</Text>
                <Text style={styles.mensaje, styles.title}>RANKING Nº: {id}.</Text>
            </View>
            

            <ElementItems general={general} papel={papel} glass={vidrio} latas={envases} ton={ton} />

            <View style={styles.listViewLast}>
                <View styles={styles.imageList}>
                    <Image
                        style={styles.tinyLogo}
                        source={require('../assets/svg/02.png')}
                    />
                </View>
                <View>
                    <Text style={styles.title}>Dìas de recolecciòn</Text>
                    <Text>Jueves de cada semana</Text>
                </View>
            </View>
            <View style={styles.vistaNavegador}>
                <Text style={{fontWeight: 'bold', textAlign: 'left'}}> Ultimo retiro: {lastDate}</Text>
            </View>
            <View style={styles.listViewLast}>
                <View styles={styles.imageList}>
                    <MaterialCommunityIcons name="truck-fast" size={50} color='#51b055' style={{marginRight: 40}} />
                </View>
                <View >
                    <Text style={styles.title} >{last} kg por Departamento</Text>
                    <Text>{ton} Toneladas Recicladas</Text>
                </View>
            </View>

            {filtro === 'warning'? 
                <View style={[
                    styles.positionColor, styles.warning]}>
                    <Text></Text>
                </View>
                : filtro === 'primary' ?
                <View style={[
                    styles.positionColor, styles.primary]}>
                <Text></Text>
                </View>
                : filtro === 'green' ?
                <View style={[
                    styles.positionColor, styles.green]}>
                <Text></Text>
                </View>
                :
                <View style={[
                    styles.positionColor]}>
                <Text></Text>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    primary: {
        backgroundColor: '#235887'
    },
    warning: {
        backgroundColor: '#fed250'
    },
    green: {
        backgroundColor: '#51b055'
    },
    positionColor: {
        height: 15,
        width: Dimensions.get('window').width,
        position: 'absolute',
        bottom: 0
    },
    positionColorHead: {
        height: 20,
        width: Dimensions.get('window').width,
        position: 'absolute',
        top: 0
    },
    imageList: {
        marginRight: 100
    },
    listViewLast: {
        margin: 15,
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#51b055',
        borderBottomWidth: 1
    },
    tinyLogo: {
        width: 50,
        height: 50,
        marginRight: 50
    },
    modalHead: {
        padding: 10,
        marginBottom: 5,
        marginTop: 5,
        textAlign: 'left'
    },
    buildName: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    title: {
        fontWeight: 'bold'
    },
    mensaje: {
        textAlign: 'justify',
        marginTop: 5
    },
    BtnContain: {
        height: 20,
        width: 50,
        marginTop: 10,
        marginLeft: 20,
        marginBottom: 20,
        alignSelf: 'flex-start',
    },
    header: {
        backgroundColor: '#51b055',
        width: '100%',
        color: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: Dimensions.get('window').height - 1000
        
    },
    vistaNavegador:{
        width: Dimensions.get('window').width - 20,
        margin: 10
    },
}) 

