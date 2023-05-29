import type { ReactNode } from "react";
import type { FlattenRoute, RouteConfig } from "@/routes/index";
import { ROOT_URL, ROUTE_SEPARATOR } from "@/constants";
import { MENU_LABEL_MAP } from "./constants";

export const transFlattenRoutes = (
    configs: RouteConfig[],
    parentPath: string,
    parentNames: ReactNode[],
    flattenRoutes: FlattenRoute[],
): FlattenRoute[] => {
    configs.forEach((item: RouteConfig) => {
        const { key, path, element, label, children, hitParentKey, index } = item;
        const combinePath =
            typeof parentPath === "string" && parentPath !== "" ? `${parentPath}${ROUTE_SEPARATOR}${path}` : path;
        const transLabelPaths = label ? [...parentNames, label] : parentNames;
        const transCombinePath = combinePath?.replaceAll(ROUTE_SEPARATOR, "/");
        const flattenBaseRoute = {
            key,
            path,
            element,
            name: label,
            pathname: transCombinePath ? `${ROOT_URL}${transCombinePath}` : transCombinePath,
            keyPaths: combinePath?.split(ROUTE_SEPARATOR),
            labelPaths: transLabelPaths,
        };
        const flattenRoute: FlattenRoute = index ? { index, ...flattenBaseRoute } : flattenBaseRoute;
        if (hitParentKey) {
            const hitParentMenuPathLabel = MENU_LABEL_MAP[hitParentKey];
            const copyKeyPaths = [...flattenRoute.keyPaths];
            const copyLabelPaths = [...flattenRoute.labelPaths];
            copyLabelPaths.splice(label ? -1 : copyLabelPaths.length, 0, hitParentMenuPathLabel);
            copyKeyPaths.splice(-1, 0, hitParentKey);
            flattenRoutes.push({
                ...flattenRoute,
                hitParentKey,
                keyPaths: copyKeyPaths,
                labelPaths: copyLabelPaths,
            });
        } else {
            flattenRoutes.push(flattenRoute);
        }
        if (Array.isArray(children) && children.length > 0) {
            transFlattenRoutes(children, combinePath, transLabelPaths, flattenRoutes);
        }
    });
    return flattenRoutes;
};
