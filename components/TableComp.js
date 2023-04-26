import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "name", label: "Name", minWidth: 150 },
  { id: "email", label: "Email", minWidth: 140 },
  { id: "city", label: "City", minWidth: 150 },
  { id: "car", label: "Car", minWidth: 50 },
  { id: "gender", label: "Gender", minWidth: 60 },
  { id: "income", label: "Income", minWidth: 60 },
  { id: "phonePrice", label: "Phone $", minWidth: 100 },
  { id: "quote", label: "Quote", minWidth: 180 },
];

export default function TableComp({ data }) {
  const [rows, setRows] = React.useState([]);
  React.useEffect(() => {
    const temp = [];
    for (let d of data) {
      temp.push({
        name: d.first_name + " " + d.last_name,
        email: d.email,
        city: d.city,
        car: d.car,
        gender: d.gender,
        income: d.income,
        phonePrice: d.phone_price,
        quote: d.quote,
        id: d.id,
      });
    }
    setRows(temp);
  }, []);
  console.log(data);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      style={{ marginTop: "2rem" }}
      sx={{ width: "100%", overflow: "hidden" }}
    >
      <TableContainer sx={{ maxHeight: "75vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
