import React, { useReducer, useContext } from "react";

const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const RESET = "RESET";

const myContext = React.createContext(null);

const initialState = {
    count: 0
}

const reducer = (state, action) => {

    switch (action.type) {
        case INCREMENT:
            return {
                ...state,
                count: state.count + action.payload.quantity
            }
        case DECREMENT:
            return {
                count: state.count - action.payload.quantity
            }
        case RESET:
            return {
                count: 0
            }

        default:
            return state;
    }
}

const Counter = () => {

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <myContext.Provider value={state}>
            <div>
                Points: {state.count}
                <button
                    onClick={
                        () => dispatch({
                            type: INCREMENT,
                            payload: {
                                quantity: 1
                            }
                        })
                    }>
                    Increment
                </button>
                <button
                    onClick={
                        () => dispatch({
                            type: DECREMENT,
                            payload: {
                                quantity: 1
                            }
                        })
                    }>
                    Decrement
                </button>
                <button
                    onClick={
                        () => dispatch({ type: RESET })
                    }>
                    Reset
                </button>
            </div>
        </myContext.Provider>
    )
}

export default Counter;
