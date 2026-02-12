import { useState, useEffect } from "react";
import { useRouter } from "./useRouter";

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
  const [filtered, setFiltered] = useState(() => {
    const params = new URLSearchParams(window.location.search)

    return {
      technology: params.get("technology") || "",
      ubication: params.get("type") || "",
      experience: params.get("level") || ""
    }
  })
  const [inputText, setInputText] = useState(() => {
    const params = new URLSearchParams(window.location.search)

    return params.get("text") || ""
  })

  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [jobs, setJobs] = useState([])

  const [currentPage, setCurrentPage] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    const page = Number(params.get("page"))

    return page > 0 ? page : 1
  });

  const { navigateTo } = useRouter();

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

  useEffect(() => {
    const params = new URLSearchParams();

    if (inputText) params.append("text", inputText);
    if (filtered.technology) params.append("technology", filtered.technology);
    if (filtered.ubication) params.append("type", filtered.ubication);
    if (filtered.experience) params.append("level", filtered.experience);

    if (currentPage > 1) {
      params.append("page", currentPage);
    }

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;

    navigateTo(newUrl);

  }, [filtered, inputText, currentPage, navigateTo]);

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
    handlePageChange
  }

}