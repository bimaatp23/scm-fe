import { useState } from "react"
import { UseCaseFactory } from "../UseCaseFactory"
import { setNotification } from "../Utils"
import Button from "../components/Button"
import Input from "../components/Input"

export default function CreateSupplier() {
  const useCaseFactory = new UseCaseFactory()
  const [createSupplierReq, setCreateSupplierReq] = useState({
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
    setCreateSupplierReq({
      ...createSupplierReq,
      [e.target.id]: e.target.value
    })
  }

  const onCreate = (e) => {
    e.preventDefault()
    useCaseFactory.createSupplier().execute(createSupplierReq)
      .subscribe({
        next: (response) => {
          if (response.error_schema.error_code === 200) {
            setNotification({
              icon: "success",
              message: response.error_schema.error_message
            })
            window.location.assign("/login")
          }
        }
      })
  }

  const handleOnEnter = (e) => {
    if (e.key === "Enter") {
      onCreate(e)
    }
  }

  return (
    <div className="h-screen flex justify-center items-center bg-sky-700">
      <div className="bg-white shadow-md rounded-md w-96 p-4">
        <h1 className="text-2xl font-bold mb-2">Create Supplier</h1>
        <div className="mb-4">
          <Input
            id="name"
            type="text"
            placeholder="Name"
            value={createSupplierReq.name}
            onChange={handleOnChange}
            onKeyDown={handleOnEnter}
            className="w-full"
          />
        </div>
        <div className="mb-4">
          <Input
            id="username"
            type="text"
            placeholder="Username"
            value={createSupplierReq.username}
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
            value={createSupplierReq.password}
            onChange={handleOnChange}
            onKeyDown={handleOnEnter}
            className="w-full"
          />
        </div>
        <div className="mb-4">
          <Input
            id="re_password"
            type="password"
            placeholder="Re-Password"
            value={createSupplierReq.re_password}
            onChange={handleOnChange}
            onKeyDown={handleOnEnter}
            className="w-full"
          />
        </div>
        <div className="mb-4">
          <Input
            id="business_name"
            type="text"
            placeholder="Business Name"
            value={createSupplierReq.business_name}
            onChange={handleOnChange}
            onKeyDown={handleOnEnter}
            className="w-full"
          />
        </div>
        <div className="mb-4">
          <Input
            id="address"
            type="text"
            placeholder="Address"
            value={createSupplierReq.address}
            onChange={handleOnChange}
            onKeyDown={handleOnEnter}
            className="w-full"
          />
        </div>
        <div className="mb-4">
          <Input
            id="email"
            type="text"
            placeholder="Email"
            value={createSupplierReq.email}
            onChange={handleOnChange}
            onKeyDown={handleOnEnter}
            className="w-full"
          />
        </div>
        <div className="mb-4">
          <Input
            id="phone"
            type="text"
            placeholder="Phone"
            value={createSupplierReq.phone}
            onChange={handleOnChange}
            onKeyDown={handleOnEnter}
            className="w-full"
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