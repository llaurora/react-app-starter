import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { setSessionStorage } from "@/utils";
import { getUserInfo } from "@/services";
import { ROOT_URL, SESSION_KEY_USERINFO } from "@/constants";
import styles from "./index.scss";

const { Item } = Form;
const { Password } = Input;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const Login = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const userInfo = await getUserInfo(values);
            if (userInfo) {
                console.log("Login Success:", userInfo);
                setSessionStorage(SESSION_KEY_USERINFO, userInfo);
                setLoading(false);
                navigate(ROOT_URL, { replace: true });
            }
        } catch {
            setLoading(false);
        }
    };

    return (
        <div className={styles.login}>
            <Form className={styles.formCard} onFinish={onFinish} {...layout}>
                <Item {...tailLayout}>
                    <span className={styles.title}>React App Starter</span>
                </Item>
                <Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: "Please input your username!" }]}
                >
                    <Input />
                </Item>
                <Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: "Please input your password!" }]}
                >
                    <Password />
                </Item>
                <Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Login
                    </Button>
                </Item>
            </Form>
        </div>
    );
};

export default Login;
