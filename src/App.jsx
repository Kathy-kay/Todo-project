import { useState } from 'react'
import desktopDark  from '../src/assets/desktopDark.jpg'
import mobileDark from '../src/assets/mobileDark.jpg'
import sun from '../src/assets/icon-sun.svg'
import moon from '../src/assets/icon-moon.svg'
//import {BiTrashAlt}from 'react-icons/bi'/
import {VscEdit} from 'react-icons/vsc'

import './App.css'

function App() {
    const [input, setInput] = useState('')
    const [todoList, setTodoList] = useState([])
    const [editId, setEditId] = useState(0)
    const [complete, setComplete] = useState(false)
    const [lightMode, setLightMode] = useState(false)



    const switchTheme = () =>{
      const newTheme = lightMode? 'light': 'dark';
      setLightMode(newTheme)
    }

    const updateTodo = (id, text) =>{
      const updatedTodo = todoList.map((t) =>
      t.id === id?{id, text}
      :t
      )
      setTodoList(updatedTodo) 
    }


    const handleSubmit = (e) =>{
      e.preventDefault(); 
      if(editId){
        let text = input
        updateTodo(editId.id, text)
        setEditId(0)
        setInput('')
        return
      }
     

     if(input !== ''){
      const newTask = {
        id: Math.floor(Math.random() * 1000) + 1,
        text: input,
        completed: complete
      }
      setTodoList([...todoList, newTask])
      
     }
      setInput('')
      
    }
  

    
    //console.log(input)
    const handleChange = (e) =>{
      e.preventDefault();
      setInput(e.target.value);
    }

    const handleDelete = (id) =>{
        const newTodoList = todoList.filter((task) =>{
          return task.id !== id;
        })
        setTodoList([...newTodoList]);
    }

    const handleEdit = (id) =>{
      const editTodo = todoList.find((task) => {
        return task.id === id;
       
      })
      setInput(editTodo.text);
      setEditId(editTodo);
    }
    const toggleCompleted = (id) =>{
      const completeTodo = todoList.map((task) =>{
        if(task.id === id){
          task.completed = !task.completed
         
        }
        return task
      })
      setTodoList(completeTodo);
      console.log(completeTodo)
    }


  return (
    <div className="App" data-theme={lightMode}>
      <picture className='picture'>
        <source srcSet={desktopDark} media="(min-width:485px)"/>
        <img src={mobileDark} 
        alt="dark desktop image"
        onClick={switchTheme} />
      </picture>
        
        <div className="todo-container">
            <div className="todo">
              <div className="heading">
                <h1>TODO</h1>
                {lightMode ?
                <img src={moon} 
                alt="moon icon"
                className='sun'
                onClick={switchTheme}/>
                :
                <img src={sun} 
                alt="sun icon"
                className='sun'
                onClick={switchTheme}/>
                }
              </div>
              <form className="input" onSubmit={handleSubmit}>
              <input type="text"
                 id='todo-text'
                 placeholder='Create a new todo...'
                 value={input}
                 name="text"
                 onChange={handleChange}/>
                 <button type='submit' className="add-task">{editId?"Edit":"Add"}</button>
              </form>
            
            <div className="todo-list">
              {todoList.map((task) =>{
                return(
                  <ul className="todo-item" 
                  key={task.id}
                   
                  >
                    <div className='check-task'>

                      <button className={`btn ${task.completed?'active': null}`} onClick={() => toggleCompleted(task.id)}><span></span></button>
                    {/*<input type="checkbox" 
                    name='checkbox' 
                    onChange={(e) => console.log(e.target.value)}
                    checked={task.completed}
                />*/}
                    <li className='list'>{task.text}</li>
                    </div>
                    <div className="button">
                      <button 
                      onClick={() => handleEdit(task.id)}><VscEdit/></button>
                      <button
                      onClick={() => handleDelete(task.id)}>X</button>
                    </div>
                  </ul>
                )
              })}
            </div>
            </div>
        </div>
       
    </div>
  )
}

export default App
