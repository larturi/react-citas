import React, { useState, useEffect } from 'react';
import { Cita } from './components/Cita';

import { Formulario } from "./components/Formulario";

function App() {

  // Local Storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));

  if (!citasIniciales) {
    citasIniciales = [];
  }

  // Arreglo de Citas
  const [citas, guardarCitas] = useState(citasIniciales);

  useEffect(() => {
    if (citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setitem('citas', JSON.stringify([]));
    }
  }, [citas, citasIniciales]);

  // Agregar Citas
  const crearCita = (cita) => {
    guardarCitas([...citas, cita]);
  };

  // Eliminar Cita
  const eliminarCita = (id) => {
    const nuevasCitas = citas.filter( cita => cita.id !== id );
    guardarCitas(nuevasCitas);
  };

  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus Citas';
  const subtitulo = citas.length === 0 ? '' : 'Listado de Citas';

  return (
    <>
      <h1>Administrador de Pacientes</h1>

      <div className="container">

        <div className="row">
          <div className="one-half column">
            <Formulario 
              crearCita={crearCita}
            />
          </div>

          <div className="one-half column">
            <h2>{ titulo }</h2>
            <label>{ subtitulo }</label>
            {
              citas.map(cita => (
                <Cita 
                  key={cita.id}
                  cita={cita}
                  eliminarCita={eliminarCita}
                />
              ))
            }
          </div>
        </div>

      </div>
    </>
  );
}

export default App;
