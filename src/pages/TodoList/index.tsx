import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Header } from "../../components/Header";
import { TodoItem } from "../../components/TodoItem";
import { EmptyList } from "../../components/EmptyList";

import plusCircleImg from "../../assets/plus-circle.svg";

import { api } from "../../services/api";
import { ITodo } from "../../types/Todo";

import styles from "./styles.module.css";

type IListActiveProps = "todo" | "done"

export function TodoList() {
    const [title, setTitle] = useState("");
    const [list, setList] = useState<ITodo[]>([]);
    const [listActive, setListActive] = useState<IListActiveProps>("todo");

    const todoList = list.filter(todo => !todo.isCompleted)
    const completedTodoList = list.filter(todo => todo.isCompleted)

    useEffect(() => {
        getTodos();
    }, []);
    
    async function getTodos() {
        await api.get("/todos").then(response => {
            setList(response.data);   
        });
    }

    async function handleDeleteTodo(id: string) {
        toast.promise(api.delete(`/todos/${id}`).then(() => {
            const oldList = [...list];
            const newList = oldList.filter(todo => todo._id !== id);
    
            setList(newList);
        }), {
            success: "Tarefa deletada. 😁",
            pending: "Deletando tarefa... 👀",
            error: "Erro ao deletar tarefa. 😧"
        });
    }
    
    function handleChangeStatusTodo(id: string, isCompleted: boolean) {
        const sucessMessage = 
            isCompleted ? "Tarefa concluída. 👏" : "Tarefa desmarcada. ✅ ";
        
        const errorMessage = 
            isCompleted ? "Erro ao concluir tarefa. 😧" : "Erro ao desmarcar tarefa. 😧";
        
        toast.promise(api.patch(`/todos/${id}`, { isCompleted }).then(response => {
            const newList = [...list];
    
            newList.forEach((todo) => {
                if(id === todo._id) {
                    todo.isCompleted = response.data.isCompleted;
                }
            });
    
            setList(newList);
        }), {
            success: sucessMessage,
            pending: "Alterando status da tarefa... 👀",
            error: errorMessage
        });
    }
    
    function handleCreateNewTodo(event: FormEvent) {
        event.preventDefault();
        
        toast.promise(api.post("/todos", { title }).then(response => {
            const todo = response.data;
            
            setTitle("");
            setList(list => [...list, todo]);
        }), {
            success: "Tarefa criada. 🥳",
            pending: "Criando tarefa... 👀",
            error: "Erro ao criar tarefa. 😧"
        });
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
                                    key={todo._id}
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
                                    key={todo._id}
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