import moment from "moment/moment"
import React, { useEffect, useState } from "react"
import { UseCaseFactory } from "../UseCaseFactory"
import Button from "./Button"
import Input from "./Input"
import Modal from "./Modal"
import Sidebar from "./Sidebar"

export default function ClientWrapper(props) {
    const useCaseFactory = new UseCaseFactory()
    const { children } = props
    const [currentTime, setCurrentTime] = useState(useCaseFactory.currentTime().get())
    const [isModalChangePasswordOpen, setIsModalChangePasswordOpen] = useState(false)
    const [changePasswordReq, setChangePasswordReq] = useState({
        old_password: "",
        new_password: "",
        renew_password: ""
    })

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(useCaseFactory.currentTime().get())
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    const handleOnSubmitChangePassword = () => {
        useCaseFactory.changePassword().execute(changePasswordReq)
            .subscribe({
                next: (response) => {
                    if (response.error_schema.error_code === 200) {
                        console.log(response.error_schema.error_message)
                        setChangePasswordReq({
                            old_password: "",
                            new_password: "",
                            renew_password: ""
                        })
                        setIsModalChangePasswordOpen(false)
                        doLogout()
                    }
                }
            })
    }

    const doLogout = () => {
        useCaseFactory.currentSession().clear()
        window.location.assign("/login")
    }

    return <div>
        <div className="fixed h-[100vh  ] w-[20vw] left-0">
            <Sidebar openModalChangePassword={() => setIsModalChangePasswordOpen(true)} doLogout={doLogout} />
        </div>
        <div className="bg-white fixed h-[100vh] w-[80vw] right-0 overflow-y-scroll">
            <div className="relative">
                <div className="p-8">
                    {children}
                </div>
            </div>
        </div>
        <Modal
            isOpen={isModalChangePasswordOpen}
            onClose={() => setIsModalChangePasswordOpen(false)}
            title="Change Password"
        >
            <Input
                type="password"
                placeholder="Old Password"
                value={changePasswordReq.old_password}
                onChange={(e) => setChangePasswordReq({
                    ...changePasswordReq,
                    old_password: e.target.value
                })}
            />
            <Input
                type="password"
                placeholder="New Password"
                value={changePasswordReq.new_password}
                onChange={(e) => setChangePasswordReq({
                    ...changePasswordReq,
                    new_password: e.target.value
                })}
            />
            <Input
                type="password"
                placeholder="Retype New Password"
                value={changePasswordReq.renew_password}
                onChange={(e) => setChangePasswordReq({
                    ...changePasswordReq,
                    renew_password: e.target.value
                })}
            />
            <Button
                onClick={handleOnSubmitChangePassword}
                size="md"
                color="yellow"
            >
                Update
            </Button>
        </Modal>
        <p className="fixed right-4 bottom-2">{moment(currentTime).format("YYYY-MM-DD HH:mm:ss")}</p>
    </div>
}