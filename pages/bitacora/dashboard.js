import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container1 from "../components/Container1";
import Sidebar from "../components/Sidebar";
import useUser from "../hooks/useUser";
import getHistorie from "../services/getHistorie";
import useHistoria from "../hooks/useHistoria";
import dayjs from "dayjs";

export default function Dashboard(route) {
  console.log("Route in Dashboard ", route);
  console.log("Route in Dashboard match ", route.match);
  console.log("Route in Dashboart params", route.match.parms);
  const cedula = route.match.params.id;
  const { isHistoria, loadHistoria } = useHistoria(); //to Global
  console.log("IsHistoria?", isHistoria);

  const { isLogged } = useUser();
  const convertDate = (date) => {
    var d = dayjs(date).format("DD-MM-YYYY");
    return d;
  };
  const [loading, setLoading] = useState(false);
  const [totConsultas, setTotConsultas] = useState("");
  const [historie, setHistorie] = useState({
    id: null,
    cedula: "",
    fecha_de_nacimiento: "",
    name: "",
    apellido: "",
    apellido1: "",
    pais: "",
    estado_civil: "",
    nivel_instruccional: "",
    ocupacion: "",
    direccion_de_habitacion: "",
    telefono_casa: "",
    movil: "",
    movil1: "",
    tipiaje_sanguineo: "",
    menarca: "",
    primer_coito: "",
    partos: "",
    cesareas: "",
    abortos: "",
    alergias: "",
    esterilizacion_quirurgica: "",
    fecha_esterilizacion: "",
    biopsias: "",
    habitos_psicosociales: "",
    examenes_realizados: "",
    quirurgicos_ginecologicos: "",
    antecedentes_medicos: "",
    menopausica: "",
    ha_padecido_vph: "",
    infertilidad: "",
    parejas_sexuales: "",
    ant_familiares: "",
    fecha_de_nacimiento_conyugue: "",
    ocupacion_del_conyugue: "",
    tiempo_de_convivencia: "",
    antecedentes_del_conyugue: "",
    createdAt: "",
  }); //un paciente

  useEffect(
    function () {
      setLoading(true);
      if (!isHistoria) {
        loadHistoria(cedula); //load idhistoria to global
      }
      getHistorie(cedula).then((historiee) => {
        //debugger;
        //console.log("historieResp", historiee);
        const { count, historie } = historiee;
        setLoading(false);
        setHistorie(historie);
        setTotConsultas(count);
      });
    },
    [isHistoria, cedula, loadHistoria, setHistorie, setTotConsultas],
  );

  console.log("Logueado?", isLogged);
  console.log("Historie?", historie);
  console.log("TotConsultas?", totConsultas);
  return (
    <>
      {" "}
      <Container1>
        <Sidebar />
        <div className="relative rounded md:ml-64 bg-gray-300">
          <form>
            <div className="pl-4 md:pl-0 font-extrabold">
              <svg
                className="fill-current h-6 inline-block text-gray-900 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16 2h4v15a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V0h16v2zm0 2v13a1 1 0 0 0 1 1 1 1 0 0 0 1-1V4h-2zM2 2v15a1 1 0 0 0 1 1h11.17a2.98 2.98 0 0 1-.17-1V2H2zm2 8h8v2H4v-2zm0 4h8v2H4v-2zM4 4h8v4H4V4z" />
              </svg>{" "}
              Historia Clinica del Paciente: {cedula}, Total de Consultas:{"  "}
              {totConsultas}
              <div className="w-1/5 inline-block text-gray-700 text-right px-1 py-1 m-1">
                <Link
                  to={`/histoclinixr/historie/update/${encodeURIComponent(
                    cedula,
                  )}`}
                >
                  <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold mr-1 py-1 px-1 rounded-full inline-flex items-center">
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
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                </Link>
              </div>{" "}
            </div>

            {loading ? (
              <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
              </div>
            ) : (
              <>
                <div className="bg-gray-200 shadow-md rounded px-8 pt-1 pb-8 mb-4 flex flex-col my-2">
                  <div className="-mx-3 md:flex mb-2 mt-3">
                    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                        for="apellido"
                      >
                        Apellido 1
                      </label>
                      <input
                        className="appearance-none block w-full bg-white rounded py-0 px-0"
                        type="text"
                        placeholder="Gonzalez"
                        name="apellido"
                        defaultValue={historie.apellido}
                        disabled="true"
                      />
                    </div>

                    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                        for="apellido2"
                      >
                        Apellido 2
                      </label>
                      <input
                        className="appearance-none block w-full bg-white  rounded py-0 px-0"
                        type="text"
                        placeholder="Gonzalez"
                        name="apellido2"
                        defaultValue={historie.apellido1}
                        disabled="true"
                      />
                    </div>
                    <div className="md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                        for="nombre"
                      >
                        Nombre
                      </label>
                      <input
                        className="appearance-none block w-full bg-white rounded py-0 px-0"
                        type="text"
                        placeholder="Gonzalez"
                        name="nombre"
                        defaultValue={historie.name}
                        disabled="true"
                      />
                    </div>
                  </div>

                  <div className="-mx-3 md:flex mb-2">
                    <div className="md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                        for="sexo"
                      >
                        Sexo
                      </label>
                      <input
                        className="appearance-none block w-full bg-white rounded py-0 px-0"
                        type="text"
                        placeholder="dd-mm-yyyy"
                        name="sexo"
                        defaultValue={historie.sexo}
                        disabled="true"
                      />
                    </div>
                    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                        for="fechanacimiento"
                      >
                        Fecha Nacimiento
                      </label>
                      <input
                        className="appearance-none block w-full bg-white rounded py-0 px-0"
                        type="text"
                        placeholder="dd-mm-yyyy"
                        name="fechanacimiento"
                        value={convertDate(historie.fecha_de_nacimiento)}
                        disabled="true"
                      />
                    </div>

                    <div className="md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                        for="edad"
                      >
                        Edad
                      </label>
                      <input
                        className="appearance-none block w-full bg-white rounded py-0 px-0"
                        type="text"
                        placeholder="99"
                        name="edad"
                        defaultValue={historie.edad}
                        disabled="true"
                      />
                    </div>
                    <div className="md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                        for="gruposanguineo"
                      >
                        Grupo Sanguineo
                      </label>
                      <input
                        className="appearance-none block w-full bg-white rounded py-0 px-0"
                        type="text"
                        name="gruposanguineo"
                        defaultValue={historie.gruposanguineo}
                        disabled="true"
                      />
                    </div>
                  </div>

                  <div className="-mx-3 md:flex mb-2">
                    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                        for="cedula"
                      >
                        Cedula
                      </label>
                      <input
                        className="appearance-none block w-full bg-white rounded py-0 px-0"
                        type="text"
                        placeholder="99999999"
                        name="cedula"
                        defaultValue={historie.cedula}
                        disabled="true"
                      />
                    </div>
                    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                        for="telefono"
                      >
                        Telefono Casa
                      </label>
                      <input
                        className="appearance-none block w-full bg-white rounded py-0 px-0"
                        type="text"
                        placeholder="028 -9999999"
                        name="telefono"
                        defaultValue={historie.telefono_casa}
                        disabled="true"
                      />
                    </div>
                    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                        for="movil"
                      >
                        Movil
                      </label>
                      <input
                        className="appearance-none block w-full bg-white rounded py-0 px-0"
                        type="text"
                        placeholder="0499-9999999"
                        name="movil"
                        defaultValue={historie.movil}
                        disabled="true"
                      />
                    </div>
                    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                        for="movil1"
                      >
                        Movil 1
                      </label>
                      <input
                        className="appearance-none block w-full bg-white rounded py-0 px-0"
                        type="text"
                        placeholder="0499-9999999"
                        name="movil1"
                        defaultValue={historie.movil1}
                        disabled="true"
                      />
                    </div>
                  </div>

                  <div className="-mx-3 md:flex mb-2">
                    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                        for="direccion"
                      >
                        Direccion
                      </label>
                      <input
                        className="appearance-none block w-full bg-white"
                        type="text"
                        placeholder="Calle"
                        name="direccion"
                        defaultValue={historie.direccion_de_habitacion}
                        disabled="true"
                      />
                    </div>
                    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                        for="ciudad"
                      >
                        Ciudad
                      </label>
                      <input
                        className="appearance-none block w-full bg-white rounded py-0 px-0"
                        type="text"
                        placeholder="Guayana"
                        name="ciudad"
                        defaultValue={historie.ciudad}
                        disabled="true"
                      />
                    </div>
                  </div>

                  <div className="-mx-3 md:flex mb-2">
                    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                        for="estado"
                      >
                        Estado
                      </label>
                      <input
                        className="appearance-none block w-full bg-white rounded py-0 px-0"
                        type="text"
                        placeholder="0499-9999999"
                        name="estado"
                        defaultValue={historie.estado}
                        disabled="true"
                      />
                    </div>
                    <div className="md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                        for="email"
                      >
                        Email
                      </label>
                      <input
                        className="appearance-none block w-full bg-white rounded py-0 px-0"
                        type="text"
                        placeholder="email@gmail.com"
                        name="email"
                        defaultValue={historie.email}
                        disabled="true"
                      />
                    </div>
                  </div>

                  <div className="-mx-3 md:flex mb-2">
                    <div className="md:w-full px-3">
                      <label
                        className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                        for="observaciones"
                      >
                        Observaciones
                      </label>
                      <input
                        className="appearance-none block w-full bg-white rounded py-0 px-0 mb-3"
                        type="text"
                        placeholder="Guayana"
                        name="observaciones"
                        defaultValue={historie.observaciones}
                        disabled="true"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </form>
        </div>
      </Container1>
    </>
  );
}
