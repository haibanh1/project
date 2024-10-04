import { useEffect, useState } from "react"
import { deleteRoomById, listRooms } from "../../Services/RoomService";
import { useNavigate } from "react-router-dom";


const RoomComponent = () => {

    const [rooms, setRoom] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize] = useState(10);

    function getAllCustomers(page = 0, size = 10) {
        listRooms(page, size).then((response) => {
            if (response.data.content && Array.isArray(response.data.content)) {
                setRoom(response.data.content);
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

    function updateRoom(id) {
        navigator(`/updateRoom/${id}`)
    }

    function removeRoom(id, name) {
        if (window.confirm(`Are you sure you want to delete this employee? ${name}`)) {
            deleteRoomById(id).then(() => {
                getAllCustomers();
                window.alert(`Room deleted successfully! ${name}`);
            }).catch(error => {
                console.log(error);
                window.alert(`Failed to delete Room. ${name}`);
            })
        }
    }


    return (
        <div className="container">
            <h2 className="text-center">List of Room</h2>
            <table className="table table-striped table-bordered table-hover">
                <thead className="table-header-bold">
                    <tr>
                        <td>Room ID</td>
                        <td>Room Name</td>
                        <td>Maximum Number Of Guests</td>
                        <td>Note</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(rooms) && rooms.length > 0 ? (
                        rooms.map(room => (
                            <tr key={room.idRoom}>
                                <td>{room.idRoom}</td>
                                <td>{room.roomName}</td>
                                <td>{room.maximumNumberOfGuests}</td>
                                <td>{room.note}</td>
                                <td>
                                    <div className="button-group">
                                        <button className="btn btn-info" onClick={() => updateRoom(room.idRoom)}>Update</button>
                                        <button className="btn btn-danger" onClick={() => removeRoom(room.idRoom, room.roomName)} > Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No Room found</td>
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

export default RoomComponent