import {createContext} from "svelte"

export const [getUserLayoutContext, setUserLayoutContext] = createContext<{hide: () => void}>()