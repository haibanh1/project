import { useEffect, useState } from "react"
import { deleteEmployee, getListEmployeeBySearch, listEmployee } from "../Services/EmployeeService"
import { useNavigate } from "react-router-dom"

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");

    const navigator = useNavigate();

    const [hoveredMovie, setHoveredMovie] = useState(null);
    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {
        getAllEmployee()
    }, [])

    function getAllEmployee() {
        listEmployee().then((response) => {
            // Kiểm tra kiểu dữ liệu và định dạng của dữ liệu
            console.log(response.data);
            if (Array.isArray(response.data)) {
                setEmployees(response.data);
            } else {
                console.error("Expected an array but received:", response.data);
            }
        }).catch(error => {
            console.log(error);
        });
    }

    function addNewEmployee() {
        navigator('/add-employee')
    }

    function updateEmployee(id) {
        navigator(`/edit-employee/${id}`)
    }

    function removeEmployee(id, name) {
        if (window.confirm(`Are you sure you want to delete this employee? ${name}`)) {
            deleteEmployee(id).then(() => {
                getAllEmployee();
                window.alert(`Employee deleted successfully! ${name}`);
            }).catch(error => {
                console.error(error)
                window.alert(`Failed to delete employee. ${name}`);
            })
        }
    }

    const handleMouseLeave = () => {
        setHoveredMovie(null);
        setMovieDetails(null);

    };

    function handleMouseEnter(id) {
        setHoveredMovie(id);
        listEmployee().then((response) => {
            setMovieDetails(response.data)
        })
    }

    const handleKeyUp = async (e) => {
        const query = e.target.value;
        setSearchTerm(query);

        try {
            const response = await getListEmployeeBySearch(searchTerm);
            if (Array.isArray(response.data)) {
                setEmployees(response.data);
            } else {
                console.error("Expected an array but received:", response.data);
            }
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };
    return (
        <div className="container">

            <h2 className="text-center">List of employee</h2>
            <button className="btn btn-primary mb-2" onClick={addNewEmployee}>Add Employee</button>
            <input
                type="text"
                name="searchName"
                id="searchName"
                className="form-control mb-2 ml-auto"
                onChange={handleKeyUp}  // Chỉ cần truyền hàm
            />
            <table className="table table-striped table-bordered table-hover">
                <thead className="table-header-bold">
                    <tr>
                        <td>Employee ID</td>
                        <td>Employee First Name</td>
                        <td>Employee Last Name</td>
                        <td>Employee Email</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(employees) && employees.length > 0 ? (
                        employees.map(employee => (
                            <tr key={employee.id}>
                                <td
                                    onMouseEnter={() => handleMouseEnter(employee.id)}
                                    onMouseLeave={handleMouseLeave}>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>
                                    <div className="button-group">
                                        <button className="btn btn-info" onClick={() => updateEmployee(employee.id)}>Update</button>
                                        <button className="btn btn-danger" onClick={() => removeEmployee(employee.id, `${employee.firstName} ${employee.lastName}`)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No employees found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {hoveredMovie && movieDetails && (
                <div className="movie-details">
                    <h3>Details for Movie ID: {hoveredMovie}</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Detail 1</th>
                                <th>Detail 2</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movieDetails.map((detail, index) => (
                                <tr key={index}>
                                    <td>{detail.id}</td>
                                    <td>{detail.firstName}</td>
                                    <td>{detail.lastName}</td>
                                    <td>{detail.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default ListEmployeeComponent