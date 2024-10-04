import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { deleteAccompaniedServiceById, listAccompaniedService } from "../../Services/AccompaniedServiceService";


const AccompaniedServiceComponent = () => {

    const [AccompaniedService, setAccompaniedService] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize] = useState(10);

    function getAllAccompaniedService(page = 0, size = 10) {
        listAccompaniedService(page, size).then((response) => {
            if (response.data.content && Array.isArray(response.data.content)) {
                setAccompaniedService(response.data.content);
                setCurrentPage(response.data.number);
                setTotalPages(response.data.totalPages);
            } else {
                console.error("Expected an array but received:", response.data);
            }
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        getAllAccompaniedService(currentPage, pageSize);
    }, [currentPage, pageSize]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const navigator = useNavigate();

    function updateAccompaniedService(id) {
        navigator(`/updateAccompaniedService/${id}`)
    }

    function removeAccompaniedService(id, name) {
        if (window.confirm(`Are you sure you want to delete this AccompaniedService? ${name}`)) {
            deleteAccompaniedServiceById(id).then(() => {
                getAllAccompaniedService();
                window.alert(`AccompaniedService deleted successfully! ${name}`);
            }).catch(error => {
                console.log(error);
                window.alert(`Failed to delete AccompaniedService. ${name}`);
            })
        }
    }


    return (
        <div className="container">
            <h2 className="text-center">List of AccompaniedService</h2>
            <table className="table table-striped table-bordered table-hover">
                <thead className="table-header-bold">
                    <tr>
                        <td>Service Name</td>
                        <td>Unit</td>
                        <td>Unit Price</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(AccompaniedService) && AccompaniedService.length > 0 ? (
                        AccompaniedService.map(Accompanied => (
                            <tr key={Accompanied.idService}>
                                <td>{Accompanied.serviceName}</td>
                                <td>{Accompanied.unit}</td>
                                <td>{Accompanied.unitPrice}</td>
                                <td>
                                    <div className="button-group">
                                        <button className="btn btn-info" onClick={() => updateAccompaniedService(Accompanied.idService)}>Update</button>
                                        <button className="btn btn-danger" onClick={() => removeAccompaniedService(Accompanied.idService, Accompanied.serviceName)} > Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No AccompaniedService found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
                        <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 0}
                        >
                            Previous
                        </button>
                    </li>
                    {[...Array(totalPages)].map((_, index) => (
                        <li key={index} className={`page-item ${index === currentPage ? "active" : ""}`}>
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(index)}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages - 1 ? "disabled" : ""}`}>
                        <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages - 1}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div >
    )
}

export default AccompaniedServiceComponent