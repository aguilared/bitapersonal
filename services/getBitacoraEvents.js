import axios from "axios";
//const ENDPOINT = 'http://18.216.199.22:1337/api/v1/historie/';
//const DATABASEURL = "http://localhost:3000/api/bitacora/events/";
//const ENDPOINT = DATABASEURL + "http://localhost:3000/api/bitacora/events/2/";
const ENDPOINT = "http://localhost:3000/api/bitacora/events/";

export default async function getBitacoraEvents(bitacoraId) {
  try {
    const resp = await axios.get(`${ENDPOINT}${bitacoraId}`);
    const data = resp.data;
    console.log("DATAGET Bitacora", data[0]);
    return data;
  } catch (error) {
    return error;
  }
}
