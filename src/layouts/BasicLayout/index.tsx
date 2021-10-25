import { Suspense, useMemo, lazy, FC } from "react";
import { Route, Switch } from "react-router-dom";
import { routes } from "@/routes";
import Loading from "@/components/Loading";
import ErrorBoundary from "@/components/ErrorBoundary";
import { AuthorizedRoute } from "@/components/Authorized";
import SiderMenu from "./SiderMenu";
import MenuContext from "./MenuContext";
import { getFlattenRoutes } from "./utils";
import styles from "./index.scss";

const NoAuthorized = lazy(() => import("@/pages/NoAuthorized"));
const NoMatch = lazy(() => import("@/pages/NoMatch"));

const BasicLayout: FC = () => {
    const flattenRoutes = useMemo(() => getFlattenRoutes(routes), []);

    return (
        <div className={styles.basicLayout}>
            <MenuContext.Provider value={{ routes, flattenRoutes }}>
                <SiderMenu />
                <section className={styles.sectionContent}>
                    <Suspense fallback={<Loading />}>
                        <ErrorBoundary>
                            <Switch>
                                {flattenRoutes.map((item) => (
                                    <AuthorizedRoute
                                        authority={item.authority}
                                        key={item.path}
                                        path={item.path}
                                        exact={item.exact}
                                        component={item.component}
                                    />
                                ))}
                                <Route path="/noauthorized">
                                    <NoAuthorized />
                                </Route>
                                <Route path="*">
                                    <NoMatch />
                                </Route>
                            </Switch>
                        </ErrorBoundary>
                    </Suspense>
                </section>
            </MenuContext.Provider>
        </div>
    );
};

export default BasicLayout;
