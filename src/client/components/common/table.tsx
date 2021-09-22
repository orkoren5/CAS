import React from "react";
import MuiTable from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {styled} from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";

export interface TableProps {
    headers: ({ title: string, colspan?: number } | string)[][],
    columns: string[],
    rows: ({ key: string } & Record<string, React.ReactElement | string>)[]
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: "#172A42",
    "&:hover": {
        backgroundColor: "#0c68e9 !important",
    },
    '&:nth-of-type(odd)': {
        backgroundColor: "#112033"
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Table = (props: TableProps) => {
    return <MuiTable stickyHeader size="small">
        <TableHead>
            {
                props.headers.map((header, index) => (
                    <StyledTableRow key={index}>
                        {header.map(headerCell => {
                            const title = typeof headerCell === "string" ? headerCell : headerCell.title;
                            const colspan = typeof headerCell === "string" ? undefined : headerCell.colspan;
                            return <TableCell key={title} colSpan={colspan}>{title}</TableCell>
                        })}
                    </StyledTableRow>
                ))
            }
        </TableHead>
        <TableBody>
            {
                props.rows.map(row => (
                    <StyledTableRow key={row.key}>
                        {
                            props.columns.map((col) => (
                                <TableCell key={row.key + "-" + col}>{row[col]}</TableCell>
                            ))
                        }
                    </StyledTableRow>
                ))
            }
        </TableBody>
    </MuiTable>
}

export default Table;