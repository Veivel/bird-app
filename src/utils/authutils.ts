import { InteractionContext } from "@/components/context/InteractionContext";
import { useContext } from "react";
import secureLocalStorage from "react-secure-storage";

export function logout() {
    secureLocalStorage.removeItem("token");
}