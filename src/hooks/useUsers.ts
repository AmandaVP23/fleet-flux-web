import api from '../api/axios';
import { UsersApi } from '../api/usersApi';

export function useUsers() {
    const requestAuthenticatedUserInfo = async () => {
        try {
            const { data } = await api.get(UsersApi.me);
            console.log(data);
        } catch (e) {
            console.log(e);
        }
    };

    return {
        requestAuthenticatedUserInfo,
    };
}
