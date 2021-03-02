import React, { useState } from 'react';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';

export const Formulario = ({ crearCita }) => {

    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    const [error, setError] = useState(false);

    const handleState = (e) => {
        actualizarCita({
            ...cita,
            [e.target.name] : e.target.value
        })
    }

    const { mascota, propietario, fecha, hora, sintomas } = cita;

    const submitCita = (e) => {
        e.preventDefault();

        if (
            mascota.trim() === '' || 
            propietario.trim() === '' || 
            fecha.trim() === '' || 
            hora.trim() === '' || 
            sintomas.trim() === ''
            ) 
        {
                setError(true);
                return;
        }

        setError(false);

        // Crear Cita
        cita.id = uuid();
        crearCita(cita);

        // Limpiar form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        });

    }

    return (
       <>
        <h2>Crear Cita</h2>

        { error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}

        <form
            onSubmit={ submitCita }
        >
            <label>Nombre Mascota</label>
            <input 
                type="text"
                name="mascota"
                className="u-full-width"
                placeholder="Nombre Mascota"
                onChange={ handleState }
                value={ mascota }
            />

            <label>Nombre Dueño</label>
            <input 
                type="text"
                name="propietario"
                className="u-full-width"
                placeholder="Nombre Dueño"
                onChange={ handleState }
                value={ propietario }
            />

            <label>Fecha</label>
            <input 
                type="date"
                name="fecha"
                className="u-full-width"
                onChange={ handleState }
                value={ fecha }
            />

            <label>Hora</label>
            <input 
                type="time"
                name="hora"
                className="u-full-width"
                onChange={ handleState }
                value={ hora }
            />

            <label>Síntomas</label>
            <textarea 
                name="sintomas" 
                cols="30" 
                rows="10"
                className="u-full-width"
                onChange={ handleState }
                value={ sintomas }
            >
            </textarea>

            <button
                type="submit"
                className="u-full-width button-primary"
            >
                Agregar Cita
            </button>

        </form>
       </>
    )
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}
