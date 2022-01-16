import React, {useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import "./scenariosTable.scss";
//@ts-ignore
import Edit from "../../assets/icons/edit-icon.svg"
//@ts-ignore
import Delete from "../../assets/icons/delete-icon.svg"
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
//@ts-ignore
import FilterEmpty from "../../assets/icons/filter-empty.svg";
//@ts-ignore
import FilterFull from "../../assets/icons/filter-full.svg";
import dateformat from "dateformat";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import cx from "classNames";
import Tooltip from "@material-ui/core/Tooltip";
import {Scenario} from "../../../common/types/Scenario";
import {useTableStyles} from "../common/table";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {getFilters, getSort} from "../../state/filter/selectors";
import FilterDialog from "./filterDialog";
import ArrowRightAlt from "@material-ui/icons/ArrowRightAlt";
import {setSort} from "../../state/filter/actions";

interface ScenarioTableProps {
    scenarios: Scenario[];
    onSelect: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
    selected: string;
}

const useStyles = makeStyles((theme) => ({
    invisibleIconBtn: {
        padding: 8,
        margin: -8,
        visibility: "hidden",
    },
    scenarioTableRow: {
        cursor: "pointer",
        "&:hover $invisibleIconBtn": {
            visibility: "visible"
        }
    },
    iconsContainer: {
        display: "flex",
        gap: 25,
        justifyContent: "flex-end"
    },
    tooltipTitle: {
        color: theme.palette.text.primary
    },
    tooltipValue: {
        color: theme.palette.text.secondary
    },
    filterBy: {
        gridColumn: "1 / span 2"
    },
    tooltipGrid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        columnGap: 3,
        rowGap: 10
    },
    iconBtn: {
        padding: 8,
        margin: -8,
        float: "right"
    },
    descCell: {
        maxWidth: 100
    },
    headerCell: {
        cursor: "pointer",
        width: 180,
        minWidth: 180,
        overflow: "visible"
    },
    headerTitle: {
        marginRight: 8
    },
    resizer: {
        position: "absolute",
        right: 0,
        top: 0,
        width: 9,
        boxSizing: "content-box",
        opacity: 0.01,
        height: "100%",
        cursor: "col-resize",
        "&:after": {
            content: "''",
            height: "100%",
            width: 1,
            position: "absolute",
            left: 4,
            backgroundColor: "#9fabbb"
        },
        "&:hover, &:active": {
            opacity: 0.3
        }
    },
    arrow: {
        verticalAlign: "top",
        position: "absolute",
        "&.asc": {
            transform: "rotate(-90deg)"
        },
        "&.desc": {
            transform: "rotate(90deg)"
        }
    }
}));

const HeaderCell = ({ children, field, nextField }: { children: string, field: keyof Scenario, nextField?: keyof Scenario}) => {
    const styles = useStyles();
    const sort = useSelector(getSort);
    const dispatch = useDispatch();

    const sortDir = sort.sortBy === field ? (sort.sortDesc ? "desc" : "asc") : null;

    useEffect(() => {
        const element = document.getElementById("field-" + field);
        const tableElem = document.getElementById("scenario-table");
        const nextElement = document.getElementById("field-" + nextField);
        const resizer = document.createElement('div');

        resizer.className = styles.resizer;
        element?.appendChild(resizer);
        resizer.addEventListener('mousedown', initResize, false);
        element?.addEventListener('mouseenter', setHeight);

        function setHeight() {
            resizer.style.height = document.getElementById('scenario-table')?.offsetHeight + "px";
        }

        function initResize(e: any) {
            e.stopPropagation();
            window.addEventListener('mousemove', Resize, false);
            window.addEventListener('mouseup', stopResize, false);
        }
        function Resize(e: any) {
            e.preventDefault();
            if (element) {
                const newWidth = (e.clientX - element.offsetLeft - 26);
                const oldWidth = element.getBoundingClientRect().width;
                element.style.width = newWidth + 'px'; // 26 is app-padding
                element.style.minWidth = newWidth + 'px'; // 26 is app-padding
                if (nextElement) {
                    nextElement.style.minWidth = "0";
                }

                const tableWidth = tableElem?.getBoundingClientRect().width;
                const parentWidth = tableElem?.parentNode?.parentNode?.getBoundingClientRect().width;
                if (tableWidth >= parentWidth * 53 / 100 + 1 && newWidth > oldWidth) {
                    element.style.width = oldWidth + "px";
                    element.style.minWidth = oldWidth + 'px';
                }
            }
        }
        function stopResize() {
            window.removeEventListener('mousemove', Resize, false);
            window.removeEventListener('mouseup', stopResize, false);
        }
    }, []);

    return <TableCell id={"field-" + field} onClick={() => dispatch(setSort(field))} className={styles.headerCell}>
        <span className={styles.headerTitle}>{children}</span>
        { sortDir && <ArrowRightAlt className={styles.arrow + " " + sortDir}/> }
    </TableCell>;
}

const ScenarioTable = (props: ScenarioTableProps) => {
    const tableStyle = useTableStyles();
    const classes = useStyles();
    const filter = useSelector(getFilters);
    const [filterOpen, setFilterOpen] = useState<boolean>(false);

    const hasFilter = filter.filterBy && (filter.toDate || filter.fromDate);
    const title = filter.filterBy === "creationDate" ? "Creation Date" : "Last Save Date"

    const filterIcon = hasFilter ?
        <Tooltip arrow title={
            <>
                <div className={classes.tooltipGrid}>
                    <Typography color="textPrimary" variant="body1" className={classes.filterBy}>{title}</Typography>
                    <Typography color="textPrimary" variant="body2">From:</Typography>
                    <Typography color="textSecondary" variant="body2">{filter.fromDate ? moment(filter.fromDate).format("DD.MM.YY") : "-"}</Typography>
                    <Typography color="textPrimary" variant="body2">To:</Typography>
                    <Typography color="textSecondary" variant="body2">{filter.toDate ? moment(filter.toDate).format("DD.MM.YY") : "-"}</Typography>
                </div>
            </>
        }>
            <IconButton classes={{root: classes.iconBtn}} onClick={() => setFilterOpen(true)}><FilterFull/></IconButton>
        </Tooltip> :
        <IconButton classes={{root: classes.iconBtn}} onClick={() => setFilterOpen(true)}><FilterEmpty/></IconButton>;

    return <>
        <Table stickyHeader size="small" id="scenario-table">
            <TableHead>
                <TableRow classes={{root: tableStyle.tableRow}}>
                    <HeaderCell field="name" nextField="description">Scenario Name</HeaderCell>
                    <HeaderCell field="description" nextField="lastSaveDate">Description</HeaderCell>
                    <HeaderCell field="lastSaveDate" nextField="lastRunDate">Last Save Date</HeaderCell>
                    <HeaderCell field="lastRunDate">Last Run Date</HeaderCell>
                    <TableCell>{filterIcon}</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    props.scenarios.map(scenario => (
                        <TableRow
                            onClick={() => props.onSelect(scenario.id)}
                            classes={{root: cx(tableStyle.tableRow, tableStyle.hover, { [tableStyle.selected]: scenario.id === props.selected }, classes.scenarioTableRow)}}
                            key={scenario.id}
                        >
                            <TableCell classes={{root: classes.descCell}}>
                                <Tooltip arrow placement="top-start" title={scenario.name} >
                                    <Typography color="textSecondary" variant="body2">{scenario.name}</Typography>
                                </Tooltip>
                            </TableCell>
                            <TableCell classes={{root: classes.descCell}}>
                                <Tooltip arrow placement="top-start" title={scenario.description} >
                                    <Typography color="textSecondary" variant="body2">{scenario.description}</Typography>
                                </Tooltip>
                            </TableCell>
                            <TableCell><Typography color="textSecondary" variant="body2">{dateformat(scenario.lastSaveDate, "dd.mm.yy hh:MM")}</Typography></TableCell>
                            <TableCell>
                                <Typography color="textSecondary" variant="body2">
                                    {scenario.lastRunDate ? dateformat(scenario.lastRunDate, "dd.mm.yy hh:MM") : ""}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <div className={classes.iconsContainer}>
                                    <IconButton onClick={() => props.onEdit(scenario.id)} classes={{ root: classes.invisibleIconBtn }}><Edit/></IconButton>
                                    <IconButton onClick={() => props.onDelete(scenario.id)} classes={{ root: classes.invisibleIconBtn }}><Delete/></IconButton>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
        <FilterDialog onClose={() => setFilterOpen(false)} open={filterOpen}/>
    </>
}

export default ScenarioTable;