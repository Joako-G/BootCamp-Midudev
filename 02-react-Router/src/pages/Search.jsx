import { Jobs } from '../components/Jobs'
import Form from '../components/Form'
import Pagination from '../components/Pagination'
import { useJobFilter } from '../hooks/useJobFilter.jsx'

export default function SearchPage() {
  const JOBS_PER_PAGE = 4;
  // const params = new URLSearchParams(window.location.search)
  // console.log("Parametros: ", params.toString())
  const {
    jobs,
    loading,
    totalPages,
    onSearch,
    inputText,
    onSearchWithText,
    currentPage,
    handlePageChange,
    filtered
  } = useJobFilter({ JOBS_PER_PAGE })

  return (
    <>
      <main>
        <Form initialText={inputText} onSearch={onSearch} onSearchWithText={onSearchWithText} filtered={filtered} />
        <section>
          {
            loading ? <p>Buscando trabajos...</p> : <Jobs jobs={jobs} />
          }
        </section>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </main>
    </>
  )
}

