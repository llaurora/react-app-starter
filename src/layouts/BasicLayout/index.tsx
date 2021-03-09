import { Suspense, useMemo, lazy } from "react";
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

export default function BasicLayout() {
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
                                <Route path="/noauthorized" component={NoAuthorized} />
                                <Route component={NoMatch} />
                            </Switch>
                        </ErrorBoundary>
                    </Suspense>
                </section>
            </MenuContext.Provider>
        </div>
    );
}
