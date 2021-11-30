import { createContext, useState, useEffect } from "react";

const initialState = {
  bitacora: "",
};
export const BitacoraContext = createContext(initialState);

export const BitacoraContextProvider = ({ children }) => {
  const [bitacora, setBitacora] = useState("");
  useEffect(() => {
    setBitacora(window.sessionStorage.getItem("bitacora"));
  }, []);

  return (
    <BitacoraContext.Provider
      value={{
        bitacora,
        setBitacora,
      }}
    >
      {children}
    </BitacoraContext.Provider>
  );
};
