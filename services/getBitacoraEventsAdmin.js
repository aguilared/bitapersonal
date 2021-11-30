import axios from "axios";
const ENDPOINT = "http://localhost:3000/api/bitacora/events/admin/";
export default async function getBitacoraEventsAdmin(bitacoraId) {
  try {
    const resp = await axios.get(`${ENDPOINT}${bitacoraId}`);
    const data = resp.data;
    console.log("DATAGET Bitacora", data[0]);
    return data;
  } catch (error) {
    return error;
  }
}
