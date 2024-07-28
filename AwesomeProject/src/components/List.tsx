import {useEffect, useState} from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {deleteData, getData, updateUser, UserData} from '../utils/utils';

const List: React.FC = () => {
  const [data, setData] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [id, setId] = useState<string>('');

  useEffect(() => {
    getData()
      .then(data => {
        console.log('Data -> ', data);
        setData(data);
      })
      .catch(error => console.log('Err : ', error));
  }, [isRefresh]);

  const onDelete = (id: string) => {
    deleteData(id);

    setIsRefresh(!isRefresh);
  };
  const onEdit = user => {
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setEmail(user.email);
    setMobile(user.mobile);
    setGender(user.gender);
    setId(user.id);
    setModalVisible(true);
  };
  const renderRow = user => {
    return (
      <View style={styles.rowConatiner}>
        <View style={styles.twoBtnContainer}>
          <View>
            <Text
              style={{
                color: 'black',
              }}>{`${user.first_name} ${user.last_name}`}</Text>
            <Text style={{color: 'black'}}>{user.email}</Text>
            <Text style={{color: 'black'}}>{user.mobile}</Text>
          </View>
          <View style={{gap: 5}}>
            <TouchableOpacity
              onPress={() => onDelete(user.id)}
              style={styles.btnStyle}>
              <Text>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onEdit(user)}
              style={styles.btnStyle}>
              <Text>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.centeredView}>
      <Text style={styles.title}>Users List</Text>
      <View>
        {data?.length > 0 ? (
          <FlatList
            data={data}
            renderItem={({item}) => renderRow(item)}
            keyExtractor={item => `${item.id}-${Math.random()}`}
            extraData={data}
          />
        ) : (
          <View style={styles.noRecord}>
            <Text>No Records Found!</Text>
          </View>
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.background}>
            <Text style={styles.title}>User Profile</Text>
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
        <TouchableOpacity style={gender === 'Male' ? styles.enableRadio : styles.disableRadio} onPress={()=> setGender('Male')}>
          <Text style={styles.radioText}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity style={gender === 'Female' ? styles.enableRadio : styles.disableRadio} onPress={()=> setGender('Female')}>
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
            <View style={styles.btnRowContainer}>
              <TouchableOpacity
                style={styles.btnContainer}
                onPress={() => {
                  const user: UserData = {
                    firstName,
                    lastName,
                    email,
                    mobile,
                    gender
                  };

                  updateUser(id, user);
                  setIsRefresh(!isRefresh);
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.btnText}>{'Update'}</Text>
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
    gap: 10
  },
  btnText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '600',
  },
  btnContainer: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 8,
  },
  btnRowContainer: {
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
  title: {
    fontSize: 22,
    color: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginVertical: 10,
  },
  noRecord: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    gap:10
  },
  rowConatiner: {
    backgroundColor: '#EEEEEE',
    borderRadius: 8,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    marginHorizontal: 8,
    marginVertical: 5,
    padding: 5,
  },
  twoBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  btnStyle: {
    backgroundColor: '#EEEEEE',
    borderColor: 'black',
    borderRadius: 10,
    padding: 5,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export default List;
