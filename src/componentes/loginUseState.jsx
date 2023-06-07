import { useState } from "react"


function LoginUseState() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isLogin, setIslogin] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true)
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
            setIslogin(true);
            setLoading(false)
        } catch (error) {
            setError(`Invalid username or password: ${error}`);
            setIslogin(false);
            setUsername("");
            setPassword("");
        }
    }

    const logout = () => {
        setIslogin(false);
        setLoading(false);
    }

    return (

        <div>
            {
                isLogin ?
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
                                onChange={(e) => setUsername(e.currentTarget.value)} />

                            <input
                                type="text"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.currentTarget.value)} />

                                <button type="submit">
                                    {isLoading ? "Loggin..." : "Login"}
                                </button>
                        </form>
                    )
            }
        </div>
    )
}

export default LoginUseState