import { motion } from 'framer-motion';
import React, { useRef } from 'react';
import { AiFillEdit } from 'react-icons/ai'
import { IoCheckmarkDoneSharp, IoClose } from 'react-icons/io5'

const TodoItem = ({ item, updateTodo, removeTodo, completeTodo }) => {
  const inputRef = useRef(true);

  const handleUpdateTodo = (id, value, e) => {
    if (e.which === 13) {
      updateTodo({ id, item: value })
      inputRef.current.disabled = true;
    }
  }

  const changeFocus = () => {
    inputRef.current.disabled = false;
    inputRef.current.focus();
  }

  return (
    <motion.li
      initial={{
        x: '150vw',
        transition: { type: 'spring', duration: 2 }
      }}
      animate={{
        x: 0,
        transition: { type: 'spring', duration: 2 }
      }}
      whileHover={{
        scale: 0.9,
        transition: { type: 'spring', duration: 0.1 }
      }}
      exit={{
        x: '-60vw',
        scale: [1,0],
        transition: { duration: 0.5 },
        backgroundColor: 'rgba(255,0,0,1)'
      }}
      className="card"
    >
      <h6 style={{ marginBottom: '5px' }}>{item.title}</h6>
      <textarea
        ref={inputRef}
        disabled={inputRef}
        defaultValue={item.item}
        onKeyPress={(e) => handleUpdateTodo(item.id, inputRef.current.value, e)}
      />
      <span>{item.create}</span>
      <div className="btns">
        <motion.button
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => changeFocus()}
        >
          <AiFillEdit />
        </motion.button>
        {item.completed === false && (
          <motion.button
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.9 }}
            style={{ color: 'green' }}
            onClick={() => completeTodo(item.id)}
          >
            <IoCheckmarkDoneSharp />
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}
          style={{ color: 'red' }}
          onClick={() => removeTodo(item.id)}
        >
          <IoClose />
        </motion.button>
      </div>
      {item.completed && (
        <span className="completed">done</span>
      )}
    </motion.li>
  );
};

export default TodoItem;
