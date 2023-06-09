import { useReducer } from "react";

const FIELD = "FIELD";
const LOGIN = "LOGIN";
const SUCESS = "SUCESS";
const ERROR = "ERROR";
const LOGOUT = "LOGOUT";

const initialState = {
    username: "",
    password: "",
    error: "",
    isLoading: false,
    isLoggedIn: false
}

const loginReducer = (state, action) => {
    switch (action.type) {
        case FIELD:
            return {
                ...state,
                [action.fieldName]: action.payload
            }
        case LOGIN:
            return {
                ...state,
                error: "",
                isLoading: true,
            }
        case SUCESS:
            return {
                ...state,
                error: "",
                isLoading: false,
                isLoggedIn: true
            }
        case ERROR:
            return {
                ...state,
                error: "Invalid username or password",
                isLoading: false,
                isLoggedIn: false,
                username: "",
                password: ""
            }
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
            }
        default:
            break;
    }
}

function LoginUseReducer() {

    const [state, dispatch] = useReducer(loginReducer, initialState);

    const { username, password, error, isLoading, isLoggedIn } = state;

    const submit = async (e) => {
        e.preventDefault();
        dispatch({ type: LOGIN });
        try {
            await function login({ username, password }) {
                setTimeout(() => {
                    new Promise((resolve, reject) => {
                        if (username === "admin" && password === "admin") {
                            resolve()
                        } else {
                            reject()
                        }
                    })
                }, 2000);
            }
            dispatch({ type: SUCESS })
        } catch (error) {
            dispatch({ type: ERROR })
        }
    }

    const logout = () => {
        dispatch({type: LOGOUT});
    }

    return (
        <div>
            {
                isLoggedIn ?
                    (
                        <div>
                            <h1>Welcome, {username}</h1>
                            <button onClick={logout}>
                                Logout
                            </button>
                        </div>
                    )
                    :
                    (
                        <form onSubmit={submit}>
                            {
                                error && <p style={{ color: "tomato" }}>{error}</p>
                            }
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) =>
                                    dispatch({ type: FIELD, fieldName: "username", payload: e.currentTarget.value })
                                } />

                            <input
                                type="text"
                                placeholder="Password"
                                value={password}
                                onChange={(e) =>
                                    dispatch({ type: FIELD, fieldName: "password", payload: e.currentTarget.value })
                                } />

                            <button type="submit">
                                {isLoading ? "Loggin..." : "Login"}
                            </button>
                        </form>
                    )
            }
        </div>
    )
}

export default LoginUseReducer