const USER_KEY = 'auth-user';

const useLocalStorage = () => {
    const clearStorage = () => {
        window.localStorage.clear();
    };

    const saveUser = (user) => {
        const userId = user.id;
        const userKey = `auth-user`;
        window.localStorage.setItem(userKey, JSON.stringify(user));
    };

    const getUserById = (userId) => {
        const userKey = `auth-user-${userId}`;
        const userData = window.localStorage.getItem(userKey);
        return userData ? JSON.parse(userData) : null;
    };
    const getUser = () => {
        const usersString = window.localStorage.getItem(USER_KEY);
        if (usersString) {
          return JSON.parse(usersString);
        }
        return [];
      };
    const isLogged = (userId) => {
        const userKey = `auth-user-${userId}`;
        return !!window.localStorage.getItem(userKey);
    };

    const changeUserName = (userId, username) => {
        const userKey = `auth-user-${userId}`;
        const userData = getUser(userId);
        if (userData) {
            userData.username = username;
            window.localStorage.setItem(userKey, JSON.stringify(userData));
        }
    };

    return {
        clearStorage,
        saveUser,
        getUser,
        getUserById,
        isLogged,
        changeUserName,
    };
};

export default useLocalStorage;