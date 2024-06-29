import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { Todoprovider } from './contexts';
import ToDoForm from './components/ToDoForm';
import Todoitem from './components/Todoitem';

function App() {
  const [todos,setTodos]=useState([]);

  const addTodo=(todo)=>{
    //adding todo at the end with unique id after prev that is saving the prev array.. like appending
    setTodos((prev)=>[...prev,{id:Date.now(), ...todo}])
  }

  const updateTodo=(id,todo)=>{
    setTodos((prev)=> prev.map((prevTodo)=>prevTodo.id===id ? todo : prevTodo))
  }

  const deleteTodo=(id)=>{
    setTodos((prev)=>prev.filter((todo)=>todo.id!==id));
    //jis id ko pass kiye usko chorke baki sab le lena
  }

  
  const toggleComplete = (id) => {
    //console.log(id);
    setTodos((prev) => 
    prev.map((prevTodo) => 
      prevTodo.id === id ? { ...prevTodo, 
        completed: !prevTodo.completed } : prevTodo))
  }

  //getting or extracting from local storage
  useEffect(() => {
    const todos=JSON.parse(localStorage.getItem("todos"));

    if(todos && todos.length >0){
      setTodos(todos)
    }
  }, [])

  //saving in local storage
  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])
  

  return (
    <Todoprovider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
      <div className="bg-[#1e4784] min-h-screen py-8">
          <div className=" bg-[#212121] w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
              <h1 className="text-2xl font-bold text-center mb-8 mt-2">List Your Todos!</h1>
              <div className="mb-4">
                  {/* Todo form goes here */} 
                  <ToDoForm/>
              </div>
              <div className="flex flex-wrap gap-y-3">
                  {/*Loop and Add TodoItem here */}
                  {todos.map((todo)=>(
                    <div key={todo.id} className='w-full'>
                      <Todoitem todo={todo}/>
                    </div>
                  ))}
              </div>
          </div>
      </div>
    </Todoprovider>
  )
}

export default App
