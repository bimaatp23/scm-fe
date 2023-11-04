import { useState } from "react"
import { UseCaseFactory } from "../UseCaseFactory"

export default function Login() {
  const useCaseFactory = new UseCaseFactory()
  const [loginReq, setLoginReq] = useState({
    username: "",
    password: ""
  })

  const handleUsernameChange = (e) => {
    setLoginReq({
      ...loginReq,
      username: e.target.value
    })
  }

  const handlePasswordChange = (e) => {
    setLoginReq({
      ...loginReq,
      password: e.target.value
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
      <div className="bg-white shadow-md rounded-md w-80 p-4 sm:w-96 sm:p-6">
        <h1 className="text-2xl font-bold mb-4 sm:text-3xl sm:mb-6">Login</h1>
        <div className="mt-2 mb-4">
          <label className="flex justify-start text-base font-semibold mb-2 ml-1 sm:text-lg" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-0 focus:border-gray-600"
            id="username"
            type="text"
            placeholder="Username"
            value={loginReq.username}
            onChange={handleUsernameChange}
            onKeyDown={handleOnEnter}
          />
        </div>
        <div className="my-2">
          <label className="flex justify-start text-base font-semibold mb-2 ml-1 sm:text-lg" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-0 focus:border-gray-600"
            id="password"
            type="password"
            placeholder="Password"
            value={loginReq.password}
            onChange={handlePasswordChange}
            onKeyDown={handleOnEnter}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-sky-700 hover:bg-sky-500 text-white text-base font-bold py-2 px-4 mt-2 rounded sm:text-lg focus:outline-none focus:shadow-outline"
            onClick={onLogin}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  )
}
