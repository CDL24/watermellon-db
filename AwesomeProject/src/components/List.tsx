import {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {deleteData, UserData} from '../utils/utils';
import {database} from '../database/database';
import { useNavigation } from '@react-navigation/native';

const List: React.FC = () => {
  const [data, setData] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
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
    console.log('Edit...',user)
    navigation.goBack()
    navigation.push('Home', {user})
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
    </View>
  );
};
export default List;
