import { Suspense, useMemo, FC } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "@/components/Loading";
import ErrorBoundary from "@/components/ErrorBoundary";
import { RouteConfig, routes } from "@/routes";
import { AuthorizedRoute } from "@/components/Authorized";
import SiderMenu from "./SiderMenu";
import styles from "./index.scss";

const getFlattenRoutes = (routesData: RouteConfig[], parentpath?: string) => {
    let flattenRoutes = [];
    routesData.forEach((item) => {
        const { children, path, ...rest } = item;
        flattenRoutes.push({ ...rest, path: parentpath ? `${parentpath}/${path}` : path });
        if (Array.isArray(children)) {
            flattenRoutes = [...flattenRoutes, ...getFlattenRoutes(children, path)];
        }
    });
    return flattenRoutes;
};

const BasicLayout: FC = () => {
    const flattenRoutes = useMemo(() => getFlattenRoutes(routes), []);

    return (
        <div className={styles.basicLayout}>
            <SiderMenu flattenRoutes={flattenRoutes} />
            <section className={styles.sectionContent}>
                <Suspense fallback={<Loading />}>
                    <ErrorBoundary>
                        <Routes>
                            {flattenRoutes.map((item) => (
                                <Route
                                    key={item.path}
                                    path={item.path}
                                    caseSensitive={item.caseSensitive}
                                    element={
                                        <AuthorizedRoute authority={item.authority}>{item.element}</AuthorizedRoute>
                                    }
                                />
                            ))}
                        </Routes>
                    </ErrorBoundary>
                </Suspense>
            </section>
        </div>
    );
};

export default BasicLayout;
