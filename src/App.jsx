// import React, { useState } from 'react'

// function TodoList() {

// const [tasks, setTasks] = useState([])
// const [newTask, setNewTask] = useState("")

// function handleInputChange(event){
// setNewTask(event.target.value)
// }
// function addTask(){

//   if(newTask.trim() !== ""){
// setTasks([...tasks,newTask]);
// setNewTask("")
//   }

// }
// function deleteTask(index){
// const updatedTask =tasks.filter((_,i) => i !== index);
// setTasks(updatedTask)
// }

// // function moveTaskUp(index){
// // if(index > 0){
// //   const updatedTasks = [...tasks]
// //   [updatedTasks[index],updatedTasks [index -1]] =
// //    [updatedTasks[index -1], updatedTasks[index]]
// //    setTasks(updatedTasks);
// //   }
// // }

// // function moveTaskDown(index){
// // if(index < task.length -1){
// //   const updatedTasks = [...tasks]
// //   [updatedTasks[index],updatedTasks [index -1]] =
// //    [updatedTasks[index -1], updatedTasks[index]]
// //    setTasks(updatedTasks);
// //   }
// // }

//   return(
//   <div className="to-do-list">
//     <h1>To-do-List</h1>

//     <div>
//       <input
//        type="text" 
//        placeholder='Enter a task ...'
//        value={newTask}
//        onChange={handleInputChange}/>
//        <button
//        className='add-button'
//        onClick={addTask}>
//         add
//        </button>
//     </div>

// <ol>

// {tasks.map((task,index) => 
//  <li key={index}>
  
// <span className='text'>{task}</span>
//  <button className="delete-button"
//  onClick={() => deleteTask(index)}>
//   Delete
//  </button>

//   {/* <button classNmae="move-button"
//  onClick={() => moveTaskUp(index)}>
//   ☝️
//  </button>

//   <button classNmae="move-button"
//  onClick={() => moveTaskDown(index)}>
//   👇
//  </button> */}


//  </li>
// )}  

// </ol>


//   </div> )
// }

// export default TodoList




import { useReducer, useState } from 'react'

function Reducer(state, action) {
  switch (action.type) {

    case "ADD":
      return [...state, action.payload]

    case "EDit":
      return state.map((item, index) =>
        index === action.id ? action.payload : item
      )

    case "DELETE":
      return state.filter((_, index) => index !== action.id)

    default:
      return state
  }
}

function App() {
  const [todos, dispatch] = useReducer(Reducer, [])
  const [text, setText] = useState("")
  const [editId, setEditId] = useState(null)

  function handleSubmit() {
    if (text.trim() === "") return

    if (editId !== null) {
      dispatch({
        type: "EDit",
        id: editId,
        payload: text
      })
      setEditId(null)
    } else {
      dispatch({
        type: "ADD",
        payload: text
      })
    }

    setText("")
  }

  function handleEdit(index) {
    setText(todos[index])
    setEditId(index)
  }

  function handleDelete(index) {
    dispatch({
      type: "DELETE",
      id: index
    })
  }

  return (
    <>
      <h1>Todo</h1>

      <input
        type="text"
        value={text}
        placeholder="Enter"
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={handleSubmit}>
        {editId !== null ? "Update" : "Add"}
      </button>

      {todos.map((item, index) => (
        <div key={index}>
          <h3>{item}</h3>

          <button onClick={() => handleEdit(index)}>Edit</button>

          <button onClick={() => handleDelete(index)}>Delete</button>
        </div>
      ))}
    </>
  )
}

export default App