import { Button, Input, Form } from "antd";

const RegisterPage = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log(">>> check values: ", values)
    }

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        >
            <div style={{
                margin: "50px",
            }}>
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

                <Form.Item
                    label="Email"
                    name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
                >
                    <Input />
                </Form.Item>

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


                <div>
                    <Button
                        onClick={() => form.submit()}
                        type="primary">Register</Button>
                </div>
            </div>
        </Form>
    )
}

export default RegisterPage;