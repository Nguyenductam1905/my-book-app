import { Button, Input, Form, notification, Row, Col } from "antd";
import { registerUserAPI } from "../services/axios.service";
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        const res = await registerUserAPI(values.fullName, values.email, values.password, values.phone);
        if (res.data) {
            notification.success({
                message: "Register user",
                description: "Register successfully"
            })
            navigate('/login');
            form.resetFields(); // Uncommenting this line to reset the form fields after successful registration
        } else {
            notification.error({
                message: "Register user",
                description: "Registration failed. Please try again."
            });
        }
    }

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        >
            <Row justify={"center"}>
                <Col xs={24} md={6}>
                    <Form.Item
                        label="Full Name"
                        name="fullName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={6}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={6}>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                pattern: new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
                                message: 'Password must be at least 8 characters long and contain at least one letter and one number.',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={6}>
                    <Form.Item
                        label="Phone number"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your phone number!',
                            },
                            {
                                pattern: new RegExp(/^\+?[0-9]{8,}$/),
                                message: 'Hmm, that doesn\'t look like a valid phone number.',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <div>
                    <Button
                        onClick={() => form.submit()}
                        type="primary">Register</Button>
                    {/* <Button type="default" onClick={() => {
                        // check form values
                        form.setFieldsValue({
                            fullName: 'Horashi',
                            email: 'horashi@gmail.com',
                            password: '',
                            phone: ''
                        })
                        console.log(">>> check form: ", form.getFieldsValue());
                    }}>Test</Button> */}
                </div>
            </Row>
        </Form>
    )
}

export default RegisterPage;