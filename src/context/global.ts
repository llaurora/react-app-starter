import { createContext } from "react";
import type { ReactNode } from "react";
import type { FlattenRoute } from "@/routes";

export interface GlobalContextType {
    matchRoute: FlattenRoute;
    matchPathname: ReactNode;
    userInfo: API.UserInfo;
}

const INIT_STATE = {
    userInfo: null,
    matchRoute: null,
    matchPathname: null,
};

export const GlobalContext = createContext<GlobalContextType>(INIT_STATE);
