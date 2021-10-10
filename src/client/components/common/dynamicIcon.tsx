import React from "react";

const DynamicIcon = ({ iconUrl }: { iconUrl: string }) => {
    return <img src={"/assets/" + iconUrl}/>
}

export default DynamicIcon;