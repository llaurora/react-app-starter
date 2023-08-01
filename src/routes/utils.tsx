import type { ReactNode } from "react";
import type { FlattenRoute, RouteConfig } from "@/routes/index";
import { ROOT_URL, ROUTE_SEPARATOR } from "@/constants";

interface FuncFlattenRoutesParams {
    configs: RouteConfig[];
    parentPath: string;
    parentKeys: string[];
    parentNames: ReactNode[];
    parentElementBoolPaths: boolean[];
    flattenRoutes: FlattenRoute[];
}

export const transFlattenRoutes = ({
    configs,
    parentPath,
    parentKeys,
    parentNames,
    parentElementBoolPaths,
    flattenRoutes,
}: FuncFlattenRoutesParams): FlattenRoute[] => {
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
        const combineKeys = [...parentKeys, key];
        flattenRoutes.push({
            key,
            path,
            element,
            authority,
            name: label,
            hitParentKey,
            pathname: transCombinePath ? `${ROOT_URL}${transCombinePath}` : transCombinePath,
            routePaths: combinePath?.split(ROUTE_SEPARATOR),
            keyPaths: combineKeys,
            labelPaths: transLabelPaths,
            elementBoolPaths: transElementBoolPaths,
        });
        if (Array.isArray(children) && children.length > 0) {
            transFlattenRoutes({
                flattenRoutes,
                configs: children,
                parentPath: combinePath,
                parentKeys: combineKeys,
                parentNames: transLabelPaths,
                parentElementBoolPaths: transElementBoolPaths,
            });
        }
    });
    return flattenRoutes;
};
