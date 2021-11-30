import { TodoState } from "../interfaces/interfaces";

export const AppReducer = (state: TodoState, action: any): TodoState => {
  switch (action.type) {
    case "FETCH_BITACORAS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_BITACORAS_SUCCESS":
      console.log("payload FETCH_BITACORAS_SUCCESS", action.payload);
      console.log("El STATE ", state);
      console.log("El STATE bitacoras1 SUCCESS", state.bitacoras1);
      /* console.log(
        'es array?  FETCH_BITACORAS_SUCCESS',
        Array.isArray(action.payload),
        ' ',
        action.payload
      ); */
      return Array.isArray(action.payload)
        ? {
            loading: false,
            bitacoras1: [...state.bitacoras1, ...action.payload],
          }
        : {
            loading: true,
            ...state,
          };

    case "FETCH_BITACORAS_FAILURE":
      return {
        ...state,
        bitacoras1: [...state.bitacoras1, ...action.payload], // agrega mas datos al array
      };
    case "LOAD_BITACORAS_SUCCESS":
      //console.log('payload LOAD_BITACORAS_SUCCESS', action.payload);
      /*console.log(
        'es array LOAD_BITACORAS_SUCCESS',
        Array.isArray(action.payload)
      ); */

      return {
        ...state,
        loading: false,
        bitacoras1: [...state.bitacoras1, ...action.payload], // agrega mas datos al array
      };
    case "ADD_BITACORA":
      console.log("payload ADD BITACORA", action.payload);
      console.log("El STATE bitacoras1 SUCCESS", state.bitacoras1);
      console.log(
        "es array?  ADD BITACORA",
        Array.isArray(action.payload),
        " ",
        action.payload
      );
      return Array.isArray(action.payload)
        ? {
            loading: false,
            bitacoras1: [...action.payload, ...state.bitacoras1],
          }
        : {
            loading: true,
            ...state,
          };
    case "REMOVE_BITACORA":
      return {
        ...state,
        bitacoras1: state.bitacoras1.filter(
          (bitacora) => bitacora.id !== action.payload
        ),
      };
    case "EDIT_BITACORA":
      const updatedBitacora = action.payload;
      console.log("toUpdate", updatedBitacora);
      console.log("toUpdateID", updatedBitacora.id);
      const updatedBitacoras = state.bitacoras1.map((bitacora) => {
        if (bitacora.id === updatedBitacora.id) {
          return updatedBitacora;
        }
        return bitacora;
      });
      return {
        ...state,
        bitacoras1: updatedBitacoras,
      };
    case "EDIT_BITACORA_NEW_EVENT":
      const updatedBitacoraN = action.payload;
      console.log("toUpdate", updatedBitacoraN);
      console.log("toUpdateID", updatedBitacoraN.id);
      const updatedBitacorasN = state.bitacoras1.map((bitacora) => {
        if (bitacora.id === updatedBitacoraN.id) {
          return updatedBitacoraN;
        }
        return bitacora;
      });
      return {
        ...state,
        bitacoras1: updatedBitacorasN,
      };

    default:
      return state;
  }
};
