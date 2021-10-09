import React from "react";
import MuiTable from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {makeStyles} from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import cx from "classNames";

export interface TableProps {
    headers: ({ title: string | React.ReactElement, colspan?: number } | string)[][],
    columns: string[],
    rows: ({ key: string } & Record<string, React.ReactElement | string>)[],
    hoverColor?: boolean;
}

const useStyles = makeStyles((theme) =>  ({
    tableRowHover: {
        "&:hover": {
            backgroundColor: "#0c68e9 !important",
        },
    },
    tableRow: {
        backgroundColor: "#172A42",

        '&:nth-of-type(odd)': {
            backgroundColor: "#112033"
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }
}));

const Table = (props: TableProps) => {
    const styles = useStyles();

    return <MuiTable stickyHeader size="small">
        <TableHead>
            {
                props.headers.map((header, index) => (
                    <TableRow classes={{root: styles.tableRow}} key={"header-" + index}>
                        {header.map((headerCell, ind) => {
                            const title = typeof headerCell === "string" ? headerCell : headerCell.title;
                            const colspan = typeof headerCell === "string" ? undefined : headerCell.colspan;
                            return <TableCell key={title + "-" + ind} colSpan={colspan}>{title}</TableCell>
                        })}
                    </TableRow>
                ))
            }
        </TableHead>
        <TableBody>
            {
                props.rows.map(row => (
                    <TableRow classes={{root: cx(styles.tableRow, { [styles.tableRowHover]: props.hoverColor })}} key={row.key}>
                        {
                            props.columns.map((col) => (
                                <TableCell key={row.key + "-" + col}>{row[col]}</TableCell>
                            ))
                        }
                    </TableRow>
                ))
            }
        </TableBody>
    </MuiTable>
}

export default Table;