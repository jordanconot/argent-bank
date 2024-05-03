export const getUserFromStorage = () => {
  const userFromLocalStorage = localStorage.getItem('user');
  const userFromSessionStorage = sessionStorage.getItem('user');
  if (userFromLocalStorage) {
    return JSON.parse(userFromLocalStorage);
  } else if (userFromSessionStorage) {
    return JSON.parse(userFromSessionStorage);
  }
  return null;
};
