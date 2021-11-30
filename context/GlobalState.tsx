import { TodoState } from "../interfaces/interfaces";
import React, { createContext, useReducer, useState, useEffect } from "react";
import axios from "axios";
import useSWR, { SWRConfig } from "swr";

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
  const { data, error } = useSWR("/api/bitacora", fetcher);
  console.log("DATA fetch", data);
  const apiUrl = "http://localhost:3000/api/bitacora/";
  const [url, setUrl] = useState(apiUrl);

  useEffect(() => {
    setLoading(true);
    dispatch({
      type: "FETCH_BITACORAS_REQUEST",
      payload: "Haciendo un Request",
    });
    const setBitacoraList = async () => {
      try {
        const result = await axios(url);
        setLoading(false);
        dispatch({
          type: "FETCH_BITACORAS_SUCCESS",
          payload: result.data,
        });
      } catch (error) {
        //setIsError(true);
      }
    };
    setBitacoraList();
  }, [url]);

  function addBitacora(bitacora: any) {
    const fetchData = async () => {
      const result = await fetch("/api/bitacora/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bitacora),
      });
      if (!result.ok) {
        const message = `An error has occured: ${result.status}`;
        throw new Error(message);
      }
      const result1 = await fetch("/api/bitacora/top");
      const bitacoraTop = await result1.json();
      console.log("TopAfterCreate", bitacoraTop);
      dispatch({
        type: "ADD_BITACORA",
        payload: bitacoraTop, // el endpoint devuelve el id nuevo creado.
      });
    };
    fetchData().catch((error) => {
      error.message; // 'An error has occurred: 404'
    });
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
  function editBitacoraNewEvent(bitacoraId: any) {
    const fetchData = async () => {
      console.log("DataRecibidaNewEvent", bitacoraId);
      try {
        const result1 = await fetch("/api/bitacora/" + bitacoraId);
        const bitacoraupdate = await result1.json(); //bitacora + name of relation
        console.log("Actualizar Result", bitacoraupdate);
        dispatch({
          type: "EDIT_BITACORA_NEW_EVENT",
          payload: bitacoraupdate, // el endpoint devuelve el id nuevo creado.
        });
      } catch (error) {
        console.log("Error data", error);
      }
    };
    fetchData();
  }

  function removeBitacora(bitacoraId: any) {
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
        addBitacora,
        editBitacora,
        editBitacoraNewEvent,
        removeBitacora,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
