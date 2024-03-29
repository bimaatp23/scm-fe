import React from "react"

export default function Modal(props) {
    const { isOpen, onClose, title, children } = props

    return isOpen ?
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="modal-overlay absolute inset-0 bg-black opacity-50" onClick={onClose} />
            <div className="modal-content bg-white p-4 rounded-lg shadow-lg z-50 max-h-[80vh] overflow-y-scroll">
                <div className="flex flex-col gap-2">
                    <p className="text-xl font-bold text-center">{title}</p>
                    {children}
                </div>
            </div>
        </div> : <></>
}