import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodos } from '../redux/reducer';
import { GoPlus } from 'react-icons/go'
import { motion } from 'framer-motion';

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
  };
};

function Todos(props) {
  const [todo, setTodo] = useState('');

  const handleAddTodo = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    const now = mm + '/' + dd + '/' + yyyy;
    if (!todo) {
      alert("Input is Empty");
    } else {
      props.addTodo({
        id: Math.floor(Math.random()*1000),
        title: Math.random().toString(36).replace(/[^a-z]+/g, ''),
        item: todo,
        create: now,
        completed: false
      })
      setTodo('');
    }
  }

  const handleChange = e => {
    setTodo(e.target.value);
  };

  return (
    <div className="addTodos">
      <input
        type="text"
        onChange={(e) => handleChange(e)}
        className="todo-input"
        value={todo}
      />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="add-btn"
        onClick={handleAddTodo}
      >
        <GoPlus />
      </motion.button>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
