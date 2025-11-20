import { useId } from "react";

function Form({ onSearch, onSearchWithText }) {
    const idText = useId()
    const idTechnology = useId()
    const idUbication = useId()
    const idExperience = useId()

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target)

        const filters = {
            technology: formData.get(idTechnology),
            ubication: formData.get(idUbication),
            experience: formData.get(idExperience)

        }

        onSearch(filters)
        console.log("Formulario enviado");
    }

    const handleChange = (event) => {
        event.preventDefault()
        onSearchWithText(event.target.value)
    }

    return (
        <>
            <section className="jobs-search">
                <h1 className="search-title">Encuentra tu próximo trabajo</h1>
                <p className="search-text">Explora miles de oportunidades en el sector tecnológico</p>
                <form id="employee-search-form" role="search" onSubmit={handleSubmit}>
                    <div className="form-search-job">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-search">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                            <path d="M21 21l-6 -6" />
                        </svg>

                        <input id="employyes-search-input" type="text"
                            placeholder="Buscar empleos por titulo, habilidad o empresas"
                            onChange={handleChange}
                        />

                        <button> Buscar </button>

                    </div>
                    <div className="search-filters">
                        <select name={idTechnology} id="filter-technology">
                            <option value="">Tecnologia</option>
                            <option value="javascript">JavaScript</option>
                            <option value="typescript">TypeScript</option>
                            <option value="python">Python</option>
                            <option value="java">Java</option>
                            <option value="react">React</option>
                            <option value="node.js">Node.js</option>
                            <option value="mobile">Mobile</option>
                            <option value="node">Node</option>
                        </select>

                        <select name={idUbication} id="filter-ubication">
                            <option value="">Ubicación</option>
                            <option value="remoto">Remoto</option>
                            <option value="cdmx">Ciudad de Mexico</option>
                            <option value="barcelona">Barcelona</option>
                            <option value="bsas">Buenos Aires</option>
                            <option value="madrid">Madrid</option>
                            <option value="monterrey">Monterrey</option>
                            <option value="santiago">Santiago de Chile</option>
                            <option value="lima">Lima</option>
                            <option value="bogota">Bogota</option>
                            <option value="valencia">Valencia</option>
                            <option value="guadalajara">Guadalajara</option>
                        </select>

                        <select name={idExperience} id="filter-experience">
                            <option value="">Nivel de experiencia</option>
                            <option value="junior">Junior</option>
                            <option value="mid">Mid</option>
                            <option value="senior">Senior</option>
                        </select>

                    </div>
                </form>
            </section>
        </>
    )
}

export default Form