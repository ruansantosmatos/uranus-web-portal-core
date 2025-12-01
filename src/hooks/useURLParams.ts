import { URLParamsContext } from "@/context";
import { useContext } from "react";

export function useURLParams() {
    const context = useContext(URLParamsContext)
    if (!context) throw "useURLParams só pode ser utilizado dentro de URLParamsProvider"
    return context
}