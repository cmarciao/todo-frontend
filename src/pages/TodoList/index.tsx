import { FormEvent, useState } from "react";
import { v4 as uuid } from "uuid";

import { Header } from "../../components/Header";
import { EmptyList } from "../../components/EmptyList";

import plusCircleImg from "../../assets/plus-circle.svg";

import styles from "./styles.module.css";
import { ITodo } from "../../types/Todo";
import { TodoItem } from "../../components/TodoItem";

type IListActiveProps = "todo" | "done"

export function TodoList() {
    const [title, setTitle] = useState("");
    const [list, setList] = useState<ITodo[]>([]);
    const [listActive, setListActive] = useState<IListActiveProps>("todo");

    const todoList = list.filter(todo => !todo.isCompleted)
    const completedTodoList = list.filter(todo => todo.isCompleted)

    function handleDeleteTodo(id: string) {
        const oldList = [...list];
        const newList = oldList.filter(todo => todo.id !== id);

        setList(newList);
    }

    function handleCreateNewTodo(event: FormEvent) {
        event.preventDefault();

        const newTodo: ITodo = {
            id: uuid(),
            title,
            isCompleted: false,
            created_at: new Date()
        }

        setTitle("");
        setList(list => [...list, newTodo]);
    }

    function handleChangeStatusTodo(id: string) {
        const newList = [...list];

        console.log(id)

        newList.forEach((todo) => {
            if(id === todo.id) {
                todo.isCompleted = !todo.isCompleted;
            }
        })

        setList(newList);
    }

    return (
        <>
            <Header />

            <main className={styles.main}>
                <div>
                    <form action="" onSubmit={handleCreateNewTodo}>
                        <input
                            type="text"
                            placeholder="Adicione uma nova tarefa"
                            onChange={e => setTitle(e.target.value)}
                            value={title}
                        />
                        
                        <button type="submit">
                            Criar
                            <img src={plusCircleImg} alt="" />
                        </button>
                    </form>
                    
                    <div className={styles.choiceListType}>
                        <button
                            className={listActive === "todo" ? styles.active : ""}
                            onClick={() => listActive === "done" &&  setListActive("todo")}    
                        >
                            Tarefas criadas
                            <span>{todoList.length}</span>
                        </button>
                        
                        <button
                            className={listActive === "done" ? styles.active : ""}
                            onClick={() => listActive === "todo" && setListActive("done")}
                        >
                            Concluídas
                            <span>
                                {completedTodoList.length} 
                                {completedTodoList.length > 0 && ` de ${list.length}`}
                            </span>
                        </button>
                    </div>

                    <div className={styles.list}>
                        {todoList.length === 0 && listActive === "todo" ? (
                            <EmptyList type="todo" />
                        ) : (
                            listActive === "todo" && todoList.map(todo => (
                                <TodoItem
                                    key={todo.id}
                                    todo={todo}
                                    handleDeleteTodo={handleDeleteTodo}
                                    handleChangeStatusTodo={handleChangeStatusTodo}
                                />
                            ))
                        )}

                        {completedTodoList.length === 0 && listActive === "done" ? (
                            <EmptyList type="done" />
                        ) : (
                            listActive === "done" && completedTodoList.map(todo => (
                                <TodoItem
                                    key={todo.id}
                                    todo={todo}
                                    handleDeleteTodo={handleDeleteTodo}
                                    handleChangeStatusTodo={handleChangeStatusTodo}
                                />
                            ))
                        )}
                    </div>
                </div>
            </main>
        </>
    )
}