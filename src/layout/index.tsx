import { Suspense, useMemo, useState, useCallback } from "react";
import classNames from "classnames";
import Loading from "@/components/loading";
import ErrorBoundary from "@/components/errorBoundary";
import { GlobalContext } from "@/context/global";
import { useMenuRoutes, useMatchRoute } from "@/hooks";
import { routeConfigs, flattenRoutes } from "@/routes";
import Aside from "./aside";
import Header from "./header";
import styles from "./index.scss";

interface LayoutProps {
    userInfo: API.UserInfo;
}

const Layout = ({ userInfo }: LayoutProps) => {
    const { element, menus } = useMenuRoutes(routeConfigs);
    const matchRoute = useMatchRoute(flattenRoutes);
    const [collapsed, setCollapsed] = useState<boolean>(false);

    const globalContextValue = useMemo(
        () => ({ userInfo, matchRoute, matchPathname: matchRoute?.name || "" }),
        [matchRoute, userInfo],
    );

    const onChangeCollapsed = useCallback(() => {
        setCollapsed((prevBool: boolean) => !prevBool);
    }, []);

    return (
        <GlobalContext.Provider value={globalContextValue}>
            <Aside
                collapsed={collapsed}
                menus={menus}
                className={classNames(styles.asideMenu, { [styles.asideMenuCollapsed]: collapsed })}
            />
            <section className={classNames(styles.section, { [styles.sectionWithCollapsed]: collapsed })}>
                <Header className={styles.header} collapsed={collapsed} onChangeCollapsed={onChangeCollapsed} />
                <main className={styles.main}>
                    <Suspense fallback={<Loading />}>
                        <ErrorBoundary>{element}</ErrorBoundary>
                    </Suspense>
                </main>
            </section>
        </GlobalContext.Provider>
    );
};

export default Layout;
