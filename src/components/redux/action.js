import usersData from '../../users/user.json';

export const login = (username, password) => {
  const user = usersData.users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    return { type: 'LOGIN_SUCCESS', payload: { username } };
  } else {
    return { type: 'LOGIN_FAILURE', payload: 'Invalid username or password' };
  }
};




export const logout = () => {
  return { type: 'LOGOUT' };
};

export const addTodo = (todo) => {
  return { type: 'ADD_TODO', payload: todo };
};

export const editTodo = (id, updatedTodo) => {
  return { type: 'EDIT_TODO', payload: { id, updatedTodo } };
};

export const deleteTodo = (id) => {
  return { type: 'DELETE_TODO', payload: id };
};

