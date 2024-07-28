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
  const [gender, setGender] = useState<string>('Male');

  const addUser = () => {
    if (!firstName || !lastName || !email || !mobile) return;
    const user: UserData = {
      firstName,
      lastName,
      email,
      mobile,
      gender,
    };
    saveData(user);
    setFirstName('');
    setLastName('');
    setEmail('');
    setMobile('');
  };

  return (
    <View style={styles.container}>
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
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={gender === 'Male' ? styles.enableRadio : styles.disableRadio}
          onPress={() => setGender('Male')}>
          <Text style={styles.radioText}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={gender === 'Female' ? styles.enableRadio : styles.disableRadio}
          onPress={() => setGender('Female')}>
          <Text style={styles.radioText}>Female</Text>
        </TouchableOpacity>
      </View>
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
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    gap: 10,
  },
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
  radioContainer: {
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: 16,
  },
  disableRadio: {
    backgroundColor: '#BDBDBD',
    padding: 8,
    borderRadius: 8,
  },
  enableRadio: {
    backgroundColor: 'purple',
    padding: 8,
    borderRadius: 8,
  },
  radioText: {
    color: 'white',
  },
});
export default Home;
