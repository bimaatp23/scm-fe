import { useState } from "react"
import { UseCaseFactory } from "../UseCaseFactory"
import Button from "../components/Button"

export default function CreateRetail() {
  const useCaseFactory = new UseCaseFactory()
  const [createRetailReq, setCreateRetailReq] = useState({
    name: "",
    username: "",
    password: "",
    re_password: "",
    business_name: "",
    address: "",
    email: "",
    phone: ""
  })

  const handleOnChange = (e) => {
    setCreateRetailReq({
      ...createRetailReq,
      [e.target.id]: e.target.value
    })
  }

  const onCreate = (e) => {
    e.preventDefault()
    useCaseFactory.createRetail().execute(createRetailReq)
      .subscribe({
        next: (response) => {
          if (response.error_schema.error_code === 200) {
            window.location.assign("/login")
          }
        }
      })
  }

  const handleOnEnter = (e) => {
    if (e.key == "Enter") {
      onCreate(e)
    }
  }

  return (
    <div className="h-screen flex justify-center items-center bg-sky-700">
      <div className="bg-white shadow-md rounded-md w-96 p-4">
        <h1 className="text-2xl font-bold mb-2">Create Retail</h1>
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-0 focus:border-gray-600"
            id="name"
            type="text"
            placeholder="Name"
            value={createRetailReq.name}
            onChange={handleOnChange}
            onKeyDown={handleOnEnter}
          />
        </div>
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-0 focus:border-gray-600"
            id="username"
            type="text"
            placeholder="Username"
            value={createRetailReq.username}
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
            value={createRetailReq.password}
            onChange={handleOnChange}
            onKeyDown={handleOnEnter}
          />
        </div>
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-0 focus:border-gray-600"
            id="re_password"
            type="password"
            placeholder="Re-Password"
            value={createRetailReq.re_password}
            onChange={handleOnChange}
            onKeyDown={handleOnEnter}
          />
        </div>
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-0 focus:border-gray-600"
            id="business_name"
            type="text"
            placeholder="Business Name"
            value={createRetailReq.business_name}
            onChange={handleOnChange}
            onKeyDown={handleOnEnter}
          />
        </div>
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-0 focus:border-gray-600"
            id="address"
            type="text"
            placeholder="Address"
            value={createRetailReq.address}
            onChange={handleOnChange}
            onKeyDown={handleOnEnter}
          />
        </div>
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-0 focus:border-gray-600"
            id="email"
            type="text"
            placeholder="Email"
            value={createRetailReq.email}
            onChange={handleOnChange}
            onKeyDown={handleOnEnter}
          />
        </div>
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-0 focus:border-gray-600"
            id="phone"
            type="text"
            placeholder="Phone"
            value={createRetailReq.phone}
            onChange={handleOnChange}
            onKeyDown={handleOnEnter}
          />
        </div>
        <div className="mb-2 flex items-center justify-center">
          <Button
            onClick={onCreate}
            size="md"
            color="blue"
          >
            Create
          </Button>
        </div>
        <div className="flex items-center justify-center">
          <p className="font-bold">Already have an account?</p>
          <Button
            onClick={() => window.location.assign("/login")}
            size="sm"
            color="green"
            className="mx-1"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  )
}