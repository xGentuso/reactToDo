//import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import TodoBanner from './TodoBanner';
import TodoRow from './TodoRow';
import TodoCreator from './TodoCreator';
import VisibilityControl from './VisibilityControl';

function App() {

	const [userName] = useState("Adam"); // change 1

	const [todoItems, setTodoItems] = useState([
		{ action: "Buy Flowers", done: false },
		{ action: "Get Shoes", done: false },
		{ action: "Collect Tickets", done: true },
		{ action: "Call Joe", done: false }
	]);

	const [showCompleted, setShowCompleted] = useState(true);

	// const [newItemText, setNewItemText] = useState(""); // change 2


	// const changeStateData = () => {
	//  setUserName((prevName) => (prevName === "Adam" ? "Bob" : "Adam")); // change 3
	// };

	// const updateNewTextValue = (event) => {
	//  setNewItemText(event.target.value); // change 4
	// };

	const createNewTodo = (task) => {
		if (!todoItems.find((item) => item.action === task)) {
			const updatedTodos = [...todoItems, {action: task, done: false}];
			setTodoItems(updatedTodos);
			localStorage.setItem("todos", JSON.stringify(updatedTodos));
		}
	};

	const toggleTodo = (todo) => {
		const updatedTodos = todoItems.map((item) => 
			item.action === todo.action
				? { ...item, done: !item.done } 
				: item
		);
		setTodoItems(updatedTodos);
			localStorage.setItem("todos", JSON.stringify(updatedTodos));
	};

	const todoTableRows = (doneValue) => todoItems.filter(item => item.done === doneValue).map(item =>
		<TodoRow key={ item.action } item={ item } toggle={ toggleTodo } />
	)

	useEffect(() => {
		try {
			const data = localStorage.getItem("todos");
			if (data) {
				const parsedData = JSON.parse(data);
				if (Array.isArray(parsedData)) {
					setTodoItems(parsedData);
				}
			} else {
				[userName] = "Adam";
				[todoItems] = [{ action: "Buy Flowers", done: false },
					{ action: "Get Shoes", done: false },
					{ action: "Collect Tickets", done: true },
					{ action: "Call Joe", done: false }
				];
				[showCompleted] = true;
			}
		}
		catch(error) {
			console.error("Failed to load todos", error)
		}
	})

	return (
		<div>
			<TodoBanner userName={ userName } todoItems={ todoItems } />

			<div className="m-3">
				<TodoCreator callback={ createNewTodo } />
			</div>

			<div className="container-fluid">
				<table className="table table-striped table-bordered">
					<thead>
						<tr>
							<th style={{width: '80%'}}>Description</th>
							<th style={{width: '20%'}}>Done</th>
						</tr>
					</thead>
					<tbody>
						{ todoTableRows(false) }
					</tbody>
				</table>
				<div className="bg-secondary text-white text-center p-2 d-flex justify-content-center align-items-center">
					<VisibilityControl 
						description="Completed Tasks"
						isChecked={ showCompleted }
						callback={ (checked) => setShowCompleted(checked) } />
				</div>

				{ showCompleted &&
					<table className="table table-striped table-bordered">
						<thead>
							<tr>
								<th style={{width: '80%'}}>Description</th>
								<th style={{width: '20%'}}>Done</th>
							</tr>
						</thead>
						<tbody>{ todoTableRows(true) }</tbody>
					</table>
				}
			</div>
		</div>
	)
};

export default App;
