import { useState, useEffect } from "react";
import Button from "../../components/Button";
import { useRouter } from "next/router";
import CoviesLoad from "../../components/Load/CoviesLoad";
import Container from "../../components/Container";

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
};

export default function CovidLoad() {

  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN);
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus(COMPOSE_STATES.LOADING);
    CoviesLoad()
      .then((resp) => {
        if (resp == 'ok')
        console.log('Cargo datos', )
        router.push("/");
      })
      .catch((err) => {
        console.error(err);
        setStatus(COMPOSE_STATES.ERROR);
      });
  };

  return (
    <Container>
      <div className="App">
        <div className="container mx-auto">
          <h3 className="text-center mt-20 text-base leading-8 text-black font-bold tracking-wide uppercase">
            Venezuela Segura. Covid-19 Top mundial - Load Covid-19
          </h3>
          <div className="md:flex">
              <form onSubmit={handleSubmit}>
                <div>
                  <Button >Load Covids</Button>
                </div>
              </form>
          </div>
        </div>
      </div>
    </Container>
  );
}
