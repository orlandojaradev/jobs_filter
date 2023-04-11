import React from "react";
import Categoria from "./Categoria";
const imagenes = require.context("../images", true);

export default function Empleo({
  key,
  imagen,
  nuevo,
  preparado,
  company,
  position,
  rol,
  nivel,
  posted,
  contract,
  location,
  tools,
  languages,
  filtro,
}) {
  const newArr = [...tools, ...languages, rol, nivel];
  return (
    <article className="empleo-contenedor">
      <div className="info-contenedor">
        <img src={imagenes(`./${imagen}.svg`)} alt={company} />
        <div className="descripcion">
          <div className="primera-fila">
            <span className="compania">{company}</span>
            {nuevo ? <span className="nuevo">NEW!</span> : null}
            {preparado ? <span className="presentado">FEATURED</span> : null}
          </div>
          <div className="segunda-fila">
            <span className="posicion">{position}</span>
          </div>
          <div className="tercera-fila">
            <span className="tiempo tercera-fila-item">{posted}</span>
            <div className="point"></div>
            <span className="contrato tercera-fila-item">{contract}</span>
            <div className="point"></div>
            <span className="ubicacion tercera-fila-item">{location}</span>
          </div>
        </div>
      </div>
      <div className="tech-contenedor">
        {newArr.map((el, i) => {
          return (
            <a href="#top" onClick={filtro}>
              <Categoria texto={el} />
            </a>
          );
        })}
      </div>
      <div></div>
    </article>
  );
}
