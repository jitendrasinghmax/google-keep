import { useState } from "react";

import { useEffect } from "react";

export const getPosition = (ref: React.RefObject<HTMLElement | null>, showColorPicker: boolean) => {
    const [position, setPosition] = useState({ x: 0, y: 0});
    useEffect(() => {
        setPosition((): { x: number, y: number } => {
            const rect = ref.current?.getBoundingClientRect();
            if (!rect) return { x:0 , y: 0 };
            return {
                x: rect?.left ,
                y: rect?.top
            }
        })
    }, [showColorPicker])
    return position
}


