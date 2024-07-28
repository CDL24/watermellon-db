import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../components/Home';
import List from '../components/List';

const Stack = createNativeStackNavigator();


const Route = () =>{
    return(
        <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name="List" component={List} />
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
        </NavigationContainer>
    )
}
export default Route;