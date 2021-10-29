import React, {PropsWithChildren, ReactElement, useEffect, useState} from "react";
import Tooltip from "@material-ui/core/Tooltip";

interface TextOverflowProps {
    refElem: HTMLElement | null;
    innerText?: string;
    trigger?: any;
}

const TextOverflow = (props: PropsWithChildren<TextOverflowProps>) => {
    const { refElem, innerText, trigger } = props;
    const [showTooltip, setShowTooltip] = useState<boolean>(false);

    useEffect(() => {
        if (refElem) {
            if (refElem?.offsetWidth < refElem?.scrollWidth) {
                setShowTooltip(true);
            }
            else {
                setShowTooltip(false)
            }
        }
    }, [refElem, innerText, trigger]);

    //@ts-ignore
    return showTooltip ? <Tooltip arrow placement="top-start" title={refElem?.textContent || refElem?.value || ""}>
        {props.children as ReactElement}
    </Tooltip> : <>{props.children}</>;
}

export default TextOverflow;