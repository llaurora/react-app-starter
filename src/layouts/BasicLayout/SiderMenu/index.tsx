import { memo, useContext, useEffect, useState } from "react";
import { Menu } from "antd";
import { Link, useLocation, matchPath } from "react-router-dom";
import { RouteConfig } from "@/routes";
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

const SiderMenu = () => {
    const { routes, flattenRoutes } = useContext(MenuContext);
    const { pathname } = useLocation();
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
        <div style={{ width: 200 }} className={styles.siderMenu}>
            <span className={styles.title}>React App Starter</span>
            <Menu mode="inline" selectedKeys={selectedKey} openKeys={openKeys} onOpenChange={onOpenChange}>
                {getNavMenuItems(routes)}
            </Menu>
        </div>
    );
};

export default memo(SiderMenu);
