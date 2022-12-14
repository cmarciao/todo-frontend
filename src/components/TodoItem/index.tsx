import { ITodo } from "../../types/Todo";

import trashImg from "../../assets/trash.svg";

import styles from "./styles.module.css";

interface TodoItemProps {
  todo: ITodo;
  handleDeleteTodo: (id: string) => void;
  handleChangeStatusTodo: (id: string, isCompleted: boolean) => void;
}

export function TodoItem({ todo, handleDeleteTodo, handleChangeStatusTodo}: TodoItemProps) {
  return (
    <div className={styles.cardItem}>
      <input
        id={`isComplted-${todo._id}`} type="checkbox"
        defaultChecked={todo.isCompleted}
        onClick={() => handleChangeStatusTodo(todo._id, !todo.isCompleted)} 
      />
      <label 
        htmlFor={`isComplted-${todo._id}`}>
      </label>

      <p className={todo.isCompleted ? styles.done : ""}>{todo.title}</p>
      
      <button onClick={() => handleDeleteTodo(todo._id)}>
          <img src={trashImg} alt="" />        
      </button>
    </div>
  )
}