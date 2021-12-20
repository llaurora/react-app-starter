import { memo, useEffect, useState } from "react";
import { Menu } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { Link, useLocation, matchPath, useNavigate } from "react-router-dom";
import { routes, RouteConfig } from "@/routes";
import { USER_KEY } from "@/components/Authorized/utils";
import styles from "./index.scss";

const { SubMenu } = Menu;

const urlToList = (url) => {
    const urlList = url.split("/").filter((bool) => bool);
    return urlList.map((urlItem, index) => `${urlList.slice(0, index + 1).join("/")}`);
};

const SiderMenu = ({ flattenRoutes }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [selectedKey, setSelectedKey] = useState<string[]>([]);
    const [openKeys, setOpenKeys] = useState<string[]>([]);

    useEffect(() => {
        const current = flattenRoutes.find((item: RouteConfig) =>
            matchPath({ path: item.path, caseSensitive: item.caseSensitive }, pathname),
        );
        if (current) {
            setSelectedKey([current.path]);
            setOpenKeys(urlToList(current.path));
        }
    }, [flattenRoutes, pathname]);

    const onOpenChange = (keys) => {
        setOpenKeys(keys);
    };

    const onLogout = () => {
        sessionStorage.removeItem(USER_KEY);
        navigate("/login", { replace: true });
    };

    const getMenuItemPath = (item: RouteConfig, path: string) => {
        const { name, icon, target } = item;
        // Is it a http link
        if (/^https?:\/\//.test(path)) {
            return (
                <a href={path} target={target}>
                    {icon ?? null}
                    <span>{name}</span>
                </a>
            );
        }

        return (
            <Link to={path}>
                {icon ?? null}
                <span>{name}</span>
            </Link>
        );
    };

    const getSubMenuOrItem = (item: RouteConfig, parentpath?: string) => {
        const { name, hideInMenu, children, hideChildrenInMenu, path, icon } = item;
        const formatPath = parentpath ? `${parentpath}/${path}` : path;
        if ([!name, hideInMenu].includes(true)) {
            return null;
        }
        if (Array.isArray(children) && !hideChildrenInMenu && children.some((child: RouteConfig) => child.name)) {
            return (
                <SubMenu key={formatPath} icon={icon ?? null} title={name}>
                    {children.map((child: RouteConfig) => getSubMenuOrItem(child, formatPath))}
                </SubMenu>
            );
        }
        return <Menu.Item key={formatPath}>{getMenuItemPath(item, formatPath)}</Menu.Item>;
    };

    return (
        <div className={styles.siderMenu}>
            <span className={styles.title}>React App Starter</span>
            <div className={styles.routes}>
                <Menu mode="inline" selectedKeys={selectedKey} openKeys={openKeys} onOpenChange={onOpenChange}>
                    {routes.map((item: RouteConfig) => getSubMenuOrItem(item))}
                </Menu>
            </div>
            <div className={styles.logout} onClick={onLogout}>
                <LogoutOutlined />
                <span className={styles.label}>Logout</span>
            </div>
        </div>
    );
};

export default memo(SiderMenu);
