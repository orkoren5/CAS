import React from "react";
import MuiTable from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {makeStyles} from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import cx from "classNames";

export interface TableProps {
    headers: ({ title: string | React.ReactElement, colspan?: number } | string )[][],
    columns: string[],
    rows: ({ key: string, onClick?: () => void } & Record<string, React.ReactElement | string>)[],
    selectedRow?: string;
}

export const useTableStyles = makeStyles((theme) =>  ({
    selected: {
        "&:after": {
            content: "''",
            left: 0,
            width: 5,
            height: "100%",
            position: "absolute",
            backgroundColor: theme.palette.primary.main + " !important",
        }
    },
    hover: {
        "&:hover:after": {
            content: "''",
            left: 0,
            width: 5,
            height: "100%",
            position: "absolute",
            backgroundColor: "#104996"
        }
    },
    clickableRow: {
        cursor: "pointer"
    },
    tableRow: {
        backgroundColor: "#172A42",
        position: "relative",
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
    const styles = useTableStyles();

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
                    <TableRow
                        classes={{root: cx(styles.tableRow, { [styles.clickableRow]: row.onClick }, { [styles.selected]: row.key === props.selectedRow })}}
                        key={row.key}
                    >
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