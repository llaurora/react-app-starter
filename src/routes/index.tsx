import { lazy } from "react";
import type { ReactNode } from "react";
import type { RouteObject } from "react-router-dom";
import { ROOT_URL } from "@/constants";
import { GlobalOutlined, HomeOutlined, LineChartOutlined } from "@ant-design/icons";
import { AUTH_MENU_EXAMPLE_PAGE_ONE, AUTH_MENU_EXAMPLE_PAGE_THREE } from "@/auth/code";
import {
    MENU_LABEL_MAP,
    KEY_EXAMPLE,
    KEY_HOME,
    KEY_NO_AUTH,
    KEY_NO_MATCH,
    KEY_WELCOME,
    KEY_EXAMPLE_PAGE_ONE,
    KEY_EXAMPLE_PAGE_TWO,
    KEY_EXAMPLE_PAGE_THREE,
    KEY_EXAMPLE_PAGE_TWO_DETAIL,
} from "./constants";
import { transFlattenRoutes } from "./utils";

const NoMatch = lazy(() => import("@/pages/noMatch"));
const NoAuth = lazy(() => import("@/pages/noAuth"));
const Home = lazy(() => import("@/pages/home"));
const PageOne = lazy(() => import("@/pages/pageOne"));
const PageTwo = lazy(() => import("@/pages/pageTwo"));
const PageTwoDetail = lazy(() => import("@/pages/pageTwo/subpage/detail"));
const PageThree = lazy(() => import("@/pages/pageThree"));
const Welcome = lazy(() => import("@/pages/welcome"));

export interface RouteConfig {
    key: string; // unique in the whole tree 整颗树唯一
    index?: true;
    path?: string;
    element?: ReactNode;
    label?: ReactNode;
    icon?: ReactNode;
    authority?: string | string[];
    hiddenInMenu?: boolean;
    children?: RouteConfig[];
    hitParentKey?: string; // Hit menu for selecting the parent page when displaying a tertiary page 用于在展示三级页面时，选中父级页面的菜单
}

export type FlattenRoute = RouteObject & {
    key: string;
    name: ReactNode;
    pathname: string;
    keyPaths: string[];
    labelPaths: ReactNode[];
    hitParentKey?: string;
    children?: FlattenRoute[];
};

const routeConfigs: RouteConfig[] = [
    {
        index: true,
        key: KEY_HOME,
        path: ROOT_URL,
        label: MENU_LABEL_MAP[KEY_HOME],
        icon: <HomeOutlined />,
        element: <Home />,
    },
    {
        path: "example",
        key: KEY_EXAMPLE,
        label: MENU_LABEL_MAP[KEY_EXAMPLE],
        icon: <LineChartOutlined />,
        children: [
            {
                path: "pageone",
                key: KEY_EXAMPLE_PAGE_ONE,
                label: MENU_LABEL_MAP[KEY_EXAMPLE_PAGE_ONE],
                authority: AUTH_MENU_EXAMPLE_PAGE_ONE,
                element: <PageOne />,
            },
            {
                path: "pagetwo",
                key: KEY_EXAMPLE_PAGE_TWO,
                label: MENU_LABEL_MAP[KEY_EXAMPLE_PAGE_TWO],
                element: <PageTwo />,
            },
            {
                path: "pagetwo/detail",
                key: KEY_EXAMPLE_PAGE_TWO_DETAIL,
                hitParentKey: KEY_EXAMPLE_PAGE_TWO,
                element: <PageTwoDetail />,
            },
            {
                path: "pagethree",
                key: KEY_EXAMPLE_PAGE_THREE,
                authority: AUTH_MENU_EXAMPLE_PAGE_THREE,
                label: MENU_LABEL_MAP[KEY_EXAMPLE_PAGE_THREE], // PageThree cannot be accessed when no permission in this example 在本例中PageThree没有权限
                element: <PageThree />,
            },
        ],
    },
    {
        path: "welcome",
        key: KEY_WELCOME,
        label: MENU_LABEL_MAP[KEY_WELCOME],
        icon: <GlobalOutlined />,
        element: <Welcome />,
    },
    {
        path: "noauthorized",
        key: KEY_NO_AUTH,
        hiddenInMenu: true,
        element: <NoAuth />,
    },
    {
        path: "*",
        key: KEY_NO_MATCH,
        hiddenInMenu: true,
        element: <NoMatch />,
    },
];

const flattenRoutes: FlattenRoute[] = transFlattenRoutes(routeConfigs, "", [], []);

export { flattenRoutes, routeConfigs };
