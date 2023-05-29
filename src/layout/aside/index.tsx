import { memo, useEffect, useState, useRef } from "react";
import { Menu } from "antd";
import classNames from "classnames";
import type { ItemType } from "antd/lib/menu/hooks/useItems";
import { useGlobalContex } from "@/hooks";
import styles from "./index.scss";

interface AsideProps {
    menus: ItemType[];
    collapsed: boolean;
    className?: string;
}

const Aside = ({ menus, className, collapsed }: AsideProps) => {
    const { matchRoute } = useGlobalContex();
    const { key, hitParentKey, keyPaths } = matchRoute || {};
    const [openKeys, setOpenKeys] = useState<string[]>(keyPaths);
    const openKeysRef = useRef<string[]>([]);
    openKeysRef.current = openKeys;

    const onOpenChange = (keys) => {
        setOpenKeys(keys);
    };

    useEffect(() => {
        if (!collapsed) {
            setOpenKeys(keyPaths);
        }
    }, [collapsed, keyPaths]);

    return (
        <aside className={classNames(styles.asideMenu, className)}>
            <span className={styles.title}>{collapsed ? "Starter" : "React App Starter"}</span>
            <Menu
                className={styles.menuContainer}
                mode="inline"
                inlineCollapsed={collapsed}
                items={menus}
                onOpenChange={onOpenChange}
                openKeys={openKeys}
                selectedKeys={[hitParentKey || key]}
            />
        </aside>
    );
};

export default memo(Aside);
