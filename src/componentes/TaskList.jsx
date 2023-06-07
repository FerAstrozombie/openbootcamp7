import { useReducer, useRef } from "react"

const TaskList = () => {

    const inputRef = useRef();

    const [task, dispatch] = useReducer((state = [], action) => {
        switch (action.type) {
            case "ADD":{
                return [
                    ...state,
                    {id: state.length, title: action.title}
                ]
            }
            case "REMOVE":{
                return state.filter((task, index) => index != action.index)
            }
            default: {
                return state;
            }
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: "ADD",
            title: inputRef.current.value
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" ref={ inputRef }/>
                <button type="submit">Add</button>
            </form>
            <div>
                {
                    task && task.map((task, index) => (
                        <div key={index}>
                            <p>{task.title}</p>
                            <button onClick={() => dispatch({ type: "REMOVE", index })}>Borrar</button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default TaskList