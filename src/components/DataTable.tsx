import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TablePagination from "@material-ui/core/TablePagination";
import { HeadRow, Order, EnhancedTableProps, shipType, ShipsData } from "../utils/types";
import { stableSort, getSorting } from "../utils/table";
import { QueryHookResult } from "react-apollo-hooks";
import { OperationVariables } from "apollo-client";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      padding: theme.spacing(2),
      flexDirection: "column",
      overflow: "auto"
    },
    table: {},
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2)
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1
    }
  })
);

const headRows: HeadRow[] = [
  { id: "name", numeric: false, label: "Ship name" },
  { id: "status", numeric: false, label: "Status" },
  { id: "speed", numeric: false, label: "Current speed (km/h)" },
  { id: "location", numeric: false, label: "Coordinates" },
  { id: "successful_landings", numeric: false, label: "Successful landings" },
  { id: "weight_kg", numeric: true, label: "Weight (kg)" }
];

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headRows.map(row => (
          <TableCell
            key={row.id}
            align={row.numeric ? "right" : "left"}
            padding={"default"}
            sortDirection={orderBy === row.id ? order : false}
          >
            <TableSortLabel active={orderBy === row.id} direction={order} onClick={createSortHandler(row.id)}>
              {row.label}
              {orderBy === row.id && (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              )}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const DataTable = (props: QueryHookResult<ShipsData, OperationVariables>) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<string>("name");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { data, loading } = props;

  if (loading || data === undefined) {
    return <Paper>Loading...</Paper>;
  }
  const rows: Array<shipType> = data.ships; //Typescript need the confirmation

  function handleChangePage(event: unknown, newPage: number) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  function handleRequestSort(event: React.MouseEvent<unknown>, property: string) {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <EnhancedTableHead classes={classes} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
        <TableBody>
          {stableSort<shipType>(rows, getSorting(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
              return (
                <TableRow hover tabIndex={-1} key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell padding="checkbox" align="left">
                    {row.status || "unknown"}
                  </TableCell>
                  <TableCell align="left">{(row.speed_kn * 1.852).toFixed(2)}</TableCell>
                  <TableCell align="left">
                    {row.position.latitude ? `${row.position.latitude},${row.position.longitude}` : "unknown"}
                  </TableCell>
                  <TableCell align="left">{`${row.successful_landings || 0}/${row.attempted_landings || 0}`}</TableCell>
                  <TableCell align="center">{row.weight_kg || "unknown"}</TableCell>
                </TableRow>
              );
            })}
          {emptyRows > 0 && (
            <TableRow style={{ height: 49 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DataTable;
