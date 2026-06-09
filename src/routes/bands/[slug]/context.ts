import {createContext} from "svelte"

export const [getBandLayoutContext, setBandLayoutContext] = createContext<{hide: () => void}>()