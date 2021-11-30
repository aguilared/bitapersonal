import { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Link from "next/link";
import { useRouter } from "next/router";

import { fetchLatestCovidsConfir } from "../../firebase/client";
import useTimeAgo from "../../hooks/useTimeAgo";

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
};

console.log("CovidsFetch", fetchLatestCovidsConfir());

const links = [
  { href: "https://zeit.co/now", label: "ZEIT" },
  { href: "https://github.com/zeit/next.js", label: "GitHub" },
].map((link) => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

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
    minWidth: 700,
  },
});

export default function ComposeTweet() {
  const [rows, setRows] = useState([]);

  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);

  useEffect(
    function () {
      setLoading(true);
      fetchLatestCovidsConfir().then((countries) => {
        setLoading(false);
        setCountries(countries);
      });
    },
    [setCountries]
  );

  console.log("Covids luego", countries);

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
        </ul>

        <style jsx>{`
          div {
            padding: 15px;
          }

          textarea {
            border: 0;
            font-size: 21px;
            min-height: 200px;
            padding: 15px;
            outline: 0;
            resize: none;
            width: 100%;
          }
          input {
            border: 0;
            font-size: 21px;
            min-height: 200px;
            padding: 15px;
            outline: 0;
            resize: none;
            width: 100%;
          }
          :global(body) {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
              Helvetica, sans-serif;
          }
          nav {
            text-align: center;
          }
          ul {
            display: flex;
            justify-content: space-between;
          }
          nav > ul {
            padding: 4px 16px;
          }
          li {
            display: flex;
            padding: 6px 8px;
          }
          a {
            color: #067df7;
            text-decoration: none;
            font-size: 13px;
          }
        `}</style>
      </nav>

      <div className="App">
        <div className="container mx-auto">
          <h3 className="text-center mt-20 text-base leading-8 text-black font-bold tracking-wide uppercase">
            Venezuela Segura. Covid-19 Top mundial - Covid-19 Confirmeds
          </h3>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Pos.</StyledTableCell>
                  <StyledTableCell>Countrie</StyledTableCell>
                  <StyledTableCell align="right">Confirmed</StyledTableCell>
                  <StyledTableCell align="right">Deaths</StyledTableCell>
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
                      {row.confirmed}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.deaths}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.recovered}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.createdAt}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}
