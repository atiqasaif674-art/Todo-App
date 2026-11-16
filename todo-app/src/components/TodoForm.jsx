//TodoForm user se task leta hai.
//addTodo us task ko list mein add karta hai
import { useState } from "react";
//Jab hum TodoForm ke andar addTodo("Learn React") call karte hain, to parent 
//component ka function execute hota hai.
function TodoForm({  onAddTodo }) {
  //text	Input ki current value store karta ha setText	text ki value update karta hai.
  const [text, setText] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    const trimmedText = text.trim();
    //Is condition ka kaam hai check karna ke user ne koi valid text enter kiya hai ya nahi
    if (!trimmedText) {
      return;
    }
    onAddTodo(trimmedText);
    //Iska faida yeh hai ke user empty task add nahi kar sakta
    setText("");
  }
  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Enter your task..." value={text} onChange={(event) => setText(event.target.value)}/>
      <button type="submit">Add Task +</button>
    </form>
  );
}
export default TodoForm;