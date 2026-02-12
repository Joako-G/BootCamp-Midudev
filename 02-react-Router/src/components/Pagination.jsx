
function Pagination({ totalPages, currentPage, handlePageChange }) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

    const handleClick = (event) => {
        event.preventDefault();
        const page = Number(event.currentTarget.dataset.page);

        if (page !== currentPage) {
            handlePageChange(page);
        }
    }

    const buildPageUrl = (page) => {
        const url = new URL(window.location);
        url.searchParams.set('page', page);
        return `${url.pathname}?${url.searchParams.toString()}`;
    }

    return (
        <div className="pagination">
            {
                pages.map((page) =>
                (
                    <a
                        key={page}
                        data-page={page}
                        href={buildPageUrl(page)}
                        className={`button-page ${currentPage === page ? 'is-active' : ''}`}
                        disabled={currentPage === page}
                        onClick={handleClick}
                    >
                        {page}
                    </a >
                ))
            }
        </div>
    )
}

export default Pagination;