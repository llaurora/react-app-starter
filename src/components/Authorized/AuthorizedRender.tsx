import { PropsWithChildren, ReactNode } from "react";
import { checkBatchAuthority } from "./utils";

interface AuthorizedRenderProperties {
    authority: string[];
}

const AuthorizedRender: ReactNode = ({ authority, children }: PropsWithChildren<AuthorizedRenderProperties>) => {
    return checkBatchAuthority(authority) ? children : null;
};

export default AuthorizedRender;
