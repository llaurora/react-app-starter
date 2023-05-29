import { useMemo } from "react";
import { useLocation, matchPath } from "react-router-dom";
import type { FlattenRoute } from "@/routes";

const useMatchRoute = (flattenRoutes: FlattenRoute[]): FlattenRoute => {
    const { pathname } = useLocation();

    return useMemo(() => {
        return flattenRoutes.find((item: FlattenRoute) =>
            matchPath({ path: item.pathname, caseSensitive: true, end: true }, pathname),
        );
    }, [pathname, flattenRoutes]);
};

export default useMatchRoute;
