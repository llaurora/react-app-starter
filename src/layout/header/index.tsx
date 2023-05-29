import { memo } from "react";
import classNames from "classnames";
import { Dropdown } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined, DownOutlined } from "@ant-design/icons";
import { removeSessionStorage } from "@/utils";
import { LOGIN_URL, SESSION_KEY_USERINFO } from "@/constants";
import { removeAuthorities } from "@/auth";
import { useNavigate } from "react-router-dom";
import { useGlobalContex } from "@/hooks";
import styles from "./index.scss";

interface HeaderProps {
    collapsed?: boolean;
    className?: string;
    onChangeCollapsed?: () => void;
}

const ITEM_KEY_LOGOUT = "logout";

const items = [
    {
        key: ITEM_KEY_LOGOUT,
        label: "Logout",
    },
];

const Header = ({ className, collapsed, onChangeCollapsed }: HeaderProps) => {
    const { userInfo } = useGlobalContex();
    const { userName } = userInfo || {};
    const navigate = useNavigate();

    const onLogout = () => {
        removeSessionStorage(SESSION_KEY_USERINFO);
        removeAuthorities();
        navigate(LOGIN_URL, { replace: true });
    };

    const onMenuClick = ({ key }) => {
        if (key === ITEM_KEY_LOGOUT) {
            onLogout();
        }
    };

    return (
        <div className={classNames(className, styles.header)}>
            {collapsed ? (
                <MenuUnfoldOutlined onClick={onChangeCollapsed} className={styles.collapsedIcon} />
            ) : (
                <MenuFoldOutlined onClick={onChangeCollapsed} className={styles.collapsedIcon} />
            )}
            <Dropdown menu={{ items, onClick: onMenuClick }}>
                <div className={styles.userMenu}>
                    <span className={styles.userName}>{userName}</span>
                    <DownOutlined className={styles.downIcon} />
                </div>
            </Dropdown>
        </div>
    );
};

export default memo(Header);
