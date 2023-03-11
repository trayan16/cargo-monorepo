import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styled from "styled-components";
import { Typography } from "@mui/material";
const BasicTableContainer = styled.div`
  overflow: auto;
  .innerContainer {
    width: "100%";
    display: "table";
    table-layout: "fixed";
  }
`;
function createData(
  status: string,
  vehicle: string,
  origin: string,
  created: string
) {
  return { status, vehicle, origin, created };
}

const rows = [
  createData(
    "Dispatched",
    "Mercedes GLA 250",
    "GA, Virginia",
    "Today, 10:27AM"
  ),
  createData("Dispatched", "BMX X3 SDrive", "Savannah", "Today, 09:27AM"),
  createData(
    "Delivered",
    "Audi A6 2017 Prestige",
    "Houston, TX",
    "Wednesday, 02:15PM"
  ),
];

export const BasicTable = () => {
  return (
    <BasicTableContainer>
      <div className="innerContainer">
        <TableContainer >
            <Typography fontSize={24} className="cardHeader" color="textSecondary" gutterBottom variant="body2">
              LAST 3 ORDERS
            </Typography>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell align="left">Vehicle</TableCell>
                <TableCell align="left">Origin</TableCell>
                <TableCell align="left">Created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.status}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.status}
                  </TableCell>
                  <TableCell align="left">{row.vehicle}</TableCell>
                  <TableCell align="left">{row.origin}</TableCell>
                  <TableCell align="left">{row.created}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </BasicTableContainer>
  );
};
