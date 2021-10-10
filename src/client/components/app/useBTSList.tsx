import React from "react";
import {BTS, Technology} from "../../../common/types/Provider";
import {useGetConfig} from "../../state/configuration/useGetConfig";
import {TableProps} from "../common/table";
import Typography from "@material-ui/core/Typography";

const cols = ["cellId", "technology", "band", "channel"];
const headers: TableProps["headers"] = [["Cell ID", "Technology", "Band", "Channel"]];

const useBTSList = (provider: string, technology?: Technology) => {
    const allProvidersConf = useGetConfig("providers") || {};
    const providerConf = allProvidersConf[provider] || { btsList: [] };

    let list: (BTS & { technology: string })[] = [];
    Object.keys(providerConf.btsList).forEach((tech) => {
        if (!technology || tech === technology) {
            //@ts-ignore
            const techList = providerConf.btsList[tech].map((bts: BTS) => ({...bts, technology: tech}))
            list = [...list, ...techList];
        }
    });

    const rows: TableProps["rows"] = list.map((data, index) => ({
        key: index.toString(),
        cellId:  <Typography color="textSecondary" variant="body2">{data.cellId}</Typography>,
        technology: <Typography color="textSecondary" variant="body2">{data.technology.toUpperCase()}</Typography>,
        band: <Typography color="textSecondary" variant="body2">{data.band}</Typography>,
        channel: <Typography color="textSecondary" variant="body2">{data.channel}</Typography>,
    }));

    return {
        list,
        rows,
        providerConf,
        cols,
        headers
    }
}

export default useBTSList;