import {
  useEffect,
  useState,
  useContext,
  useCallback,
  forwardRef,
} from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { red } from "@material-ui/core/colors";
import dayjs from "dayjs";
import Container from "../../../components/Container";
import useBitacora from "../../../hooks/useBitacora";
import { EventsContext, EventsProvider } from "../../../context/EventState";
import { GlobalContext, GlobalProvider } from "../../../context/GlobalState";
import getBitacoraEventsAdmin from "../../../services/getBitacoraEventsAdmin";
import getBitacora from "../../../services/getBitacora";
import Button from "../../../components/ButtonAdd";
const styles = {
  card: {
    maxWidth: 645,
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 40,
  },

  avatar: {
    backgroundColor: red[500],
  },
};
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 145,
  },
  media: {
    height: 140,
  },
  card: {
    maxWidth: 150,
  },

  avatar: {
    backgroundColor: red[500],
  },
}));

type Inputs = {
  id: number;
  event_id: number;
  bitacora_id: number;
  description: string;
  event_date: string;
};
const BitaEvents = (props: any): JSX.Element => {
  const { bitaEvents, addBitaEvent, editBitaEvent, removeBitaEvent } =
    useContext(EventsContext);
  const { editBitacoraNewEvent } = useContext(GlobalContext);
  const { query } = useRouter();
  const { isBitacora, loadBitacora, bitacora } = useBitacora(); //to Global
  console.log("IsBitacora?", isBitacora, " ID", bitacora);
  const [bitacoraID, setBitacoraId] = useState(query.id);
  const { bitacoraSelected, imageObj } = props;
  const [loading, setLoading] = useState(false);
  const [author, setAuthor] = useState("");
  const [bitacoraDate, setBitacoraDate] = useState("");

  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const toggle = () => setModalInsertar(!modalInsertar);
  const toggleEliminar = () => setModalEliminar(!modalEliminar);
  const toggleEditar = () => setModalEditar(!modalEditar);
  console.log("bitaEventsSelected", bitaEvents);

  const convertDate = (date: any) => {
    return dayjs(date).format("DD-MM-YY");
  };
  const convertDate1 = (date: any) => {
    return dayjs(date).format("DD-MM-YY HH:mm");
  };

  useEffect(
    function () {
      if (!isBitacora) {
        loadBitacora(query.id); //load idhistoria to global
      }
      setLoading(true);

      getBitacora(query.id).then((resp) => {
        console.log("RESPBitacora", resp);
        setAuthor(resp.author.name);
        setBitacoraDate(resp.bitacoraDate);
      });
    },
    [setAuthor, setBitacoraDate, query]
  );

  const [bitacoraE, setBitacoraE] = useState({
    event_id: 1,
    description: "Dolor en..",
    event_date: "2021-10-07 11:07",
  });
  const [bitacoraAdd, setBitacoraAdd] = useState({
    bitacora_id: Number(query.id),
    event_id: 1,
    description: "Dolor en ...",
    event_date: "2021-10-07",
  });
  console.log("BitacoraAdd seteando", bitacoraAdd);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [bitacoraSeleccionada, setBitacoraSeleccionada] = useState({
    id: 1,
    event_id: 1,
    description: "Dolor en ..",
    event_date: "2021-10-07 11:07",
  });
  // to viewBitacora
  const [bitacoraSeleccionada1, setBitacoraSeleccionada1] = useState({
    id: "",
    authorId: "",
    bitacoraDate: "",
  });
  const [bitacoraSeleccionada2, setBitacoraSeleccionada2] = useState({
    id: "",
    event_id: "",
    bitacora_id: "",
    description: "",
    event_date: "",
  });

  const seleccionarBitacora = (elemento: any, caso: any) => {
    setBitacoraSeleccionada(elemento);
    console.log("ELEMENTO Eliminar o Editar", elemento);
    console.log("CASO Eliminar o Editar", caso);
    caso === "Editar" ? setModalEditar(true) : setModalEliminar(true);
  };
  // to viewBitaEvent
  const seleccionarBitacora1 = (elemento: any, caso: any) => {
    setBitacoraSeleccionada1(elemento);
    console.log("ELEMENTO", elemento);
    console.log("CASO", caso);
    caso === "Editar" ? setModalEditar(true) : setModalViewHist(true);
  };
  // to editar
  const seleccionarBitacora2 = (elemento: any, caso: any) => {
    console.log("datosToEditar", elemento);
    setBitacoraSeleccionada2(elemento);
    setBitacoraE({
      ...bitacoraE,
      id: elemento.id,
      event_id: elemento.event_id,
      bitacora_id: elemento.bitacora_id,
      description: elemento.description,
      event_date: elemento.event_date,
    });
    console.log("BITACORAE", bitacoraE);
    console.log("Datos a Editar", bitacoraSeleccionada2);
    caso === "Editar" ? setModalEditar(true) : setModalViewHist(true);
  };

  const eliminar = () => {
    console.log("Entra a Borrar", bitacoraSeleccionada.id);
    removeBitaEvent(bitacoraSeleccionada.id);
    setModalEliminar(false);
  };

  const abrirModalInsertar = () => {
    setModalInsertar(true);
  };

  const handleOnChange = (bitacoraKey, value) => {
    console.log("valueOnChangeIngresar", value);
    setBitacoraAdd({ ...bitacoraAdd, [bitacoraKey]: value });
    console.log("bitacoraOnchage", bitacoraAdd);
  };
  const handleOnChangeE = (bitacoraKey, value) => {
    console.log("valueOnChangeEditar", value);
    setBitacoraE({ ...bitacoraE, [bitacoraKey]: value });
    console.log("bitacoraOnchageE", bitacoraE);
  };

  const onSubmit = useCallback(() => {
    console.log("el onSubmit Add", bitacoraAdd);
    const data = {
      event_id: bitacoraAdd.event_id,
      bitacora_id: bitacoraAdd.bitacora_id,
      description: bitacoraAdd.description,
      event_date: new Date(bitacoraAdd.event_date),
    };
    // createBitacorae(bitacora);
    addBitaEvent(data);
    editBitacoraNewEvent(bitacoraID);
    setModalInsertar(false);
  });

  const onSubmitE = useCallback(() => {
    console.log("el onSubmit Edit", bitacoraE);
    // createBitacorae(bitacora);
    const data = {
      id: bitacoraE.id,
      bitacora_id: bitacoraE.bitacora_id,
      event_date: bitacoraE.event_date,
      event_id: bitacoraE.event_id,
      description: bitacoraE.description,
    };
    console.log("Data a guardar", data);
    //getBitaEvents(data);
    editBitaEvent(data);
    setModalEditar(false);
  });

  return (
    <GlobalProvider>
      <EventsProvider>
        <Container>
          <div className="flex rounded items-center justify-between flex-wrap bg-gray-100 p-2">
            <div className="bg-white shadow-lg ">
              <div className="flex justify-between p-1">
                <div>
                  <h3 className="text-2xl tahoma font-extrabold tracking-widest text-gray-500">
                    Administration Events
                  </h3>
                  <h3 className="text-2xl tahoma font-extrabold tracking-widest text-gray-500">
                    Personal Bitacora {query.id}
                  </h3>
                </div>
                <div className="p-2">
                  <ul className="flex">
                    <li className="flex flex-col items-center p-2 border-l-2 border-indigo-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                        />
                      </svg>
                      <span className="text-sm">Author</span>
                      <span className="text-sm">{author}</span>
                    </li>
                    <li className="flex flex-col p-2 border-l-2 border-indigo-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="text-sm">
                        {convertDate(bitacoraDate)}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-full h-0.5 bg-indigo-500"></div>
              <div className="flex justify-center p-4">
                <div className="border-b border-gray-200 shadow">
                  <table className="shadow-lg bg-white table-auto">
                    <tr>
                      <th className="bg-blue-100 border text-left px-8 py-4">
                        Renglon/Id
                      </th>
                      <th className="bg-blue-100 border text-left px-8 py-4">
                        Tipo Evento
                      </th>
                      <th className="bg-blue-100 border text-left px-8 py-4">
                        Description Event
                      </th>
                      <th className="bg-blue-100 border text-left px-8 py-4">
                        Date Event
                      </th>
                      <th className="bg-blue-100 border text-left px-8 py-4">
                        <div>
                          <Button onClick={() => abrirModalInsertar()} />
                        </div>
                      </th>
                    </tr>
                    {bitaEvents.length > 0 ? (
                      <>
                        {bitaEvents.map((event, key) => (
                          <tr>
                            <td className="border px-8 py-4">
                              {key + 1} {event.id}
                            </td>
                            <td className="border px-8 py-4">
                              {event.event_id} {event.bitacora_id}
                            </td>
                            <td className="border px-8 py-4">
                              {event.description}
                            </td>
                            <td className="border px-8 py-4">
                              {convertDate1(event.event_date)}
                            </td>
                            <td className="border px-8 py-4">
                              <div className="inline-block text-gray-700 text-right px-1 py-1 m-0">
                                <button
                                  onClick={() =>
                                    seleccionarBitacora(event, "Eliminar")
                                  }
                                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-0 mr-1 rounded-full inline-flex items-center"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-trash-2"
                                  >
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                    <line x1="10" y1="11" x2="10" y2="17" />
                                    <line x1="14" y1="11" x2="14" y2="17" />
                                  </svg>
                                </button>
                              </div>
                              <div className="inline-block text-gray-700 text-right px-1 py-1 m-0">
                                <button
                                  onClick={() =>
                                    seleccionarBitacora2(event, "Editar")
                                  }
                                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-0 mr-1 rounded-full inline-flex items-center"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-edit"
                                  >
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <p className="text-center bg-gray-100 text-gray-500 py-5">
                        No data eventss
                      </p>
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
          <Modal
            ize="xl"
            style={{ maxWidth: "780px", width: "100%" }}
            isOpen={modalEditar}
            toggle={toggleEditar}
          >
            <ModalHeader toggle={toggleEditar}>
              Edit Event ID: {bitacoraSeleccionada2 && bitacoraSeleccionada2.id}
              {bitacoraSeleccionada2 && bitacoraSeleccionada2.description}
            </ModalHeader>
            <ModalBody>
              <form
                className="w-full max-w-lg  bg-gray-400 shadow-md rounded"
                onSubmit={handleSubmit(onSubmitE)}
              >
                <div className="md:w-11/12 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    htmlFor="id"
                  >
                    Tipo Evento
                  </label>
                  <input
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                    type="number"
                    placeholder="Gonzalez"
                    name="event_id"
                    defaultValue={
                      bitacoraSeleccionada2 && bitacoraSeleccionada2.event_id
                    }
                    {...register("event_id", {
                      required: "Required",
                      minLength: 1,
                      maxLength: 9,
                    })}
                    onChange={(e) =>
                      handleOnChangeE("event_id", e.target.value)
                    }
                  />
                  {errors.id && errors.event_id}
                </div>

                <div className="md:w-11/12 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    htmlFor="authorId"
                  >
                    Descripcion evento
                  </label>

                  <textarea
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                    rows="3"
                    name="description"
                    defaultValue={
                      bitacoraSeleccionada2 && bitacoraSeleccionada2.description
                    }
                    {...register("description", {
                      required: "Required",
                      minLength: 1,
                      maxLength: 300,
                    })}
                    onChange={(e) =>
                      handleOnChangeE("description", e.target.value)
                    }
                  />

                  {errors.description && errors.description}
                </div>

                <div className="md:w-11/12 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    htmlFor="event_date"
                  >
                    Fecha Evento
                  </label>
                  <input
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                    type="text"
                    placeholder="Gonzalez"
                    name="event_date"
                    defaultValue={
                      bitacoraSeleccionada2 && bitacoraSeleccionada2.event_date
                    }
                    {...register("event_date", {
                      required: "Required",
                      minLength: 3,
                      maxLength: 41,
                    })}
                    onChange={(e) =>
                      handleOnChangeE("event_date", e.target.value)
                    }
                  />
                  {errors.event_date && errors.event_date}
                </div>
                <div className="invisible md:invisible md:w-1/2 px-3 mb-6 md:mb-0">
                  Hello
                </div>
                <input
                  type="hidden"
                  name="bitacora_id"
                  defaultValue={
                    bitacoraSeleccionada2 && bitacoraSeleccionada2.bitacora_id
                  }
                  {...register("bitacora_id", {
                    required: "Required",
                    minLength: 3,
                    maxLength: 41,
                  })}
                ></input>
              </form>
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={() => onSubmitE()}>
                Sí
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setModalEditar(false)}
              >
                No
              </button>
            </ModalFooter>
          </Modal>
          <Modal isOpen={modalInsertar} toggle={toggle}>
            <ModalHeader toggle={toggle}>
              Add Evento A Bitacora {query.id}
            </ModalHeader>
            <ModalBody>
              <form
                className="w-full max-w-lg  bg-gray-400 shadow-md rounded"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="md:w-11/12 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    htmlFor="id"
                  >
                    Tipo Evento
                  </label>
                  <input
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                    type="number"
                    placeholder="Gonzalez"
                    name="event_id"
                    defaultValue={bitacoraAdd.event_id}
                    {...register("event_id", {
                      required: "Required",
                      minLength: 1,
                      maxLength: 9,
                    })}
                    onChange={(e) => handleOnChange("event_id", e.target.value)}
                  />
                  {errors.id && errors.event_id}
                </div>

                <div className="md:w-11/12 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    htmlFor="authorId"
                  >
                    Descripcion evento
                  </label>

                  <textarea
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                    rows="3"
                    name="description"
                    defaultValue={bitacoraAdd.description}
                    {...register("description", {
                      required: "Required",
                      minLength: 1,
                      maxLength: 300,
                    })}
                    onChange={(e) =>
                      handleOnChange("description", e.target.value)
                    }
                  />

                  {errors.description && errors.description}
                </div>

                <div className="md:w-11/12 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    htmlFor="event_date"
                  >
                    Fecha Evento
                  </label>
                  <input
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                    type="text"
                    placeholder="Gonzalez"
                    name="event_date"
                    defaultValue={bitacoraAdd.event_date}
                    {...register("event_date", {
                      required: "Required",
                      minLength: 3,
                      maxLength: 41,
                    })}
                    onChange={(e) =>
                      handleOnChange("event_date", e.target.value)
                    }
                  />
                  {errors.event_date && errors.event_date}
                </div>
                <div className="invisible md:invisible md:w-1/2 px-3 mb-6 md:mb-0">
                  <input
                    type="number"
                    name="bitacora_id"
                    defaultValue={query.id}
                    {...register("bitacora_id", {
                      required: "Required",
                      minLength: 1,
                      maxLength: 9,
                    })}
                    onChange={(e) =>
                      handleOnChange("bitacora_id", e.target.value)
                    }
                  />
                  {errors.id && errors.bitacora_id}
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={() => onSubmit()}>
                Sí
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setModalInsertar(false)}
              >
                No
              </button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={modalEliminar} toggle={toggleEliminar}>
            <ModalHeader toggle={toggleEliminar}>Eliminar Bitacora</ModalHeader>
            <ModalBody>
              Estás Seguro que deseas eliminar la Bitacora{" "}
              {bitacoraSeleccionada && bitacoraSeleccionada.id}
            </ModalBody>
            <ModalFooter>
              <button
                className="btn btn-danger"
                onClick={() => eliminar(bitacoraSeleccionada.id)}
              >
                Sí
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setModalEliminar(false)}
              >
                No
              </button>
            </ModalFooter>
          </Modal>
        </Container>
      </EventsProvider>
    </GlobalProvider>
  );
};

BitaEvents.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BitaEvents);
