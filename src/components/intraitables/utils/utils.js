import {useEffect, useRef} from "react";



export const checker = (values) => {
    const { periodFrom, periodTo} = values || {};
    if(periodFrom || periodTo) {
        return true
    } else {
        return false
    }
}

