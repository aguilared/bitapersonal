import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { red } from "@material-ui/core/colors";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import getBitacoraEvents from "../../services/getBitacoraEvents";
import { CardImg } from "reactstrap";
import dayjs from "dayjs";
import useSWR from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

const styles = {
  card: {
    maxWidth: 645,
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 40,
  },

  avatar: {
    backgroundColor: red[500],
  },
};
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 145,
  },
  media: {
    height: 140,
  },
  card: {
    maxWidth: 150,
  },

  avatar: {
    backgroundColor: red[500],
  },
}));

function BitacoraCard(props) {
  const { classes, bitacoraSelected, imageObj, content } = props;
  const [loading, setLoading] = useState(false);
  const [totConsultas, setTotConsultas] = useState("");
  const [historie, setHistorie] = useState({});
  const [bitacora, setBitacora] = useState({});
  console.log("bitacoraSelected", bitacoraSelected);
  //const { data, error } = useSWR(`/api/bitacora/${bitacoraSelected}`, fetcher);
  const { data, error } = useSWR("/api/bitacora/1", fetcher);

  console.log("DATA", data);
  console.log("ERROR", error);

  const convertDate = (date) => {
    var d = dayjs(date).format("DD-MM-YYYY");
    return d;
  };

  useEffect(
    function () {
      setLoading(true);
      console.log("BitacoraID nuseEffect", bitacoraSelected.id);

      getBitacoraEvents(bitacoraSelected.id).then((resp) => {
        const { bita_events } = resp[0];
        console.log("RESP", resp);
        console.log("RESPO", resp[0]);
        console.log("RESPBitaEvents", bita_events);

        //setLoading(false);
        setBitacora(bita_events);
        //setTotConsultas(count);
        console.log("Bitacora dentro nuseEffect", bita_events);
      });
    },
    [setBitacora]
  );
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-1">
        <div className="bg-white shadow-lg ">
          <div className="flex justify-between p-1">
            <div>
              <h3 className="text-2xl tahoma font-extrabold tracking-widest text-gray-500">
                &nbsp;
              </h3>
              <h3 className="text-2xl tahoma font-extrabold tracking-widest text-gray-500">
                Bitacora Personal # {bitacoraSelected.id}
              </h3>
            </div>
            <div className="p-2">
              <ul className="flex">
                <li className="flex flex-col items-center p-2 border-l-2 border-indigo-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                  <span className="text-sm">Author</span>
                  <span className="text-sm">
                    {bitacoraSelected.author.name}
                  </span>
                </li>
                <li className="flex flex-col p-2 border-l-2 border-indigo-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-sm">
                    {bitacoraSelected.bitacoraDate}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full h-0.5 bg-indigo-500"></div>
          <div className="flex justify-center p-4">
            <div className="border-b border-gray-200 shadow">
              <table className="shadow-lg bg-white table-auto">
                <tr>
                  <th className="bg-blue-100 border text-left px-8 py-4">#</th>
                  <th className="bg-blue-100 border text-left px-8 py-4">
                    Tipo Evento
                  </th>
                  <th className="bg-blue-100 border text-left px-8 py-4">
                    Description Event
                  </th>
                  <th className="bg-blue-100 border text-left px-8 py-4">
                    Created Event
                  </th>
                </tr>
                {bitacora.length > 0 ? (
                  <>
                    {bitacora.map((bitacora, key) => (
                      <tr>
                        <td className="border px-8 py-4">{key + 1}</td>
                        <td className="border px-8 py-4">
                          {bitacora.event.description}
                        </td>
                        <td className="border px-8 py-4">
                          {bitacora.description}
                        </td>
                        <td className="border px-8 py-4">
                          {bitacora.event.createdAt}
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <p className="text-center bg-gray-100 text-gray-500 py-5">
                    No data Bitacoras
                  </p>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

BitacoraCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BitacoraCard);
