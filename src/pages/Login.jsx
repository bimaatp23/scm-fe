import { useState } from "react"
import { UseCaseFactory } from "../UseCaseFactory"
import Button from "../components/Button"
import Input from "../components/Input"

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
          <Input
            id="username"
            type="text"
            placeholder="Username"
            value={loginReq.username}
            onChange={handleOnChange}
            onKeyDown={handleOnEnter}
            className="w-full"
          />
        </div>
        <div className="mb-4">
          <Input
            id="password"
            type="password"
            placeholder="Password"
            value={loginReq.password}
            onChange={handleOnChange}
            onKeyDown={handleOnEnter}
            className="w-full"
          />
        </div>
        <div className="mb-2 flex items-center justify-center">
          <Button
            onClick={onLogin}
            size="md"
            color="blue"
          >
            Login
          </Button>
        </div>
        <div className="flex items-center justify-center">
          <p className="font-bold">Don't have an account?</p>
        </div>
        <div className="flex items-center justify-center">
          <Button
            onClick={() => window.location.assign("/create-retail")}
            size="sm"
            color="green"
            className="mx-1"
          >
            Create Retail
          </Button>
          <Button
            onClick={() => { }}
            size="sm"
            color="gray"
            className="mx-1"
          >
            Create Supplier
          </Button>
        </div>
      </div>
    </div>
  )
}
