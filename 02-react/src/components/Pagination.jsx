function createPages(totalPages) {
    const pages = []

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
    }
    return pages;
}

function Pagination({ totalPages ,currentPage, handlePageChange }) {
    const pages = createPages(totalPages);

    const handleClick = (page) => {
        handlePageChange(page);
    }

    return (
        <div className="pagination">
            {
                pages.map((page) =>
                (
                    <button
                        key={page}
                        className={`button-page ${currentPage === page ? 'is-active' : ''}`}
                        disabled={currentPage === page}
                        onClick={() => handleClick(page)}
                    >
                        {page}
                    </button >
                ))
            }
        </div>
    )
}

export default Pagination;