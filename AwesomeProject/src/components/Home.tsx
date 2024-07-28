import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {saveData, UserData} from '../utils/utils';

const Home: React.FC = () => {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');

  const addUser = () => {
    if(!firstName || !lastName || !email || !mobile) return
    const user: UserData = {
      firstName,
      lastName,
      email,
      mobile,
    };
    saveData(user);
    setFirstName('');
    setLastName('');
    setEmail('');
    setMobile('');
  };

  return (
    <View style={{flex: 1, backgroundColor: 'pink'}}>
      <Text style={styles.mainTitle}>User Profile</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        placeholder="First Name"
        onChangeText={text => setFirstName(text)}
      />
      <TextInput
        style={styles.input}
        value={lastName}
        placeholder="Last Name"
        onChangeText={text => setLastName(text)}
      />
      <TextInput
        style={styles.input}
        value={email}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        value={mobile}
        placeholder="Mobile"
        onChangeText={text => setMobile(text)}
      />
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.title} onPress={() => addUser()}>
          <Text style={styles.btnText}>{'Add User'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.title}
          onPress={() => navigation.navigate('List')}>
          <Text style={styles.btnText}>{'List User'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 8,
  },
  btnText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '600',
  },
  btnContainer: {
    flexDirection: 'row',
    width: '90%',
    height: 50,
    position: 'absolute',
    bottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 10,
  },
  input: {
    borderRadius: 8,
    borderColor: '#FFF',
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    padding: 8,
    marginVertical: 5,
  },
  mainTitle: {
    fontSize: 22,
    color: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginVertical: 10,
  },
});
export default Home;
