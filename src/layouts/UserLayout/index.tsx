import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { setStorage } from "@/utils";
import { getUserInfo } from "@/services";
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

export default function UserLayout() {
    const [loading, setLoading] = useState<boolean>(false);
    const history = useHistory();

    const onFinish = (values) => {
        setLoading(true);
        getUserInfo(values)
            .then((data) => {
                console.log("Login Success:", data);
                setStorage("userInfo", data, "session");
                setLoading(false);
                history.replace("/");
            })
            .catch(() => {
                setLoading(false);
            });
    };

    return (
        <div className={styles.userLayout}>
            <Form className={styles.formCard} onFinish={onFinish} {...layout}>
                <Item {...tailLayout}>
                    <span className={styles.title}>React App Init</span>
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
}
