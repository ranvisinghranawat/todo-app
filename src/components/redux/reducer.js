
const initialState = {
  currentUser: null,
  error: null,
  todos: [],
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, currentUser: { username: action.payload.username }, error: null };
    case 'LOGIN_FAILURE':
      return { ...state, error: action.payload };
    case 'LOGOUT':
      return { ...state, currentUser: null };
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case 'EDIT_TODO':
      const { id, updatedTodo } = action.payload;
      const updatedTodos = state.todos.map((todo) =>
        todo.id === id ? updatedTodo : todo
      );
      return {
        ...state,
        todos: updatedTodos,
      };
    case 'DELETE_TODO':
      const todoId = action.payload;
      const updated = state.todos.filter((todo) => todo.id !== todoId);
      return {
        ...state,
        todos: updated,
      };
    default:
      return state;
  }
};


