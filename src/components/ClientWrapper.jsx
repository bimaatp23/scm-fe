import moment from "moment/moment"
import React, { useEffect, useMemo, useState } from "react"
import { UseCaseFactory } from "../UseCaseFactory"
import { setNotification } from "../Utils"
import Button from "./Button"
import Input from "./Input"
import Modal from "./Modal"
import Sidebar from "./Sidebar"

export default function ClientWrapper(props) {
    const useCaseFactory = useMemo(() => new UseCaseFactory(), [])
    const { children } = props
    const [currentTime, setCurrentTime] = useState(useCaseFactory.currentTime().get())
    const [isModalChangePasswordOpen, setIsModalChangePasswordOpen] = useState(false)
    const [changePasswordReq, setChangePasswordReq] = useState({
        old_password: "",
        new_password: "",
        renew_password: ""
    })
    const [staticOpen, setStaticOpen] = useState(true)
    const [dinamicOpen, setDinamicOpen] = useState(true)
    const minimize = staticOpen ? dinamicOpen : staticOpen

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(useCaseFactory.currentTime().get())
        }, 1000)
        return () => clearInterval(interval)
    }, [useCaseFactory])

    const handleChangePassword = () => {
        useCaseFactory.changePassword().execute(changePasswordReq)
            .subscribe({
                next: (response) => {
                    if (response.error_schema.error_code === 200) {
                        setNotification({
                            icon: "success",
                            message: response.error_schema.error_message
                        })
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

    const handleOnEnter = (e) => {
        if (e.key === "Enter") {
            handleChangePassword()
        }
    }

    const doLogout = () => {
        useCaseFactory.currentSession().clear()
        window.location.assign("/login")
    }

    return <div>
        <div
            className={"fixed h-[100vh] left-0 transition-all"}
            style={{
                width: (minimize ? "70px" : "300px")
            }}
        >
            <Sidebar
                openModalChangePassword={() => setIsModalChangePasswordOpen(true)}
                doLogout={doLogout} minimize={minimize}
                setStaticOpen={() => setStaticOpen(!staticOpen)}
                setDinamicOpen={() => setDinamicOpen(false)}
                setDinamicClose={() => setDinamicOpen(true)}
            />
        </div>
        <div className={"bg-gray-900 fixed h-[100vh] right-0 overflow-y-scroll transition-all"} style={{
            width: `calc(100vw - ${minimize ? "70px" : "300px"})`
        }}>
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
                onKeyDown={handleOnEnter}
            />
            <Input
                type="password"
                placeholder="New Password"
                value={changePasswordReq.new_password}
                onChange={(e) => setChangePasswordReq({
                    ...changePasswordReq,
                    new_password: e.target.value
                })}
                onKeyDown={handleOnEnter}
            />
            <Input
                type="password"
                placeholder="Retype New Password"
                value={changePasswordReq.renew_password}
                onChange={(e) => setChangePasswordReq({
                    ...changePasswordReq,
                    renew_password: e.target.value
                })}
                onKeyDown={handleOnEnter}
            />
            <Button
                onClick={handleChangePassword}
                size="md"
                color="yellow"
            >
                Update
            </Button>
        </Modal>
        <p className="fixed right-4 bottom-2 text-blue-600 font-semibold">{moment(currentTime).format("YYYY-MM-DD HH:mm:ss")}</p>
    </div>
}