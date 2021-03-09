import { createContext } from "react";
import { RouteConfig, RouteConfigPure } from "@/routes";

export interface ContextType {
    routes: RouteConfig[];
    flattenRoutes: RouteConfigPure[];
}

export default createContext<ContextType>(null);
