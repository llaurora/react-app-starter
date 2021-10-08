declare module "*.scss" {
    const resource: { [key: string]: string };
    export = resource;
}

declare module "*.svg" {
    import { FunctionComponent, SVGProps } from "react";

    export const ReactComponent: FunctionComponent<SVGProps<SVGSVGElement>>;
    const source: string;
    export default source;
}

declare module "*.bmp" {
    const path: string;
    export default path;
}

declare module "*.gif" {
    const path: string;
    export default path;
}

declare module "*.jpg" {
    const path: string;
    export default path;
}

declare module "*.jpeg" {
    const path: string;
    export default path;
}

declare module "*.png" {
    const path: string;
    export default path;
}
