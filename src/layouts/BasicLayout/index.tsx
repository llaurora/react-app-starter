import type { FC } from "react";
import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "@/components/Loading";
import ErrorBoundary from "@/components/ErrorBoundary";
import type { RouteConfig } from "@/routes";
import { routes } from "@/routes";
import { AuthorizedRoute } from "@/components/Authorized";
import SiderMenu from "./SiderMenu";
import styles from "./index.scss";

const renderRoutes = (routesData: RouteConfig[]) => {
    return routesData.map((item: RouteConfig) => {
        const { children, path, caseSensitive, element, authority } = item;
        if (Array.isArray(children) && children.length > 0) {
            return (
                <Route
                    key={path}
                    path={path}
                    caseSensitive={caseSensitive}
                    element={<AuthorizedRoute authority={authority}>{element}</AuthorizedRoute>}
                >
                    {renderRoutes(children)}
                </Route>
            );
        }
        return (
            <Route
                key={path}
                path={path}
                caseSensitive={caseSensitive}
                element={<AuthorizedRoute authority={authority}>{element}</AuthorizedRoute>}
            />
        );
    });
};

const BasicLayout: FC = () => {
    return (
        <div className={styles.basicLayout}>
            <SiderMenu />
            <section className={styles.sectionContent}>
                <Suspense fallback={<Loading />}>
                    <ErrorBoundary>
                        <Routes>{renderRoutes(routes)}</Routes>
                    </ErrorBoundary>
                </Suspense>
            </section>
        </div>
    );
};

export default BasicLayout;
