import { InitialStateType } from "../interfaces/interfaces";

export const AppReducerBitacoraId = (
  state: InitialStateType,
  action: any
): InitialStateType => {
  switch (action.type) {
    case "FETCH_BITACORA_ID_REQUEST":
      console.log("El STATE BitacoraId Request", state.bitacoraId);
      return {
        ...state,
        loading: true,
      };
    case "FETCH_BITACORA_ID_SUCCESS":
      console.log("StateBita", state.bitacoraId);

      return {
        bitacoraId: [
          ...state.bitacoraId,
          {
            id: action.payload.id,
            author: action.payload.author,
            author_id: action.payload.author_id,
            bitacora_date: action.payload.bitacora_date,
            created_at: action.payload.created_at,
            updated_at: action.payload.created_at,
            _count: action.payload._count,
          },
        ], // agrega mas datos al array
      };

    case "REMOVE_BITACORA_ID": //Remove todos los eventos de una Bitacora
      console.log("payload REMOVE_BITACORA_ID", action.payload);

      return {
        ...state,
        bitacoraId: state.bitacoraId.filter((bitacoraId) => bitacoraId.id <= 0),
      };

    default:
      throw new Error();
  }
};
