import { useEffect } from "react";

const useControlEffect = (functionControl: any, lookupVariable: any) => {
    useEffect(() => {
        functionControl(lookupVariable)
    }, [lookupVariable])

    return {
        lookupVariable
    }
}

export default useControlEffect;