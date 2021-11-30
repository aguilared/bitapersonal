import { useContext, useState } from 'react';
import axios from 'axios';
// const ENDPOINT = 'http://18.216.199.22:1337/api/v1/historie/';
const DATABASEURL = process.env.REACT_APP_BASE_URL;
const ENDPOINT = `${DATABASEURL}histories/search?search=`;

export default async function getHistorieSearch(cedula) {
  try {
    const resp = await axios.get(`${ENDPOINT}${cedula}`);
    const { data } = resp;
    console.log('en el service Search', data);
    return data;
  } catch (error) {
    return error;
  }
}
