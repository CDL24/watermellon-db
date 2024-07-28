import {_RawRecord} from '@nozbe/watermelondb/RawRecord';
import {database} from '../database/database';

export const saveData = async (userData: UserData) => {
  await database.write(async () => {
    await database.get('users').create(user => {
      user.firstName = userData.firstName;
      user.lastName = userData.lastName;
      user.email = userData.email;
      user.mobile = userData.mobile;
      user.gender = userData.gender;
    });
  });
  console.log('Saved...');
};
export const updateUser = async (id: string, userData: UserData) => {
  await database.write(async () => {
    const user = await database.get('users').find(id);
    await user.update(() => {
      user.firstName = userData.firstName;
      user.lastName = userData.lastName;
      user.email = userData.email;
      user.mobile = userData.mobile;
      user.gender = userData.gender;
    });
  });
};
export const deleteData = async (id: string) => {
  await database.write(async () => {
    const user = await database.get('users').find(id);
    await user.destroyPermanently();
  });
};
export const getData = () =>{

    const promise = new Promise((resolve, reject)=>{
        try {
            const users = database.collections.get('users');
            console.log('Get...',users)
            let userData=  []
            users.query().observe().forEach(items => {
                items.forEach((data)=>{
                    userData.push(data._raw)
                })
                resolve(userData)
            })
            
        } catch (error) {
            reject(error)
        }

    })

    return promise;
}
export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  gender: string;
}
