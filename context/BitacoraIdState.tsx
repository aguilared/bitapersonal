import { InitialStateType } from "../interfaces/interfaces";
import React, {
  createContext,
  useReducer,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";

import { AppReducerBitacoraId } from "./AppReducerBitacora";
import useBitacora from "../hooks/useBitacora";

const INITIAL_STATE = {
  bitacoraId: [],
  loading: false,
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const BitacoraIdContext = createContext<InitialStateType>(INITIAL_STATE);

export const BitacoraIdProvider = ({ children }: Props): JSX.Element => {
  const [state, dispatch] = useReducer(AppReducerBitacoraId, INITIAL_STATE);
  const [loading, setLoading] = useState(true);
  const ENDPOINT = "http://localhost:3000/api/bitacora/";
  const { isBitacora, bitacora } = useBitacora(); //to Global
  console.log("State", state);
  //console.log("StateBitacoraId", state.bitacoraId);

  const [author, setAuthor] = useState("");
  const [totalEvents, setTotalEvents] = useState("");
  const [bitacoraDate, setBitacoraDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!isBitacora) {
        // no run reducer initial start
        console.log("No hay IDBitacora", bitacora);
        return;
      }
      dispatch({
        type: "REMOVE_BITACORA_ID",
        payload: "Remove bitacora-Id anterior",
      });
      try {
        const result = await axios(`${ENDPOINT}${bitacora}`);
        console.log("ResBitacoraId", result);
        const resp = result.data;
        setAuthor(resp.author.name);
        setTotalEvents(resp._count.bita_events);
        setBitacoraDate(resp.bitacora_date);
        dispatch({
          type: "FETCH_BITACORA_ID_SUCCESS",
          payload: result.data,
        });
      } catch (err) {
        console.log("ERROR??", err);
      }
    };
    //fetchData();
    //setTimeout(fetchData, 1000);
    fetchData().catch(console.error);
  }, [ENDPOINT, isBitacora, bitacora]);

  const GetBitacoraId = useCallback(
    (bitacora: any) => {
      const fetchData = async () => {
        dispatch({
          type: "REMOVE_BITACORA_ID",
          payload: " REMOVE Bitacora ID",
        });

        try {
          const result = await axios.get(`${ENDPOINT}${bitacora}`);
          console.log("Result ", result.data);
          const resp = result.data;
          setAuthor(resp.author.name);
          setTotalEvents(resp._count.bita_events);
          setBitacoraDate(resp.bitacora_date);
          dispatch({
            type: "FETCH_BITACORA_ID_SUCCESS",
            payload: result.data, //
          });
          // return result.data;
        } catch (error) {
          //setIsError(true);
          console.log("Error getbitacoraId", error);
        }
      };
      fetchData();
    },
    [ENDPOINT]
  );

  return (
    <BitacoraIdContext.Provider
      value={{
        bitacoraId: state.bitacoraId,
        loading,
        GetBitacoraId,
        bitacora,
        author,
        bitacoraDate,
        totalEvents,
      }}
    >
      {children}
    </BitacoraIdContext.Provider>
  );
};
