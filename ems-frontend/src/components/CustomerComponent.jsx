import { useEffect, useState } from "react"
import { listCustomers } from "../Services/CustomerService"
import { useNavigate } from "react-router-dom";


const CustomerComponent = () => {

    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize] = useState(10);

    function getAllCustomers(page = 0, size = 10) {
        listCustomers(page, size).then((response) => {
            if (response.data.content && Array.isArray(response.data.content)) {
                setCustomers(response.data.content);
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
        getAllCustomers(currentPage, pageSize);
    }, [currentPage, pageSize]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const navigator = useNavigate();

    function historyCustomer(id) {
        navigator(`/history/${id}`)
    }

    return (
        <div className="container">
            <h2 className="text-center">List of Customer</h2>
            <table className="table table-striped table-bordered table-hover">
                <thead className="table-header-bold">
                    <tr>
                        <td>Customer ID</td>
                        <td>Customer Name</td>
                        <td>Address</td>
                        <td>Phone</td>
                        <td>History</td>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(customers) && customers.length > 0 ? (
                        customers.map(customer => (
                            <tr key={customer.idCustomer}>
                                <td>{customer.idCustomer}</td>
                                <td>{customer.customerName}</td>
                                <td>{customer.address}</td>
                                <td>{customer.phone}</td>
                                <td>
                                    <div className="button-group">
                                        <button className="btn btn-info" onClick={() => historyCustomer(customer.idCustomer)}>Xem Lịch Sử Khách Hàng</button>
                                        {/* <button className="btn btn-danger" onClick={() => removeEmployee(employee.id, `${employee.firstName} ${employee.lastName}`)}>Delete</button> */}
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No Customer found</td>
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
        </div>
    )
}

export default CustomerComponent