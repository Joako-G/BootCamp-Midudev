import { useRef } from "react";
import { useState } from "react";

/**
 * Custom hook para actualizar y manejar el estado de los filtros del formulario de búsqueda.
 * @param {idText, idTechnology, idUbication, idExperience, onSearch, onSearchWithText} 
 * @returns  Devulve los fitlros actualizados y las funciones para manejar el envío y cambio del formulario.
 */
export function useSearchForm({ idText, idTechnology, idUbication, idExperience, onSearch, onSearchWithText }) {
    const [searchText, setSearchText] = useState('')
    const timeoutId = useRef(null)

    const handleSubmit = (event) => {
        event.preventDefault();

        // el event.target corresponde al input === elemento que recibe el evento
        // el event.currenteTarget corresponde al formulario === elemento que escucha el evento

        const formData = new FormData(event.currentTarget)

        if (event.target.name === idText) {
            return
        }

        const filters = {
            technology: formData.get(idTechnology),
            ubication: formData.get(idUbication),
            experience: formData.get(idExperience)

        }

        onSearch(filters)
        console.log("Formulario enviado");
    }

    const handleChange = (event) => {
        const text = event.target.value
        event.preventDefault()
        setSearchText(text)
        // timeoutId.current <--- para leer el valor actual del ref
        if (timeoutId.current) {
            clearTimeout(timeoutId.current)
        }

        timeoutId.current = setTimeout(() => {
            onSearchWithText(text)
        }, 500)
    }

    return {
        searchText,
        handleSubmit,
        handleChange
    }
}