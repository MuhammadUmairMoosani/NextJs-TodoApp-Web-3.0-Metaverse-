import React,{useState} from 'react';
import Head from 'next/head'
import styles from '@/styles/Home.module.css'

export default function Todo() {
  
  type User =  [{id:number,value:string,done:boolean}] | [];

  const [todoList,setTodoList] = useState<User>([])
  const [todo,setTodo] = useState('');

  const deleteTodoItem =(index:number) => {
    const preList = todoList;
    preList.splice(index,1);
    setTodoList([...preList]);
  }

  const finishNUnfinishItem = (index:number) => {
    const preList = todoList;
    preList[index].done = !preList[index].done;
    setTodoList([...preList])
  }

  const addItem = () => {
    if(todo) {
      let preList: User = todoList;
      const data = {
        id:preList.length + 1,
        value:todo,
        done:false
      }
      if(!preList.length) {
        preList = [data];
      } else {
        preList.unshift(data);
      }
      setTodo('');
      setTodoList(preList);
    } 
  }
  

  return (
    <>
      <Head>
        <title>Todo App</title>
      </Head>
      <main 
      className={styles.main}
      >
        <div style={{width: '100%'}}>
        <h1 className={styles.heading}>TODO LIST</h1>
        <div style={{display: 'flex'}}>
        <input className={styles.input} value={todo} placeholder="Enter todo list item" onChange={(value) => setTodo(value.target.value)} />
        <button className={styles.addBtn} onClick={addItem} disabled={todo === null}>Add</button>
        </div>
        <ul>
        {todoList.map((item,index) => 
        <li key={`${index + item.value}`} style={{display: 'flex',alignItems:"center"}}>
        <h3 className={styles.todoItem} style={{ textDecorationLine: item.done ? "line-through" :""}}>{item.value}</h3>
        <button className={styles.finishBtn}  onClick={() => finishNUnfinishItem(index)} style={{backgroundColor: item.done ? "#858796" : "#1cc88a", borderColor:  item.done     ? "#858796" : "#1cc88a"}}>{item.done ? "Unfinish" : "Finish" } </button>
        <button className={styles.deleteBtn} onClick={() => deleteTodoItem(index)}>Delete</button></li>
         )}
         </ul>
        </div>
      </main>
    </>
  )
}
