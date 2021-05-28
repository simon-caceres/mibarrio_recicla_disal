import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, FlatList, Modal, TouchableHighlight, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import ElementItems from '../components/Items'
import Item from '../components/Item'
import Header from '../components/Header'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

export default  HomeScreen = ({navigation}) => {
    const [addres, getAddres] = useState('')
    const [filtro, setFilter] = useState(null)
    const [builAdd, setData] = useState(null)
    const [modalVisible, setModalVisible] = useState(false);
    const [searching, setSeaching] = useState(true)
    const [addressFiltered, setAddressFiltred] = useState(null)
    const [general, setGeneral] = useState(0)
    const [ton, setTon] = useState(0)
    const [papel, setPapel] = useState(0)
    const [glass, setGlass] = useState(0)
    const [latas, setLatas] = useState(0)
    const [last, setLast] = useState(0)
    const [lastDate, setLastDate] = useState('')
    //variables y estados para el filtro de busqueda
   
    const [loading, setLoading] = useState(false)
    const [filterData, setFilterData] = useState([])
    const [error, setError] = useState(null)
    const [arraHolder, setArrayHolder] = useState([])

    //logica para el filtro de busqueda
    const searchText =  text => {
      getAddres(text)
      const newData = builAdd.filter(item => {      
        const itemData = `${item.direccion.toUpperCase()}`
        const textData = addres.toUpperCase();
        return itemData.indexOf(textData) > -1;    
      });
      setFilterData(newData)
    }
    

   //resto de logica
    const seguirBuscando = () => {
        setModalVisible(!modalVisible);
        getAddres('')
    }

    
    const getdata = async () => {
      //llamado lista de departamentos con id
      const response = await fetch('https://disalapi.herokuapp.com/departaments')
      const json = await response.json()
      //lamado para tomar el acumulado por indicador
      const acumulado = await fetch('https://disalapi.herokuapp.com/residues?fecha=01/01/2020&codigo=1234212')
      const acumuladoJson = await acumulado.json()
      //llamado para ultimo retiro
      const date = getLastRetire()
      const last = await fetch(`https://disalapi.herokuapp.com/residues?fecha=${date}&codigo=1234212`)
      const lastRetire = await last.json()
      acumuladoJson[0].forEach(e => {
        if (e.categoria === "vidrio") {
          setGlass(e.valor)
        } else if (e.categoria === "envases") {
          setLatas(e.valor)
        } else {
          setPapel(e.valor)
        }
      })
      var acumulador_per_dep = 0

      acumuladoJson[0].map(dato => {
          acumulador_per_dep = acumulador_per_dep + dato.valor
      })
      setTon(acumulador_per_dep / 1000)
      setGeneral(acumulador_per_dep)

      var acumulador = 0
      lastRetire[0].map(e => {
          acumulador = acumulador + e.valor
      })

      setLast(acumulador)
      setData(json)
      setArrayHolder(json)
      setLoading(false)
    }

    const getLastRetire = () => {
      const data = new Date();
      let actaulDay = data.getDay() + 1
      let  calculo = actaulDay + 2
      let  actualFecha = data.getDate()
      let jueves = actualFecha - calculo
      let months = data.getMonth()
      let year = data.getFullYear()

      return `${jueves}/${months}/${year}`
    }

    useEffect(() => {
      const date = getLastRetire()
      setLastDate(date)
    }, [])
    
  
    const handleClick = async (item) => {
      
      setLoading(true)
      const response = await fetch(`https://disalapi.herokuapp.com/residues?fecha=01/01/2020&codigo=${item.id}`)
      const json = await response.json()
      const date = getLastRetire()
      const lastRetire = await fetch(`https://disalapi.herokuapp.com/residues?fecha=${date}&codigo=${item.id}`)
      const jsonRetire = await lastRetire.json()

      setModalVisible(false)
      
      navigation.navigate('Modal', {
        addres: item.direccion,
        building: json,
        lastRetire: jsonRetire, 
        id: item.id,
        lastDate: date
      })
      setLoading(false)
    }

    const modalLoad = () => {
      setLoading(false)
      setModalVisible(true)
    }
  
   
  
    //useEffect
    useEffect(() => {
      setLoading(true)
      getdata() 
    }, []);
   
    
  
   
    const renderSelect = ({ item }) => (
      <Item onPress={() => handleClick(item)} title={item.direccion} subtitle={item.distrito} id={item.id}  />
    );
  
    return (
      <View style={styles.container}>
        <Header navigation={navigation} />
        {
          loading === true ? <></>
          :
          <View style={styles.searchContainer}>
            <AntDesign 
              name="search1" 
              size={24} 
              color="grey" 
              style={{marginTop: 17, marginLeft: 15, zIndex: 2, position: 'absolute'}}
            />
            <TouchableHighlight 
              style={styles.input} 
              activeOpacity={0.85} 
              onPress={modalLoad} 
              underlayColor="#eee"
            >
              <View style={styles.button}>
                <Text>Buscar mi edificio</Text> 
              </View>
            </TouchableHighlight>
          </View>
        }
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{height: '100%', width: '100%'}} >
                {
                  loading === false ?
                  <>   
                    <TextInput        
                      style={{width: '100%', height: 40, backgroundColor: '#eee', borderRadius: 25, padding: 10}}
                      placeholder="Escribe tu dirección..."           
                      onChangeText={searchText}          
                    />
                    {
                      loading === false ?
                      <FlatList
                        data={filterData.length > 0 ? filterData : builAdd}
                        renderItem={renderSelect}
                        keyExtractor={item => item.id.toString()}
                      />
                        :
                      <View style={styles.loader}>
                        <ActivityIndicator size="large" color="#35c460" />
                      </View>
                    }          
                  </>
                    :
                  <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#35c460" />
                  </View>
                }    
              </View>
            </View>
          </View>
        </Modal>
    
      {
        loading === true ? 
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#35c460" />
        </View>
        :
        <>
          <View style={styles.vistaNavegador}>
            <Text>Resumen</Text>
          </View>

          <ElementItems general={general} papel={papel} glass={glass} latas={latas} ton={ton}  />

          <View style={styles.vistaNavegador}>
            <Text>Ultimo retiro: {lastDate}</Text>
          </View>

          <View style={styles.listView}>
            <View styles={styles.imageList}>
                <MaterialCommunityIcons name="truck-fast" size={50} color='#51b055' style={{marginRight: 40}} />
            </View>

            <View >
              <Text style={styles.title}>{last} kg por Departamento</Text>
              <Text>{last} Toneladas Recicladas</Text>
            </View>
          </View>
        </>
      }
        
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
  
    searchContainer: {
      flexDirection: 'row'
    },
    input: {
      marginTop:10,
      flex: 1,
      textAlign: 'center'
      
    },
    button: {
      alignItems: "center",
      backgroundColor: "#eee",
      padding: 10,
      borderRadius: 25
    },
    listHeader: {
      height: 50,
      backgroundColor: '#eee'
    },

    listView: {
      margin: 5,
      padding: 20,
      width: '90%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: '#51b055',
      borderWidth: 1,
      borderRadius: 15
    },
    tinyLogo: {
      width: 50,
      height: 50,
      marginRight: 50
    },
    imageList: {
      marginRight: 100
    },
  title: {
      fontWeight: 'bold'
  },
    
    vistaNavegador:{
      width: Dimensions.get('window').width - 20,
      margin: 10
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
      backgroundColor: '#f7f7f7'
    },
    modalView: {
      backgroundColor: "white",
      borderRadius: 20,
      width: Dimensions.get('window').width - 10,
      height: Dimensions.get('window').height - 10,
      padding: 15,
      alignItems: "center",
      shadowColor: "red",
      shadowOffset: {
        width: 20,
        height: 20
      },
      shadowOpacity: 0.7,
      shadowRadius: 23.84,
      elevation: 5
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    loader: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    }
    
  });
  
  