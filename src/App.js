import { useEffect, useState } from "react";
import Empleo from "./componentes/Empleo";
import Filtros from "./componentes/Filtros";

function App() {
  const [empleo, setEmpleo] = useState([]);
  const [agregarFiltro, setAgregarFiltro] = useState([]);

  useEffect(() => {
    fetch(
      "https://my-json-server.typicode.com/orlandojaradev/API-Jobs-Filter/jobs"
    )
      .then((res) => res.json())
      .then((data) => {
        setEmpleo(data);
      });
  }, []);

  //Filtrar
  const filtros = (e) => {
    const arr = empleo.filter((el) => {
      const arr = [...el.tools, ...el.languages, el.role, el.level];
      return arr.includes(e.target.innerText);
    });
    setEmpleo(arr);
    setAgregarFiltro(arr);
  };

  //Se eliminan los filtros realizando de nuevo la peticion Ajax
  const eliminarFiltros = () => {
    fetch(
      "https://my-json-server.typicode.com/orlandojaradev/API-Jobs-Filter/jobs"
    )
      .then((res) => res.json())
      .then((data) => {
        setEmpleo(data);
      });
    setAgregarFiltro([]);
  };

  //Se filtra de nuevo pero excluyendo el elemento al que se dio click
  const removerFiltro = (e) => {
    //Se verifica que si solo queda un elemento en los filtros, se realice de nuevo la peticion Ajax
    //con la funcion eliminarFiltros().
    if (agregarFiltro.length === 1) {
      const arr = empleo.filter((el) => {
        return el.company !== e.target.className;
      });
      setEmpleo(arr);
      setAgregarFiltro(arr);
      eliminarFiltros();
    } else {
      const arr = empleo.filter((el) => {
        return el.company !== e.target.className;
      });
      setEmpleo(arr);
      setAgregarFiltro(arr);
    }
  };

  return (
    <div className="App">
      <header className="header"></header>
      <main>
        {agregarFiltro.length > 0 ? (
          <Filtros
            recibirFiltros={agregarFiltro}
            eliminarFiltros={eliminarFiltros}
            removerFiltro={removerFiltro}
          />
        ) : null}
        <div>
          {empleo.map((el) => {
            return (
              <Empleo
                key={el.id}
                imagen={el.logo}
                nuevo={el.new}
                preparado={el.featured}
                company={el.company}
                position={el.position}
                rol={el.role}
                nivel={el.level}
                posted={el.postedAt}
                contract={el.contract}
                location={el.location}
                tools={el.tools}
                languages={el.languages}
                filtro={filtros}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
