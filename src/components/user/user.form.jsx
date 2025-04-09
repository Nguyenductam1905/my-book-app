import Input from "antd/es/input/Input"
import Password from "antd/es/input/Password"
import "./user.css"
import { Button, Form } from "antd"
import { useState } from "react"
import axios from "axios"


const UserForm = () => {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")

    const handleClickBtn = () => {
        const URL_BACKEND = "http://localhost:8080/api/v1/user";
        const data = {
            fullName,
            email,
            password,
            phone
        }
        axios.post(URL_BACKEND, data)
        console.log(fullName, email, password, phone)
        console.log(axios.interceptors.response);
        
    }
    
    return (
        <div className="user-form">
            <Form>
                <div>
                    <label>Full name:</label>
                    <Input placeholder="Full name" onChange={()=>setFullName(event.target.value)}/>
                </div>
                <div>
                    <label>Email:</label>
                    <Input type="email" placeholder="example@gmail.com" onChange={()=>setEmail(event.target.value)}/>
                </div>
                <div>
                    <label>Password:</label>
                    <Password onChange={()=>setPassword(event.target.value)}/>
                </div>
                <div>
                    <label>Phone:</label>
                    <Input type="number" onChange={()=>setPhone(event.target.value)}/>
                </div>
                <Button type="primary" onClick={()=>handleClickBtn()}>Create</Button>
            </Form>

        </div>
    )
}

export default UserForm