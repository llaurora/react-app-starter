import { PropsWithChildren, FC } from "react";
import { checkBatchAuthority } from "./utils";

interface AuthorizedRenderProperties {
    authority: string[];
}

const AuthorizedRender: FC<PropsWithChildren<AuthorizedRenderProperties>> = ({ authority, children }) => {
    return checkBatchAuthority(authority) ? children : null;
};

export default AuthorizedRender;
