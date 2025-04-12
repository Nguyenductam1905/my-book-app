import Input from "antd/es/input/Input"
import Password from "antd/es/input/Password"
import "./user.css"
import { Button, Descriptions, Form, message, notification, Modal } from "antd"
import { useState } from "react"
import axios from "axios"
import { createUserAPI } from "../../services/axios.service"


const UserForm = () => {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    // const handleOk = () => {
    //     setIsModalOpen(false);
    // };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSubmitBtn = async () => {
        // alert("Clicked")
        const res = await createUserAPI(fullName, email, password, phone)
        if (res.data) {
            notification.success(
                {
                    message: "Create user successful",
                    description: "Tạo user thành công",
                }
            )
        }
        else {
            notification.error(
                {
                    message: "Create user failed",
                    description: JSON.stringify(res.data.message.join(" ,"))
                }
            )
        }
    }

    return (
        <div className="user-form">
            <div style={{ display: "flex", justifyContent: "space-between"}}>
                <h3>Table Users</h3>
                <Button type="primary" onClick={() => showModal()}>Create</Button>
            </div>
            <Modal
                title="Create User"
                open={isModalOpen}
                onOk={handleSubmitBtn}
                onCancel={handleCancel}
                okText={"CREATE"}
            >
                <Form style={{display:"flex", gap: "10px", flexDirection: "column"}}>
                    <div>
                        <label>Full Name:</label>
                        <Input placeholder="Full name" onChange={() => setFullName(event.target.value)} />
                    </div>
                    <div>
                        <label>Email</label>
                        <Input type="email" placeholder="example@gmail.com" onChange={() => setEmail(event.target.value)} />
                    </div>
                    <div>
                        <label>Password</label>
                        <Password onChange={() => setPassword(event.target.value)} />
                    </div>
                    <div>
                        <label>Phone number</label>
                        <Input type="number" onChange={() => setPhone(event.target.value)} />
                    </div>
                </Form>
            </Modal>
        </div>
    )
}

export default UserForm