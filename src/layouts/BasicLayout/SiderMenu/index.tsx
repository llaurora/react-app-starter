import { memo, useContext, useEffect, useState, FC } from "react";
import { Menu } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { Link, useLocation, matchPath, useHistory } from "react-router-dom";
import { RouteConfig } from "@/routes";
import { USER_KEY } from "@/components/Authorized/utils";
import MenuContext from "../MenuContext";
import { urlToList } from "../utils";
import styles from "./index.scss";

const { SubMenu } = Menu;

const conversionPath = (path) => {
    if (path && path.indexOf("http") === 0) {
        return path;
    }
    return `/${path || ""}`.replace(/\/+/g, "/");
};

const SiderMenu: FC = () => {
    const { routes, flattenRoutes } = useContext(MenuContext);
    const { pathname } = useLocation();
    const history = useHistory();
    const [selectedKey, setSelectedKey] = useState<string[]>([]);
    const [openKeys, setOpenKeys] = useState<string[]>([]);

    useEffect(() => {
        const current = flattenRoutes.find((item: RouteConfig) =>
            matchPath(pathname, { exact: true, strict: false, path: item.path }),
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
        history.push("/login");
    };

    const getMenuItemPath = (item: RouteConfig) => {
        const { name, icon, path, target } = item;
        const itemPath = conversionPath(path);
        // Is it a http link
        if (/^https?:\/\//.test(itemPath)) {
            return (
                <a href={itemPath} target={target}>
                    {icon ?? null}
                    <span>{name}</span>
                </a>
            );
        }

        return (
            <Link to={itemPath}>
                {icon ?? null}
                <span>{name}</span>
            </Link>
        );
    };

    const getNavMenuItems = (routesData: RouteConfig[]) => {
        if (!Array.isArray(routesData)) {
            return null;
        }
        // eslint-disable-next-line no-use-before-define
        return routesData.map((item: RouteConfig) => getSubMenuOrItem(item));
    };

    const getSubMenuOrItem = (item: RouteConfig) => {
        if ([!item.name, item.hideInMenu].includes(true)) {
            return null;
        }
        if (item.routes && !item.hideChildrenInMenu && item.routes.some((child: RouteConfig) => child.name)) {
            return (
                <SubMenu key={item.path} icon={item.icon ?? null} title={item.name}>
                    {getNavMenuItems(item.routes)}
                </SubMenu>
            );
        }
        return <Menu.Item key={item.path}>{getMenuItemPath(item)}</Menu.Item>;
    };

    return (
        <div className={styles.siderMenu}>
            <span className={styles.title}>React App Starter</span>
            <div className={styles.routes}>
                <Menu mode="inline" selectedKeys={selectedKey} openKeys={openKeys} onOpenChange={onOpenChange}>
                    {getNavMenuItems(routes)}
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
