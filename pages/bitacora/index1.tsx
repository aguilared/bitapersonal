import React, {
  useState,
  useContext,
  forwardRef,
  useEffect,
  BaseSyntheticEvent,
} from "react";
import Link from "next/link";
import IconButton from "@material-ui/core/IconButton";
import StreetviewRoundedIcon from "@material-ui/icons/StreetviewRounded";
import { useForm } from "react-hook-form";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import dayjs from "dayjs";
import SearchH from "../../components/SearchH";
import BitacoraCard from "../../components/Bitacoras/BitacoraCard";
import Container from "../../components/Container";
import { GlobalContext, GlobalProvider } from "../../context/GlobalState";
import { EventsContext, EventsProvider } from "../../context/EventState";
import useBitacora from "../../hooks/useBitacora";

type Inputs = {
  id: number;
  author_id: number;
  bitacora_date: string;
};
const BitacorasList = (): JSX.Element => {
  const {
    bitacoras1,
    GetBitacoras,
    addBitacora,
    editBitacora,
    removeBitacora,
    loading,
  } = useContext(GlobalContext);
  const { clearBitaEvents } = useContext(EventsContext);
  const { isBitacora, loadBitacora, bitacora, clearBitacora } = useBitacora(); //to Global
  console.log("IsBitacora?", isBitacora, " ID", bitacora);
  if (isBitacora) {
    clearBitacora(); //
    clearBitaEvents();
  }

  GetBitacoras();

  const convertDate = (date: any) => {
    const d = dayjs(date).format("DD-MM-YYYY");
    return d;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const [bitacoraAdd, setBitacoraAdd] = useState({
    author_id: 1,
    bitacora_date: "2021-10-07 11:07",
  });
  const [bitacoraE, setBitacoraE] = useState({
    id: 1,
    author_id: 1,
    bitacora_date: "2021-10-07 11:07",
  });

  const [modalSearchs, setModalSearchs] = useState(false);
  const [modalViewHist, setModalViewHist] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const toggleSearchs = () => setModalSearchs(!modalSearchs);
  const toggleViewHist = () => setModalViewHist(!modalViewHist);
  const toggle = () => setModalInsertar(!modalInsertar);
  const toggleEliminar = () => setModalEliminar(!modalEliminar);
  const toggleEditar = () => setModalEditar(!modalEditar);

  const [bitacoraSeleccionada, setBitacoraSeleccionada] = useState({
    id: "",
    author_id: "",
    bitacora_date: "",
  });
  // to viewBitacora
  const [bitacoraSeleccionada1, setBitacoraSeleccionada1] = useState({
    id: "",
    author_id: "",
    bitacora_date: "",
  });
  const [bitacoraSeleccionada2, setBitacoraSeleccionada2] = useState({
    id: "",
    author_id: "",
    bitacora_date: "",
  });

  const seleccionarBitacora = (elemento, caso) => {
    setBitacoraSeleccionada(elemento);
    console.log("ELEMENTO Eliminar o Editar", elemento);
    console.log("CASO Eliminar o Editar", caso);
    caso === "Editar" ? setModalEditar(true) : setModalEliminar(true);
  };
  // to viewHist
  const seleccionarBitacora1 = (elemento, caso) => {
    setBitacoraSeleccionada1(elemento);
    console.log("ELEMENTO", elemento);
    console.log("CASO", caso);
    caso === "Editar" ? setModalEditar(true) : setModalViewHist(true);
  };
  // to editar
  const seleccionarBitacora2 = (elemento, caso) => {
    setBitacoraSeleccionada2(elemento);
    setBitacoraE({
      ...bitacoraE,
      id: elemento.id,
      author_id: elemento.author_id,
      bitacora_date: elemento.bitacora_date,
    });
    console.log("BITACORAE", bitacoraE);
    caso === "Editar" ? setModalEditar(true) : setModalViewHist(true);
  };

  const eliminar = () => {
    console.log("Entra a Borrar");
    removeBitacora(bitacoraSeleccionada.id);
    setModalEliminar(false);
  };

  const abrirModalInsertar = () => {
    setModalInsertar(true);
  };

  const abrirModalSearchs = () => {
    console.log("el search bitacora", bitacora);
    setModalSearchs(true);
  };

  const handleSearchOnChange = (e) => {
    console.log("value", e.target.value);
    setBitacoraAdd(e.target.value);
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
  const resetForm = (formKey, value) => {
    console.log("value", value);
    console.log("Key", formKey);
    document.getElementById("addForm").reset();
    setBitacoraE({
      ...bitacoraE,
      id: 1,
      author_id: 1,
      bitacora_date: "2021-10-07 11:07",
    });
    reset({
      id: 1,
      author_id: 1,
      bitacora_date: "2021-10-07 11:07",
    });
  };

  const onSubmit = () => {
    console.log("el bitacora onSubmit", bitacora);
    // createBitacorae(bitacora);
    addBitacora(bitacora);
    setModalInsertar(false);
  };
  const onSubmitE = (e: BaseSyntheticEvent) => {
    console.log("datos a o en formulario", bitacoraSeleccionada2);
    console.log("onSubmit Edit", bitacoraE);
    // createBitacorae(bitacora);
    const data = {
      id: bitacoraE.id,
      author_id: bitacoraE.author_id,
      bitacora_date: bitacoraE.bitacora_date,
    };
    editBitacora(data);
    // e.target.reset();
    setModalEditar(false);
  };

  const ButtonAddBitacora = forwardRef(({ onClick, href }, ref) => (
    <button
      className="bg-blue-300 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
      // onClick={handleClickAddBitacora}
      onClick={() => abrirModalInsertar()}
      ref={ref}
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
        className="feather feather-plus-circle"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
      Add
    </button>
  ));

  return (
    <GlobalProvider>
      <EventsProvider>
        <Container>
          <div className="flex rounded items-center justify-between flex-wrap bg-gray-500 p-2">
            <div className="flex-grow text-left px-3 py-1 m-2">
              {" "}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <input
                    className="rounded py-2 px-4"
                    type="text"
                    placeholder="Search"
                    name="search"
                    defaultValue=""
                    {...register("search", {
                      required: "Required",
                      minLength: 3,
                      maxLength: 41,
                    })}
                    onChange={handleSearchOnChange}
                  />
                  {errors.search && errors.search.search}
                  <button
                    type="submit"
                    onClick={() => abrirModalSearchs()}
                    className="absolute w-10 h-10 rounded-full inline p-2 shadow"
                  >
                    {" "}
                    <svg
                      className="text-gray-100 w-6 h-6 fill-current"
                      viewBox="0 0 56.966 56.966"
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      id="Capa_1"
                      x="0px"
                      y="0px"
                      width="512px"
                      height="512px"
                    >
                      <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
            <div className="flex-grow text-right px-3 py-1 m-2">
              <ButtonAddBitacora />
            </div>
          </div>

          {!bitacoras1 ? (
            <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
            </div>
          ) : (
            <>
              {bitacoras1.length > 0 ? (
                <>
                  {bitacoras1.map((bitacora) => (
                    <div
                      className="flex rounded items-left bg-gray-100 mb-1 shadow"
                      key={bitacora.id}
                    >
                      <div className="w-4/5 inline-block text-gray-700 text-left px-1 py-0 m-0">
                        <a>
                          <p className="text-gray-900 text-left leading-none">
                            ({bitacora._count.bita_events})&nbsp;
                            <IconButton
                              onClick={() =>
                                seleccionarBitacora1(bitacora, "Eliminar")
                              }
                            >
                              <StreetviewRoundedIcon fontSize="small" />
                            </IconButton>{" "}
                            {bitacora.id} &nbsp;
                            {convertDate(bitacora.bitacora_date)} &nbsp;
                            {bitacora.author.name} &nbsp;
                          </p>
                        </a>
                      </div>

                      <div className="inline-block text-gray-700 text-right px-1 py-1 m-0">
                        <button
                          onClick={() =>
                            seleccionarBitacora(bitacora, "Eliminar")
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
                            seleccionarBitacora2(bitacora, "Editar")
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

                      <div className="w-1/5 inline-block text-gray-700 text-right px-1 py-1 m-0">
                        <Link
                          href={`/bitacora/events/${encodeURIComponent(
                            bitacora.id
                          )}`}
                        >
                          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold mr-1 py-1 px-1 rounded-full inline-flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="24px"
                              viewBox="0 0 24 24"
                              width="24px"
                              fill="#000000"
                            >
                              <path
                                clipRule="evenodd"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
                            </svg>
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <p className="text-center bg-gray-100 text-gray-500 py-5">
                  No data Bitacoras
                </p>
              )}
            </>
          )}

          <Modal isOpen={modalInsertar} toggle={toggle}>
            <ModalHeader toggle={toggle}>Add Bitacora</ModalHeader>
            <ModalBody>
              <form
                className="w-full max-w-lg  bg-gray-400 shadow-md rounded"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    htmlFor="author_id"
                  >
                    Author
                  </label>
                  <input
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                    type="number"
                    placeholder="Gonzalez"
                    name="author_id"
                    defaultValue=""
                    value={bitacoraAdd.author_id}
                    {...register("author_id", {
                      required: "Required",
                      minLength: 1,
                      maxLength: 9,
                    })}
                    onChange={(e) =>
                      handleOnChange("author_id", e.target.value)
                    }
                  />
                  {errors.author_id && errors.author_id.author_id}
                </div>
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    htmlFor="bitacora_date"
                  >
                    Fecha Bitacora
                  </label>
                  <input
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                    type="text"
                    placeholder="Gonzalez"
                    name="bitacora_date"
                    defaultValue=""
                    value={bitacoraAdd.bitacora_date}
                    {...register("bitacora_date", {
                      required: "Required",
                      minLength: 3,
                      maxLength: 41,
                    })}
                    onChange={(e) =>
                      handleOnChange("bitacora_date", e.target.value)
                    }
                  />
                  {errors.bitacora_date && errors.bitacora_date.bitacora_date}
                </div>
                <div className="invisible md:invisible md:w-1/2 px-3 mb-6 md:mb-0">
                  Hello
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

          <Modal isOpen={modalSearchs} toggle={toggle}>
            <ModalHeader toggle={toggleSearchs}>
              Searchs = {bitacora}{" "}
            </ModalHeader>
            <ModalBody>
              <SearchH search={bitacora} />
            </ModalBody>
          </Modal>

          <Modal
            size="xl"
            style={{ maxWidth: "980px", width: "100%" }}
            isOpen={modalViewHist}
            toggle={toggleViewHist}
          >
            <ModalHeader toggle={toggleViewHist} />
            <ModalBody>
              <BitacoraCard bitacoraSelected={bitacoraSeleccionada1} />;
            </ModalBody>
            <ModalFooter>
              <button
                className="btn btn-secondary"
                onClick={() => setModalViewHist(false)}
              >
                Cerrar
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

          <Modal isOpen={modalEditar} toggle={toggleEditar}>
            <ModalHeader toggle={toggleEditar}>
              Edit Bitacora ID:{" "}
              {bitacoraSeleccionada2 && bitacoraSeleccionada2.id}
            </ModalHeader>
            <ModalBody>
              <form
                name="add"
                className="w-full max-w-lg  bg-gray-400 shadow-md rounded"
                onSubmit={handleSubmit(onSubmitE)}
              >
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    htmlFor="author_id"
                  >
                    Author
                  </label>
                  <input
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                    type="number"
                    placeholder="Gonzalez"
                    name="author_id"
                    defaultValue={
                      bitacoraSeleccionada2 && bitacoraSeleccionada2.author_id
                    }
                    {...register("author_id", {
                      required: "Required",
                      minLength: 1,
                      maxLength: 9,
                    })}
                    onChange={(e) =>
                      handleOnChangeE("author_id", e.target.value)
                    }
                  />
                  {errors.author_id && errors.author_id.author_id}
                </div>

                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    htmlFor="bitacora_date"
                  >
                    Fecha Bitacora
                  </label>
                  <input
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                    type="text"
                    placeholder="Gonzalez"
                    name="bitacora_date"
                    defaultValue={
                      bitacoraSeleccionada2 &&
                      bitacoraSeleccionada2.bitacora_date
                    }
                    {...register("bitacora_date", {
                      required: "Required",
                      minLength: 3,
                      maxLength: 41,
                    })}
                    onChange={(e) =>
                      handleOnChangeE("bitacora_date", e.target.value)
                    }
                  />
                  {errors.bitacora_date && errors.bitacora_date.bitacora_date}
                </div>
                <input
                  type="button"
                  onClick={(e) => resetForm("resetForm", e.target)}
                  value="Custom Reset Field Values & Errors"
                />
                <input
                  style={{ display: "block", marginTop: 20 }}
                  type="reset"
                  value="Standard Reset Field Values"
                />
                <input
                  style={{ display: "block", marginTop: 20 }}
                  type="button"
                  onClick={() =>
                    reset({
                      id: 0,
                      bitacora_date: "",
                      author_id: 0,
                    })
                  }
                  value="Reset with values"
                />
                <div className="invisible md:invisible md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    htmlFor="id"
                  >
                    ID
                  </label>
                  <input
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                    type="number"
                    placeholder="Gonzalez"
                    name="id"
                    defaultValue={
                      bitacoraSeleccionada2 && bitacoraSeleccionada2.id
                    }
                    {...register("id", {
                      required: "Required",
                      minLength: 1,
                      maxLength: 9,
                    })}
                    onChange={(e) => handleOnChangeE("id", e.target.value)}
                  />
                  {errors.id && errors.id.id}
                </div>
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
        </Container>
      </EventsProvider>
    </GlobalProvider>
  );
};
export default BitacorasList;
