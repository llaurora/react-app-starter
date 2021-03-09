import { lazy, ReactNode } from "react";
import { HomeOutlined, LineChartOutlined, PieChartOutlined, GlobalOutlined } from "@ant-design/icons";

export interface RouteConfigPure {
    path: string;
    name: string;
    exact?: boolean;
    component?: ReactNode;
    authority?: string[];
    hideInMenu?: boolean;
    hideChildrenInMenu?: boolean;
    icon?: ReactNode;
    target?: string;
}

export interface RouteConfig extends RouteConfigPure {
    routes?: RouteConfig[];
}

export const routes: RouteConfig[] = [
    {
        path: "/",
        name: "Home",
        exact: true,
        icon: <HomeOutlined />,
        authority: ["home"],
        component: lazy(() => import("@/pages/Home")),
    },
    {
        path: "/example",
        name: "Example",
        exact: true,
        icon: <LineChartOutlined />,
        routes: [
            {
                path: "/example/child1",
                name: "Child 1",
                component: lazy(() => import("@/pages/Example/Child1")),
            },
            {
                path: "/example/child2",
                name: "Child 2",
                component: lazy(() => import("@/pages/Example/Child2")),
            },
        ],
    },
    {
        path: "/pageone",
        name: "Pageone",
        exact: true,
        authority: ["pageone"],
        icon: <PieChartOutlined />,
        component: lazy(() => import("@/pages/PageOne")),
    },
    {
        path: "/welcome",
        name: "Welcome",
        exact: true,
        authority: ["welcome"],
        icon: <GlobalOutlined />,
        component: lazy(() => import("@/pages/Welcome")),
    },
];
