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
import getHistorie from "../../services/getHistorie";
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
      getHistorie(bitacoraSelected).then((resp) => {
        const { count, historie } = resp;
        setLoading(false);
        setHistorie(historie);
        setTotConsultas(count);
        console.log("historie dentro nuseEffect", historie);
      });
    },
    [setHistorie]
  );
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-3/5 bg-white shadow-lg">
          <div className="flex justify-between p-4">
            <div>
              <h1 className="text-3xl italic font-extrabold tracking-widest text-indigo-500">
                Larainfo
              </h1>
              <p className="text-base">
                If account is not paid within 7 days the credits details
                supplied as confirmation.
              </p>
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
                  <span className="text-sm">www.larainfo.com</span>
                  <span className="text-sm">www.lorememhh.com</span>
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
                    2821 Kensington Road,Avondale Estates, GA 30002 USA
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full h-0.5 bg-indigo-500"></div>
          <div className="flex justify-between p-4">
            <div>
              <h6 className="font-bold">
                Order Date :{" "}
                <span className="text-sm font-medium"> 12/12/2022</span>
              </h6>
              <h6 className="font-bold">
                Order ID :{" "}
                <span className="text-sm font-medium"> 12/12/2022</span>
              </h6>
            </div>
            <div className="w-40">
              <address className="text-sm">
                <span className="font-bold"> Billed To : </span>
                Joe Smith 795 Folsom Ave San Francisco, CA 94107 P: (123)
                456-7890
              </address>
            </div>
            <div className="w-40">
              <address className="text-sm">
                <span className="font-bold">Ship To :</span>
                Joe doe 800 Folsom Ave San Francisco, CA 94107 P: + 111-456-7890
              </address>
            </div>
            <div></div>
          </div>
          <div className="flex justify-center p-4">
            <div className="border-b border-gray-200 shadow">
              <table className="">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-xs text-gray-500 ">#</th>
                    <th className="px-4 py-2 text-xs text-gray-500 ">
                      Product Name
                    </th>
                    <th className="px-4 py-2 text-xs text-gray-500 ">
                      Quantity
                    </th>
                    <th className="px-4 py-2 text-xs text-gray-500 ">Rate</th>
                    <th className="px-4 py-2 text-xs text-gray-500 ">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr className="whitespace-nowrap">
                    <td className="px-6 py-4 text-sm text-gray-500">1</td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        Amazon Brand - Symactive Men's Regular Fit T-Shirt
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">4</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">$20</td>
                    <td className="px-6 py-4">$30</td>
                  </tr>
                  <tr className="whitespace-nowrap">
                    <td className="px-6 py-4 text-sm text-gray-500">2</td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        Amazon Brand - Symactive Men's Regular Fit T-Shirt
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">2</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">$60</td>
                    <td className="px-6 py-4">$12</td>
                  </tr>
                  <tr className="border-b-2 whitespace-nowrap">
                    <td className="px-6 py-4 text-sm text-gray-500">3</td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        Amazon Brand - Symactive Men's Regular Fit T-Shirt
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">1</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">$10</td>
                    <td className="px-6 py-4">$13</td>
                  </tr>
                  <tr className="">
                    <td colSpan="3"></td>
                    <td className="text-sm font-bold">Sub Total</td>
                    <td className="text-sm font-bold tracking-wider">
                      <b>$950</b>
                    </td>
                  </tr>

                  <tr>
                    <th colSpan="3"></th>
                    <td className="text-sm font-bold">
                      <b>Tax Rate</b>
                    </td>
                    <td className="text-sm font-bold">
                      <b>$1.50%</b>
                    </td>
                  </tr>

                  <tr className="text-white bg-gray-800">
                    <th colSpan="3"></th>
                    <td className="text-sm font-bold">
                      <b>Total</b>
                    </td>
                    <td className="text-sm font-bold">
                      <b>$999.0</b>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-between p-4">
            <div>
              <h3 className="text-xl">Terms And Condition :</h3>
              <ul className="text-xs list-disc list-inside">
                <li>
                  All accounts are to be paid within 7 days from receipt of
                  invoice.
                </li>
                <li>
                  To be paid by cheque or credit card or direct payment online.
                </li>
                <li>
                  If account is not paid within 7 days the credits details
                  supplied.
                </li>
              </ul>
            </div>
            <div className="p-4">
              <h3>Signature</h3>
              <div className="text-4xl italic text-indigo-500">AAA</div>
            </div>
          </div>
          <div className="w-full h-0.5 bg-indigo-500"></div>

          <div className="p-4">
            <div className="flex items-center justify-center">
              Thank you very much for doing business with us.
            </div>
            <div className="flex items-end justify-end space-x-3">
              <button className="px-4 py-2 text-sm text-green-600 bg-green-100">
                Print
              </button>
              <button className="px-4 py-2 text-sm text-blue-600 bg-blue-100">
                Save
              </button>
              <button className="px-4 py-2 text-sm text-red-600 bg-red-100">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-6/12 mt-4 text-left bg-white shadow-lg">
          <div className="flex justify-between px-8 py-6">
            <div className="flex items-center">sale invoice</div>
            <div className="flex items-center gap-4">
              <button className="px-2 py-1 bg-gray-200 hover:bg-gray-400">
                Save
              </button>
              <button className="px-2 py-1 bg-gray-200 hover:bg-gray-400">
                Print
              </button>
            </div>
          </div>
          <div className="w-full h-0.5 bg-gray-800"></div>
        </div>
      </div>
    </>
  );
}

BitacoraCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BitacoraCard);
