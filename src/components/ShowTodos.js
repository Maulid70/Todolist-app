import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { completeTodos, removeTodos, updateTodos } from '../redux/reducer';
import TodoItem from './TodoItem';

const mapStateToProps = state => {
  return {
    todos: state
  };
}

const mapDispatcToProps = dispatch => {
  return {
    updateTodo: obj => dispatch(updateTodos(obj)),
    removeTodo: id => dispatch(removeTodos(id)),
    completeTodo: id => dispatch(completeTodos(id)),
  };
}

const ShowTodos = (props) => {
  const [sort, setSort] = useState('active');
  return (
    <div className="showTodos">
      <div className="buttons">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort('active')}
        >
          Active
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort('completed')}
        >
          Complete
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort('all')}
        >
          All
        </motion.button>
      </div>
      <ul>
        <AnimatePresence>

          {
            props.todos.length > 0 && sort === 'active' ?
            props.todos.map(todo => {
              return (
                todo.completed === false && 
                <TodoItem
                  key={todo.id}
                  item={todo}
                  removeTodo={props.removeTodo}
                  updateTodo={props.updateTodo}
                  completeTodo={props.completeTodo}
                />
              )
            }) : null
          }
          {
            props.todos.length > 0 && sort === 'completed' ?
            props.todos.map(todo => {
              return (
                todo.completed === true && 
                <TodoItem
                  key={todo.id}
                  item={todo}
                  removeTodo={props.removeTodo}
                  updateTodo={props.updateTodo}
                  completeTodo={props.completeTodo}
                />
              )
            }) : null
          }
          {
            props.todos.length > 0 && sort === 'all' ?
            props.todos.map(todo => {
              return (
                <TodoItem
                  key={todo.id}
                  item={todo}
                  removeTodo={props.removeTodo}
                  updateTodo={props.updateTodo}
                  completeTodo={props.completeTodo}
                />
              )
            }) : null
          }
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatcToProps)(ShowTodos);
