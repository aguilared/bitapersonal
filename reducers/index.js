import { bitacorasReducer } from "./bitacorasReducer";
import { eventsReducer } from "./eventsReducer";

const AppReducer = ({ bitacoras1, bitaEvents }, action) => {
  return {
    bitacoras1: bitacorasReducer(bitacoras1, action),
    //bitaEvents: eventsReducer(bitaEvents, action),
  };
};

export default AppReducer;
