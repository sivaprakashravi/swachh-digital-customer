import fetchApi from './fetchsvc.service';
import constants from './constant.service';
import storage from './storage-manager.service';

var login = async (values, self) => {
    try {
        const data = {
            "email": values.username,
            "password": values.password,
            "returnSecureToken": true
        }
        const dataApi = await fetchApi.post('signInWithPassword', data, { key: constants.key });
        const { idToken, email, localId } = dataApi;
        storage.put('userToken', { idToken, email, localId });
        const user =
        {
            "UserId": localId
        }
        const store = await fetchApi.post('api/getStoreInfo', user);
        storage.put('storeUser', store);
        self.handleClick('dashboard');
    } catch (error) {
        console.log('login', error)
        alert(error)
    }
};

var logout = () => {
    storage.clear();
};

var user = {
    storeUser: () => {
        return storage.get('storeUser') ? storage.get('storeUser') : {};
    },
    userToken: () => {
        return storage.get('userToken') ? storage.get('userToken') : {};
    },
}

var exports = {
    login,
    logout,
    user
}
export default exports;