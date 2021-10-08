import { RouteConfig } from "@/routes";

export const getFlattenRoutes = (routesData: RouteConfig[]) => {
    let flattenRoutes = [];
    routesData.forEach((item) => {
        const { routes, ...rest } = item;
        flattenRoutes.push(rest);
        if (Array.isArray(routes)) {
            flattenRoutes = [...flattenRoutes, ...getFlattenRoutes(routes)];
        }
    });
    return flattenRoutes;
};

export const urlToList = (url) => {
    const urlList = url.split("/").filter((bool) => bool);
    return urlList.map((urlItem, index) => `/${urlList.slice(0, index + 1).join("/")}`);
};
