import {useEffect, useState} from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {deleteData, updateUser, UserData} from '../utils/utils';
import {database} from '../database/database';
import {useNavigation} from '@react-navigation/native';

const List: React.FC = () => {
  const [data, setData] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [id, setId] = useState<string>('');

  const navigation = useNavigation();

  useEffect(() => {
    getData();
  }, [isRefresh]);
  console.log('data..', data);

  const getData = () => {
    const users = database.collections.get('users');
    let userData = [];
    users
      .query()
      .observe()
      .forEach(items => {
        items.forEach(data => {
          console.debug(data._raw);
          userData.push(data._raw);
        });
        console.log('Get...userData', userData);
        setData(userData);
      });
  };

  const onDelete = (id: string) => {
    deleteData(id);
    //getData();
    setIsRefresh(!isRefresh);
  };
  const onEdit = user => {
    console.log('Edit...', user);
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setEmail(user.email);
    setMobile(user.mobile);
    setId(user.id);
    setModalVisible(true);
    // navigation.goBack()
    // navigation.push('Home', {user})
  };
  const renderRow = user => {
    console.log('renderRow', user);
    return (
      <View
        style={{
          backgroundColor: '#F2F0EF',
          borderRadius: 2,
          borderColor: 'pink',
          borderWidth: 1,
          marginHorizontal: 8,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 5,
          }}>
          <View>
            <Text
              style={{
                color: 'red',
              }}>{`${user.first_name} ${user.last_name}`}</Text>
            <Text style={{color: 'red'}}>{user.email}</Text>
          </View>
          <View style={{gap: 5}}>
            <TouchableOpacity
              onPress={() => onDelete(user.id)}
              style={{
                borderColor: 'black',
                borderRadius: 10,
                padding: 5,
                borderWidth: 1,
              }}>
              <Text>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onEdit(user)}
              style={{
                borderColor: 'black',
                borderRadius: 10,
                padding: 5,
                borderWidth: 1,
              }}>
              <Text>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <Text
        style={{
          fontSize: 22,
          color: 'purple',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          marginVertical: 10,
        }}>
        Users List
      </Text>
      <View style={{flex: 1}}>
        <FlatList
          data={data}
          renderItem={({item}) => renderRow(item)}
          keyExtractor={item => `${item.id}-${Math.random()}`}
          extraData={data}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          console.log('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
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
                gap: 10,
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: 'purple',
                  padding: 10,
                  borderRadius: 8,
                }}
                onPress={() => {
                  const user: UserData = {
                    firstName,
                    lastName,
                    email,
                    mobile,
                  };

                  updateUser(id, user);
                  setIsRefresh(!isRefresh)
                  setModalVisible(!modalVisible);
                }}>
                <Text style={{color: '#FFF', fontSize: 20, fontWeight: '600'}}>
                  {'Update'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  modalView: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default List;
