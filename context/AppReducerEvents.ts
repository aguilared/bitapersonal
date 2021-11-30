import { BitaEvents } from "../interfaces/interfaces";

export const AppReducerEvents = (
  state: BitaEvents,
  action: any
): BitaEvents => {
  switch (action.type) {
    case "FETCH_BITA_EVENTS_REQUEST":
      console.log("payload FETCH_BITA_EVENTS_REQUEST", action.payload);
      console.log("El STATE", state);
      console.log("El STATE bitaEvents", state.bitaEvents);

      return {
        ...state,
        loading: true,
      };
    case "FETCH_BITA_EVENTS_SUCCESS":
      console.log("payload FETCH_BITA_EVENTS_SUCCESS", action.payload);
      console.log("El STATE", state);
      console.log("El STATE bitaEvents", state.bitaEvents);
      /* console.log(
        'es array?  FETCH_BITACORAS_SUCCESS',
        Array.isArray(action.payload),
        ' ',
        action.payload
      ); */
      return Array.isArray(action.payload)
        ? {
            loading: false,
            bitaEvents: [...state.bitaEvents, ...action.payload],
          }
        : {
            loading: true,
            ...state,
          };

    case "EDIT_BITAEVENT":
      const updatedBitaEvent = action.payload;
      console.log("El State to Update", state);
      console.log("toUpdate", updatedBitaEvent);
      console.log("toUpdateID", updatedBitaEvent.id);
      const updatedBitaEvents = state.bitaEvents.map((bitaevents) => {
        if (bitaevents.id === updatedBitaEvent.id) {
          return updatedBitaEvent;
        }
        return bitaevents;
      });
      return {
        ...state,
        bitaEvents: updatedBitaEvents,
      };

    case "REMOVE_BITA_EVENT":
      return {
        ...state,
        bitaEvents: state.bitaEvents.filter(
          (bitaevent) => bitaevent.id !== action.payload
        ),
      };
    case "ADD_BITA_EVENT":
      console.log("payload ADD BITAEVENT", action.payload);
      console.log("El STATE BITAEVENT SUCCESS", state.bitaEvents);
      console.log(
        "es array?  ADD BITAEVENT",
        Array.isArray(action.payload),
        " ",
        action.payload
      );
      return Array.isArray(action.payload)
        ? {
            loading: false,
            bitaEvents: [...action.payload, ...state.bitaEvents],
          }
        : {
            loading: true,
            ...state,
          };
    default:
      return state;
  }
};
