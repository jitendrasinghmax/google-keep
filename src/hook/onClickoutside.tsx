import { useEffect } from "react";


export const useClickOutside = (
    onClickOutside:() => void,
    ignoreRefs:(React.RefObject<HTMLElement|null>)[]
) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            const isIgnored = ignoreRefs.some(
                (ref) => ref.current && ref.current.contains(target)
            );
            

            if (isIgnored) return;

            
                onClickOutside();
            
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ignoreRefs, onClickOutside]);
};
