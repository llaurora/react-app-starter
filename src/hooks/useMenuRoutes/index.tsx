import { useCallback, useMemo } from "react";
import { useRoutes, Link } from "react-router-dom";
import { checkAuthority } from "@/auth";
import AuthorizedRoute from "@/components/authorizedRoute";
import type { ReactNode } from "react";
import type { RouteObject } from "react-router-dom";
import type { ItemType } from "antd/lib/menu/hooks/useItems";
import type { RouteConfig, FlattenRoute } from "@/routes";
import { ROUTE_SEPARATOR } from "@/constants";

const useMenuRoutes = (routeConfigs: RouteConfig[]) => {
    const transMenuAndRoutes = useCallback(
        (
            configs: RouteConfig[],
            parentPath: string,
            parentNames: ReactNode[],
            flattenRoutes: FlattenRoute[],
        ): [RouteObject[], ItemType[]] => {
            const routes: RouteObject[] = [];
            const menus: ItemType[] = [];
            configs.forEach((item: RouteConfig) => {
                const { key, path, element, label, icon, hiddenInMenu, children, authority, index } = item;
                const authElement = element ? (
                    <AuthorizedRoute authority={authority}>{element}</AuthorizedRoute>
                ) : (
                    element
                );
                const route: RouteObject = index
                    ? {
                          index,
                          element: authElement,
                      }
                    : {
                          path,
                          element: authElement,
                      };
                let childMenus: ItemType[] = [];
                const combinePath = parentPath === "" ? path : `${parentPath}${ROUTE_SEPARATOR}${path}`;
                const transKeyNames = label ? [...parentNames, label] : parentNames;
                if (Array.isArray(children) && children.length > 0) {
                    const [calcChildRoutes, calcChildMenus] = transMenuAndRoutes(
                        children,
                        combinePath,
                        transKeyNames,
                        flattenRoutes,
                    );
                    route.children = calcChildRoutes;
                    childMenus = calcChildMenus;
                }
                routes.push(route);
                if (!hiddenInMenu && label && checkAuthority(authority)) {
                    const transCombinePath = combinePath.replaceAll(ROUTE_SEPARATOR, "/");
                    if (Array.isArray(childMenus) && childMenus.length > 0) {
                        menus.push({
                            icon,
                            label,
                            key,
                            children: childMenus,
                        });
                    } else {
                        menus.push({
                            icon,
                            key,
                            label: <Link to={transCombinePath}>{label}</Link>,
                        });
                    }
                }
            });
            return [routes, menus];
        },
        [],
    );

    const [routes, menus] = useMemo(() => {
        return transMenuAndRoutes(routeConfigs, "", [], []);
    }, [routeConfigs, transMenuAndRoutes]);

    const element = useRoutes(routes);

    return { element, menus };
};

export default useMenuRoutes;
