import { PropsWithChildren } from "react";
import { checkBatchAuthority } from "../utils";

interface AuthorizedRenderProps {
    authority: string[];
}
export default function AuthorizedRender({ authority, children }: PropsWithChildren<AuthorizedRenderProps>) {
    return checkBatchAuthority(authority) ? children : null;
}
