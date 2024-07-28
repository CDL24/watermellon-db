import { useNavigation, useRoute } from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { saveData, updateUser, UserData } from '../utils/utils';

const Home: React.FC = () => {
  const navigation =   useNavigation();
  const route = useRoute();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  
  useEffect(()=>{
    console.log('Route Changed...',route)
    setFirstName(route?.params?.user?.first_name || '')
    setLastName(route?.params?.user?.last_name || '')
    setEmail(route?.params?.user?.email || '')
    setMobile(route?.params?.user?.mobile || '')
  },[route])

  const addUser = () =>{
    const user: UserData = {
        firstName,
        lastName,
        email,
        mobile
    }
    saveData(user)
    setFirstName('')
    setLastName('')
    setEmail('')
    setMobile('')
  }
  const editUser = () =>{
    const user: UserData = {
      firstName,
      lastName,
      email,
      mobile
  }
    updateUser(route?.params?.user?.id,user);
    navigation.navigate('List')
  }
  const listUser = async () =>{
      navigation.navigate('List')
  }
  return (
    <View style={{flex: 1, backgroundColor: 'pink'}}>
      <Text
        style={{
          fontSize: 22,
          color: 'purple',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          marginVertical: 10,
        }}>
        User Profile
      </Text>
      <TextInput
        style={{
          borderRadius: 8,
          borderColor: '#FFF',
          backgroundColor: '#FFF',
          marginHorizontal: 16,
          padding: 8,
          marginVertical: 5,
        }}
        value={firstName}
        placeholder="First Name"
        onChangeText={text => setFirstName(text)}
      />
      <TextInput
        style={{
          borderRadius: 8,
          borderColor: '#FFF',
          backgroundColor: '#FFF',
          marginHorizontal: 16,
          padding: 8,
          marginVertical: 5,
        }}
        value={lastName}
        placeholder="Last Name"
        onChangeText={text => setLastName(text)}
      />
      <TextInput
        style={{
          borderRadius: 8,
          borderColor: '#FFF',
          backgroundColor: '#FFF',
          marginHorizontal: 16,
          padding: 8,
          marginVertical: 5,
        }}
        value={email}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={{
          borderRadius: 8,
          borderColor: '#FFF',
          backgroundColor: '#FFF',
          marginHorizontal: 16,
          padding: 8,
          marginVertical: 5,
        }}
        value={mobile}
        placeholder="Mobile"
        onChangeText={text => setMobile(text)}
      />
      <View
        style={{
          flexDirection: 'row',
          width: '90%',
          height: 50,
          position: 'absolute',
          bottom: 40,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          gap: 10
        }}>
        <TouchableOpacity style={{backgroundColor: 'purple', padding: 10, borderRadius:8}} onPress={()=> route?.params?.user?.id ? editUser() : addUser()}>
          <Text style={{color: '#FFF', fontSize: 20, fontWeight: '600'}}>
           {route?.params?.user?.id ? 'Edit User' : 'Add User'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor: 'purple', padding: 10, borderRadius:8}} onPress={()=>listUser()}>
          <Text style={{color: '#FFF', fontSize: 20, fontWeight: '600'}}>
            List User
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Home;
