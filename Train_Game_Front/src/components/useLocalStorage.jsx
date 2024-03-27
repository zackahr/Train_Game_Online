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

    return {
        clearStorage,
        saveUser,
        getUser,
    };
};

export default useLocalStorage;