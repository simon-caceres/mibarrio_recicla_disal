import React, {useState, useEffect} from 'react';
import { StyleSheet,View, FlatList } from 'react-native';
import Header from '../components/Header'
import Item from '../components/ItemNoticias'

export default  DetalleScreen = ({navigation}) => {
    const [cont, setCont] = useState(0)
    const incrementar = () => setCont(cont + 1)
    useEffect(() => {
      navigation.setParams({ incrementar })
    }, [cont])
    const [news, setNews] = useState(null)
  
    const getNews = async () => {
      const response = await fetch('http://newsapi.org/v2/everything?q=reciclaje&apiKey=c4eb315c7a1e410b9fcd336ec379d954')
      const json = await response.json()
      setNews(json.articles)
    }
    
    const getNewDetail = (url) => {
      navigation.navigate('ModalDos', {
        uri: url
      })
    }

    useEffect(() => {
      getNews()
    }, [])
   

    const renderSelect = ({ item }) => (
      <Item onPress={() => getNewDetail(item.url)} item={item}  />
    );
    
    return(
      <View style={styles.container}>
        <Header navigation={navigation} />
        <FlatList
          data={news}
          renderItem={renderSelect}
          keyExtractor={item => item.id}
          style={{width: '95%', paddingLeft: 20, paddingRight:20}}
        />
        
      </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start'
      }
  })