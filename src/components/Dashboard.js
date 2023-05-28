
import React,{useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, addTodo, editTodo, deleteTodo } from './redux/action';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const todos = useSelector((state) => state.todos);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);
  const [editedTodoTitle, setEditedTodoTitle] = useState('');
  const [editedTodoDescription, setEditedTodoDescription] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleAddTodo = () => {
    if (newTodoTitle.trim() !== '' && newTodoDescription.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        title: newTodoTitle,
        description: newTodoDescription,
        dateTime: new Date(),
      };
      dispatch(addTodo(newTodo));
      setNewTodoTitle('');
      setNewTodoDescription('');
    }
  };

  const handleEditTodo = () => {
    if (editedTodoTitle.trim() !== '' && editedTodoDescription.trim() !== '') {
      const updatedTodo = {
        id: editTodoId,
        title: editedTodoTitle,
        description: editedTodoDescription,
        dateTime: new Date(),
      };
      dispatch(editTodo(editTodoId, updatedTodo));
      setEditTodoId(null);
      setEditedTodoTitle('');
      setEditedTodoDescription('');
    }
  };

  const handleEditButtonClick = (id, title, description) => {
    setEditTodoId(id);
    setEditedTodoTitle(title);
    setEditedTodoDescription(description);
  };


  if (!currentUser) {
    navigate("/");
    return <><h1>First go to login</h1></>;
  }

  
    return (
      <div className="container mt-5">
        {currentUser ? (
          <div>
            <h1 className="mb-4">Welcome, {currentUser.username}!</h1>
            <div>
              <h2>Todos:</h2>
              <ul className="list-group">
                {todos.map((todo) => (
                  <li className="list-group-item" key={todo.id}>
                    {editTodoId === todo.id ? (
                      <div>
                        <input
                          type="text"
                          className="form-control mb-2"
                          value={editedTodoTitle}
                          onChange={(e) => setEditedTodoTitle(e.target.value)}
                        />
                        <input
                          type="text"
                          className="form-control mb-2"
                          value={editedTodoDescription}
                          onChange={(e) => setEditedTodoDescription(e.target.value)}
                        />
                        <button
                          onClick={handleEditTodo}
                          className="btn btn-primary me-2"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditTodoId(null)}
                          className="btn btn-secondary"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div>
                        <h3>{todo.title}</h3>
                        <p>{todo.description}</p>
                        <p>
                          {new Date(todo.dateTime).toLocaleDateString()}{' '}
                          {new Date(todo.dateTime).toLocaleTimeString()}
                        </p>
                        <button
                          onClick={() =>
                            handleEditButtonClick(
                              todo.id,
                              todo.title,
                              todo.description
                            )
                          }
                          className="btn btn-primary me-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => dispatch(deleteTodo(todo.id))}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Title"
                  className="form-control mb-2"
                  value={newTodoTitle}
                  onChange={(e) => setNewTodoTitle(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Description"
                  className="form-control mb-2"
                  value={newTodoDescription}
                  onChange={(e) => setNewTodoDescription(e.target.value)}
                />
                <button
                  onClick={handleAddTodo}
                  className="btn btn-primary me-2"
                >
                  Add
                </button>
              </div>
            </div>
            <button onClick={handleLogout} className="btn btn-secondary mt-3">
              Logout
            </button>
          </div>
        ) : null}
      </div>
    );
  };
  
  export default Dashboard;
  