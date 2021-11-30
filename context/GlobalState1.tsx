import { TodoState } from "../interfaces/interfaces";
import React, { createContext, useReducer, useState, useEffect } from "react";
import axios from "axios";
import useSWR from "swr";

import { fetcher } from "../lib/fetch";
import { AppReducer } from "./AppReducer";
//import AppReducer from "../reducers/index";

const INITIAL_STATE: TodoState = {
  bitacoras1: [],
  loading: false,
};
const INITIAL_STATE1 = {
  id: "",
  author_id: "",
  author: [],
  bitacora_date: "",
  created_at: "",
  updated_at: "",
  count: [],
};

interface Props {
  children: JSX.Element | JSX.Element[];
}
export const GlobalContext = createContext(INITIAL_STATE);

export const GlobalProvider = ({ children }: Props): JSX.Element => {
  //const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const [state, dispatch] = useReducer(AppReducer, INITIAL_STATE);
  const [bitacoras1, setBitacoras1] = useState(INITIAL_STATE1);
  const [loading, setLoading] = useState(true);
  const ENDPOINT = "http://localhost:3000/api/bitacora/";

  function GetBitacoras() {
    console.log("Haciendo el GetBitacoras");
    useEffect(() => {
      console.log("Haciendo el useEffect", setBitacoras1);

      const setBitacoraList = async () => {
        dispatch({
          type: "FETCH_BITACORAS_REQUEST",
          payload: "Haciendo un Request",
        });
        const result = await axios(`${ENDPOINT}`);
        console.log("Haciendo el GetBitacoras Result", result);
        setBitacoras1(result.data);

        dispatch({
          type: "FETCH_BITACORAS_SUCCESS",
          payload: bitacoras1,
        });
      };
      setBitacoraList();
    }, [setBitacoras1]);
  }

  function addBitacora(bitacora: any) {
    const fetchData = async () => {
      try {
        const result = await fetch("/api/bitacora/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bitacora),
        });
        const result1 = await fetch("/api/bitacora/top");
        const bitacoraTop = await result1.json();
        console.log("TopAfterCreate", bitacoraTop);
        dispatch({
          type: "ADD_BITACORA",
          payload: bitacoraTop, // el endpoint devuelve el id nuevo creado.
        });
      } catch (error) {
        console.log("Error data", error);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("error data", error.response.data);
          console.log("error status", error.response.status);
          console.log("error header", error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log("error request", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error message", error.message);
        }
        console.log("Error config", error.config);
        return error.response;
      }
    };
    fetchData();
  }

  function editBitacora(bitacora: any) {
    const fetchData = async () => {
      console.log("DataRecibida", bitacora.id);
      try {
        const result = await fetch("/api/bitacora/update", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bitacora),
        });
        const result1 = await fetch("/api/bitacora/" + bitacora.id);
        const bitacoraupdate = await result1.json(); //bitacora + name of relation

        dispatch({
          type: "EDIT_BITACORA",
          payload: bitacoraupdate, // el endpoint devuelve el id nuevo creado.
        });
      } catch (error) {
        console.log("Error data", error);
      }
    };
    fetchData();
  }

  function removeBitacora(bitacoraId) {
    const fetchData = async () => {
      try {
        const result = await fetch("/api/bitacora/delete/" + bitacoraId);
        console.log("result borrar", result);
        // @ts-ignore
        if (!result.ok) {
          console.log("Un Error ocurrio", result);
        }
        dispatch({
          type: "REMOVE_BITACORA",
          payload: bitacoraId,
        });
      } catch (error) {
        //setIsError(true);
        console.log("Error borrar", error);
      }
    };
    fetchData();
  }

  return (
    <GlobalContext.Provider
      value={{
        bitacoras1: state.bitacoras1,
        GetBitacoras,
        addBitacora,
        editBitacora,
        removeBitacora,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
