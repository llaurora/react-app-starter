import { useContext } from "react";
import { GlobalContext } from "@/context/global";
import type { GlobalContextType } from "@/context/global";

const useGlobalContex = (): GlobalContextType => {
    return useContext(GlobalContext);
};

export default useGlobalContex;
