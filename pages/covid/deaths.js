import { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { fetchLatestCovids } from "../../firebase/client";
import Container from "../../components/Container";
import dayjs from "dayjs";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 480,
  },
});

const convertDate = (date) => {
  var d = dayjs(date).format("DD-M-YY ");
  return d;
};
const formatter = new Intl.NumberFormat("de-DE");

export default function CovidsDeath() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);

  useEffect(
    function () {
      setLoading(true);
      fetchLatestCovids().then((countries) => {
        setLoading(false);
        setCountries(countries);
      });
    },
    [setCountries]
  );

  return (
    <Container>
      <div className="App">
        <div className="container mx-auto">
          <h3 className="text-center mt-1 text-base leading-8 text-black font-bold tracking-wide uppercase">
            Venezuela Segura. Covid-19 Top mundial - Deathss
          </h3>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Pos.</StyledTableCell>
                  <StyledTableCell>Countrie</StyledTableCell>
                  <StyledTableCell align="right">Deaths</StyledTableCell>
                  <StyledTableCell align="right">Confirmed</StyledTableCell>
                  <StyledTableCell align="right">Recovered</StyledTableCell>
                  <StyledTableCell align="right">Updated</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {countries.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {formatter.format(row.deaths)}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {formatter.format(row.confirmed)}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {formatter.format(row.recovered)}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {convertDate(row.createdAt)}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </Container>
  );
}
