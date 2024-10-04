import { useEffect, useState } from "react";
import { historyCustomer } from "../Services/CustomerService";
import { useNavigate, useParams } from "react-router-dom";


const HistoryCTMComponent = () => {

    const { id } = useParams();

    const navigator = useNavigate();

    const [customerDetails, setCustomerDetails] = useState([]);

    useEffect(() => {
        historyCustomer(id).then(response => {
            setCustomerDetails(response.data);
        })
            .catch(error => {
                console.error('There was an error fetching the customer details!', error);
            });
    }, [id]);

    function BackListCTM() {
        navigator('/customers')
    }

    return (
        <div className="container">
            <h3 className="text-center">Customer Details</h3>
            {customerDetails.length > 0 ? (
                <table className="table table-striped table-bordered table-hover">
                    <thead className="table-header-bold">
                        <tr>
                            <th>Customer Name</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Booking Date</th>
                            <th>Quantity</th>
                            <th>Room Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customerDetails.map((detail, index) => (
                            <tr key={index}>
                                <td>{detail.customerName}</td>
                                <td>{detail.address}</td>
                                <td>{detail.phone}</td>
                                <td>{detail.bookingDate}</td>
                                <td>{detail.quantity} USA</td>
                                <td>{detail.roomName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No customer details found.</p>
            )}
            <button className="btn btn-primary" onClick={BackListCTM}>Back</button>
        </div>
    );
};

export default HistoryCTMComponent