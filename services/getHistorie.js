import axios from "axios";
//const ENDPOINT = 'http://18.216.199.22:1337/api/v1/historie/';
const DATABASEURL = process.env.REACT_APP_BASE_URL;
const ENDPOINT = DATABASEURL + "historie/";

export default async function getHistorie(cedula) {
  try {
    const resp = await axios.get(`${ENDPOINT}${cedula}`);
    const data = resp.data;
    return data;
  } catch (error) {
    return error;
  }
}
