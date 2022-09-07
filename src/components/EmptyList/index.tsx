import listImg from "../../assets/list.svg";

import styles from "./styles.module.css";


interface EmptyListProps {
    type: "todo" | "done"
}

export function EmptyList({ type }: EmptyListProps) {
    return (
        <div className={styles.emptyList}>
            <img src={listImg} alt="" />
            <div>
                <p>
                    { type === "todo" ? (
                        "Você ainda não tem tarefas cadastradas"
                    ) : (
                        "Você ainda não tem tarefas concluídas"
                    )}
                </p>
                
                <p>
                    { type === "todo" ? (
                        "Crie tarefas e organize seus itens a fazer"
                    ) : (
                        "Conclua tarefas e organize seus itens aqui"
                    )}
                </p>
            </div>
        </div>
    )
}