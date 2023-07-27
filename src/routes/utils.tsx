import type { ReactNode } from "react";
import type { FlattenRoute, RouteConfig } from "@/routes/index";
import { ROOT_URL, ROUTE_SEPARATOR } from "@/constants";

export const transFlattenRoutes = (
    configs: RouteConfig[],
    parentPath: string,
    parentNames: ReactNode[],
    parentElementBoolPaths: boolean[],
    flattenRoutes: FlattenRoute[],
): FlattenRoute[] => {
    configs.forEach((item: RouteConfig) => {
        const { key, path, element, label, children, hitParentKey, index, hasIndexElement, authority } = item;
        const combinePath = index
            ? parentPath
            : typeof parentPath === "string" && parentPath !== ""
            ? `${parentPath}${ROUTE_SEPARATOR}${path}`
            : path;
        const transCombinePath = combinePath?.replaceAll(ROUTE_SEPARATOR, "/");
        const pathname = transCombinePath ? `${ROOT_URL}${transCombinePath}` : transCombinePath;
        if (index) {
            flattenRoutes.push({
                index,
                key,
                path,
                element,
                pathname,
                authority,
            });
            return;
        }
        const transLabelPaths = label ? [...parentNames, label] : parentNames;
        const transElementBoolPaths = [...parentElementBoolPaths, !!element || hasIndexElement];
        flattenRoutes.push({
            key,
            path,
            element,
            authority,
            name: label,
            hitParentKey,
            pathname: transCombinePath ? `${ROOT_URL}${transCombinePath}` : transCombinePath,
            keyPaths: combinePath?.split(ROUTE_SEPARATOR),
            labelPaths: transLabelPaths,
            elementBoolPaths: transElementBoolPaths,
        });
        if (Array.isArray(children) && children.length > 0) {
            transFlattenRoutes(children, combinePath, transLabelPaths, transElementBoolPaths, flattenRoutes);
        }
    });
    return flattenRoutes;
};
