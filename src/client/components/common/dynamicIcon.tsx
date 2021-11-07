import React from "react";

const DynamicIcon = ({ iconUrl }: { iconUrl: string }) => {
    return <img src={"assets/dynamic/" + iconUrl}/>
}

export default DynamicIcon;