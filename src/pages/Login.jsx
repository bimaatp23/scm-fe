import { useState } from "react"
import { UseCaseFactory } from "../UseCaseFactory"

export default function Login() {
  const useCaseFactory = new UseCaseFactory()
  const [loginReq, setLoginReq] = useState({
    username: "",
    password: ""
  })

  const handleOnChange = (e) => {
    setLoginReq({
      ...loginReq,
      [e.target.id]: e.target.value
    })
  }

  const onLogin = (e) => {
    e.preventDefault()
    useCaseFactory.login().execute(loginReq)
      .subscribe({
        next: (response) => {
          if (response.error_schema.error_code === 200) {
            window.location.assign("/")
          }
        }
      })
  }

  const handleOnEnter = (e) => {
    if (e.key == "Enter") {
      onLogin(e)
    }
  }

  return (
    <div className="h-screen flex justify-center items-center bg-sky-700">
      <div className="bg-white shadow-md rounded-md w-96 p-4">
        <h1 className="text-2xl font-bold mb-2">Login</h1>
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-0 focus:border-gray-600"
            id="username"
            type="text"
            placeholder="Username"
            value={loginReq.username}
            onChange={handleOnChange}
            onKeyDown={handleOnEnter}
          />
        </div>
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-0 focus:border-gray-600"
            id="password"
            type="password"
            placeholder="Password"
            value={loginReq.password}
            onChange={handleOnChange}
            onKeyDown={handleOnEnter}
          />
        </div>
        <div className="mb-2 flex items-center justify-center">
          <button
            className="bg-sky-700 hover:bg-sky-500 text-white font-bold py-1 px-2 rounded text-lg focus:outline-none focus:shadow-outline"
            onClick={onLogin}
          >
            Login
          </button>
        </div>
        <div className="flex items-center justify-center">
          <p className="font-bold">Don't have an account?</p>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-green-700 hover:bg-green-500 text-white text-base font-bold py-1 px-2 rounded mx-1 focus:outline-none focus:shadow-outline"
            onClick={() => window.location.assign("/create-retail")}
          >
            Create Retail
          </button>
          <button
            className="bg-gray-700 hover:bg-gray-500 text-white text-base font-bold py-1 px-2 rounded mx-1 focus:outline-none focus:shadow-outline"
          >
            Create Supplier
          </button>
        </div>
      </div>
    </div>
  )
}
