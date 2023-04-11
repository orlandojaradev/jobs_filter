import Categoria from "./Categoria";
import remover from "../images/icon-remove.svg";

export default function Filtros({
  recibirFiltros,
  eliminarFiltros,
  removerFiltro,
}) {
  return (
    <div className="contenedor-categorias">
      <div className="filtro-cerrar">
        {recibirFiltros.map((el, i) => {
          return (
            <div className="filtro">
              <Categoria texto={el.company} />
              <img
                src={remover}
                alt="boton-remover"
                className={el.company}
                onClick={removerFiltro}
              />
            </div>
          );
        })}
      </div>
      <a href="#top" onClick={eliminarFiltros}>
        Clear
      </a>
    </div>
  );
}
