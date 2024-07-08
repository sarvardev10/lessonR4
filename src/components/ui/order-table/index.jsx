import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { order } from "../../../service";
import { EditOrder } from "../../modal";
import { useState } from "react";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgba(35,137,218,1)",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables({ data }) {
  const [open, setOpen] = useState(false);
  const deleteItem = async (id) => {
    try {
      const response = await order.delete(id);
      response.status === 200 && window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <EditOrder open={open} handleClose={() => setOpen(false)} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">T/R</StyledTableCell>
              <StyledTableCell align="center">Client name</StyledTableCell>
              <StyledTableCell align="center">Client phone</StyledTableCell>
              <StyledTableCell align="center">Service name </StyledTableCell>
              <StyledTableCell align="center">Service price </StyledTableCell>
              <StyledTableCell align="center">Amount</StyledTableCell>
              <StyledTableCell align="center">Status </StyledTableCell>
              <StyledTableCell align="center">Action </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                <StyledTableCell align="center">
                  {item.client_name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.client_phone_number}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.service_name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.service_price}
                </StyledTableCell>

                <StyledTableCell align="center">{item.amount}</StyledTableCell>
                <StyledTableCell align="center">{item.status}</StyledTableCell>
                <StyledTableCell align="center">
                  <div align="center" className="flex gap-3 justify-center">
                    <button onClick={() => setOpen(true)}>
                      <EditIcon />
                    </button>
                    <button onClick={() => deleteItem(item.id)}>
                      {" "}
                      <DeleteIcon />
                    </button>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
