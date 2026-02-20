import { useState, useEffect } from "react";
import { useRouter } from "./useRouter";
import { useSearchParams } from "react-router";

/**
 * Custom hook encargado de manejar la inicialización y actualización de los filtros.
 * Además, realiza la petición a la API para obtener los trabajos filtrados y paginados.
 * Recibe por parametro la cantidad de trabajos por página.
 * Devulve los trabajos obtenidos, el estado de carga, el total de páginas,
 * las funciones para actualizar los filtros y la función para manejar el cambio de página.
 * @param {JOBS_PER_PAGE} JOBS_PER_PAGE
 * @returns { _, jobs, loading, totalPages, onSearch, onSearchWithText, currentPage, handlePageChange} 
 */
export function useJobFilter({ JOBS_PER_PAGE }) {
  const [searchParams, setSearchParams] = useSearchParams()

  const [filtered, setFiltered] = useState(() => {
    console.log("ENTRA")
    return {
      technology: searchParams.get("technology") || "",
      ubication: searchParams.get("type") || "",
      experience: searchParams.get("level") || ""
    }
  })

  const [inputText, setInputText] = useState(() => searchParams.get("text") ?? "")

  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [jobs, setJobs] = useState([])

  const [currentPage, setCurrentPage] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    const page = Number(params.get("page"))

    return page > 0 ? page : 1
  });

  const { navigateTo } = useRouter();
  /** LLAMADA A LA API */
  useEffect(() => {
    async function getJobs() {
      try {
        setLoading(true);

        const params = new URLSearchParams()
        if (inputText) params.append("text", inputText)
        if (filtered.technology) params.append("technology", filtered.technology)
        if (filtered.ubication) params.append("type", filtered.ubication)
        if (filtered.experience) params.append("level", filtered.experience)


        const offset = (currentPage - 1) * JOBS_PER_PAGE
        params.append("limit", JOBS_PER_PAGE)
        params.append("offset", offset)

        const queryParams = params.toString()
        const response = await fetch(`https://jscamp-api.vercel.app/api/jobs?${queryParams}`)
        const json = await response.json()

        setJobs(json.data);
        setTotal(json.total);

      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    }

    getJobs();
  }, [filtered, inputText, currentPage]);

  /** ACTUALIZACIÓN DE LA URL */
  useEffect(() => {

    setSearchParams((params) => {

      if (inputText) {
        params.set("text", inputText)
      } else {
        params.delete("text")
      }

      if (filtered.technology) {
        params.set("technology", filtered.technology)
      } else {
        params.delete("technology")
      }

      if (filtered.ubication) {
        params.set("type", filtered.ubication)
      } else {
        params.delete("type")
      }

      if (filtered.experience) {
        params.set("level", filtered.experience)
      } else {
        params.delete("level")
      }

      if (currentPage > 1) {
        params.set("page", currentPage);
      }

      return params
    })



  }, [filtered, inputText, currentPage]);

  const totalPages = Math.ceil(total / JOBS_PER_PAGE);

  const onSearchWithText = (text) => {
    setInputText(text)
    setCurrentPage(1)
  }

  const onSearch = (filters) => {
    setFiltered(filters)
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  return {
    jobs,
    loading,
    totalPages,
    inputText,
    onSearch,
    onSearchWithText,
    currentPage,
    handlePageChange,
    filtered
  }

}