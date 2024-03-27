const USER_KEY = 'auth-user';

const useLocalStorage = () => {
    const clearStorage = () => {
        window.localStorage.clear();
    };

    const saveUser = (user) => {
        const userKey = `auth-user`;
        window.localStorage.setItem(userKey, JSON.stringify(user));
    };

    const getUser = () => {
        const usersString = window.localStorage.getItem(USER_KEY);
        if (usersString) {
          return JSON.parse(usersString);
        }
        return [];
      };
    const isLogged = (value) => {
        return value;
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
        isLogged,
        changeUserName,
    };
};

export default useLocalStorage;