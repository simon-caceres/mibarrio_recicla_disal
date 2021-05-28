import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import DetalleScreen from './routes/DetalleScreen'
import HomeScreen from './routes/HomeScreen'
import Modal from './routes/Modal'
import ModalWebView from './routes/ModalWebView'

const appNavigator = createDrawerNavigator({
  Inicio: {
    screen: HomeScreen
  },
  Noticias:{
    screen: DetalleScreen
  } 
}, {
  initialRouteName: 'Inicio',
})

const root_stack = createStackNavigator({
  Main: appNavigator,
  ModalDos: ModalWebView,
  Modal: Modal
}, {
  mode: 'modal',
  headerMode: 'none'
})

export default createAppContainer (root_stack)

