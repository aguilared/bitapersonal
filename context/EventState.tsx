import { BitaEvents } from "../interfaces/interfaces";
import React, {
  createContext,
  useReducer,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import useSWR from "swr";
import { fetcher } from "../lib/fetch";

import { AppReducerEvents } from "./AppReducerEvents";
import useBitacora from "../hooks/useBitacora";

//import AppReducer from "../reducers/index";

const INITIAL_STATE: BitaEvents = {
  bitaEvents: [],
  loading: false,
};

const INITIAL_STATE1: any = {
  bitacora_id: "",
  author_id: "",
  description: "",
  event_date: "",
  event_id: "",
  created_at: "",
  updated_at: "",
};

interface Props {
  children: JSX.Element | JSX.Element[];
}
export const EventsContext = createContext(INITIAL_STATE);

export const EventsProvider = ({ children }: Props): JSX.Element => {
  const [state, dispatch] = useReducer(AppReducerEvents, INITIAL_STATE);
  const [bitaEvents, setBitaEvents] = useState(INITIAL_STATE1);
  console.log("Seteando ", bitaEvents);
  const [loading, setLoading] = useState(true);
  const ENDPOINT = "http://localhost:3000/api/bitacora/events/admin/";
  const { isBitacora, loadBitacora, bitacora } = useBitacora(); //to Global
  console.log("IsBitacora?", isBitacora, " ID", bitacora);

  console.log("BITACORA", bitacora);

  useEffect(() => {
    if (!isBitacora) {
      // no run reducer initial start
      console.log("No hay IDBitacora", bitacora);
      return;
    }
    dispatch({
      type: "REMOVE_BITA_EVENTS",
      payload: "Remove bitacora eventos anteriores",
    });
    const fetchData = async () => {
      try {
        const result = await axios(`${ENDPOINT}${bitacora}`);
        setLoading(false);
        setBitaEvents(result.data);

        dispatch({
          type: "FETCH_BITA_EVENTS_SUCCESS",
          payload: result.data,
        });
      } catch (error) {
        //setIsError(true);
      }
    };
    //fetchData();
    setTimeout(fetchData, 1000);
  }, [ENDPOINT, setBitaEvents, bitacora]);

  const getBitaEvents = useCallback(
    (bitacora: any) => {
      console.log("ID-Bitacora getEvents", bitacora);
      const fetchData = async () => {
        dispatch({
          type: "FETCH_BITA_EVENTS_REQUEST",
          payload: "Haciendo un Request BitaEvents",
        });
        try {
          const result = await axios.get(`${ENDPOINT}${bitacora}`);
          console.log("result getEvent", result.data);
          setBitaEvents(result.data);
          dispatch({
            type: "FETCH_BITA_EVENTS_SUCCESS",
            payload: result.data, //
          });
        } catch (error) {
          //setIsError(true);
          console.log("Error getEvents", error);
        }
      };
      fetchData();
    },
    [ENDPOINT]
  );

  const addBitaEvent = useCallback((bitacora: any) => {
    const fetchData = async () => {
      try {
        const result = await fetch("/api/bitacora/events/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bitacora),
        });
        const result1 = await fetch("/api/bitacora/events/top");
        const bitaEventTop = await result1.json();
        console.log("TopAfterCreate", bitaEventTop);
        dispatch({
          type: "ADD_BITA_EVENT",
          payload: bitaEventTop, // el endpoint devuelve el id nuevo creado.
        });
      } catch (error) {
        console.log("Error data", error);

        return error;
      }
    };
    fetchData();
  }, []);

  const editBitaEvent = useCallback((bitacora: any) => {
    const fetchData = async () => {
      console.log("DataRecibida", bitacora);
      try {
        const result = await fetch("/api/bitacora/events/admin/edit", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bitacora),
        });

        dispatch({
          type: "EDIT_BITAEVENT",
          payload: bitacora, //
        });
      } catch (error) {
        console.log("Error data", error);
      }
    };
    fetchData();
  }, []);

  function removeBitaEvent(eventId: any) {
    const fetchData = async () => {
      try {
        const result = await fetch("/api/bitacora/events/delete/" + eventId);
        console.log("result borrar", result);
        // @ts-ignore
        if (!result.ok) {
          console.log("Un Error ocurrio", result);
        }
        dispatch({
          type: "REMOVE_BITA_EVENT",
          payload: eventId,
        });
      } catch (error) {
        //setIsError(true);
        console.log("Error borrar", error);
      }
    };
    fetchData();
  }

  const clearBitaEvents = () => {
    //setBitaEvents(null);
    setBitaEvents(INITIAL_STATE1);
    //state.bitaEvents(null);
    console.log("CLEARED BitaEVENTS IN CONTEXT FILE", bitaEvents); // not cleared
  };
  return (
    <EventsContext.Provider
      value={{
        bitaEvents: state.bitaEvents,
        getBitaEvents,
        addBitaEvent,
        editBitaEvent,
        removeBitaEvent,
        clearBitaEvents,
        loading,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
