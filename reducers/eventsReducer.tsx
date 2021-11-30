import { TodoState, Todo } from "../interfaces/interfaces";

export const AppReducer = (state: TodoState, action: any): TodoState => {
  switch (action.type) {
    case "FETCH_BITA_EVENTS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_BITA_EVENTS_SUCCESS":
      console.log("payload FETCH_BITA_EVENTS_SUCCESS", action.payload);
      console.log("El STATE", state);
      console.log("El STATE bitaEvents SUCCESS", state.bitaEvents);
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

    default:
      return state;
  }
};
