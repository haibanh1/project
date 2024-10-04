import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createAccompaniedService, getAccompaniedServiceById, updateAccompaniedService } from "../../Services/AccompaniedServiceService";

const AddOrUpdateAccompaniedServiceComponent = () => {

    const [serviceName, setServiceName] = useState('');
    const [unit, setUnit] = useState('');
    const [unitPrice, setUnitPrice] = useState('');

    const [errors, setErrors] = useState({
        serviceName: '',
        unit: '',
        unitPrice: ''
    })

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getAccompaniedServiceById(id).then((response) => {
                setServiceName(response.data.serviceName);
                setUnit(response.data.unit);
                setUnitPrice(response.data.unitPrice);
            }).catch(error => {
                console.error(error)
            })
        }
        else {
            setServiceName('');
            setUnit('');
            setUnitPrice('');
        }
    }, [id])

    const navigator = useNavigate();

    function saveOrUpdateAccompaniedService(e) {
        e.preventDefault();

        if (validateForm()) {
            const accompaniedService = { serviceName, unit, unitPrice };
            if (id) {
                updateAccompaniedService(accompaniedService, id).then((response) => {
                    console.log(response.data);
                    navigator('/accompaniedService');
                }).catch(error => {
                    console.error(error);
                })
            } else {
                createAccompaniedService(accompaniedService).then((response) => {
                    console.log(response.data);
                    navigator('/accompaniedService')
                }).catch(error => {
                    console.error(error)
                })
            }

        }


    }

    function validateForm() {
        let valid = true;

        const errorsCopy = { ...errors }

        if (serviceName.trim()) {
            errorsCopy.serviceName = '';
        } else {
            errorsCopy.serviceName = 'Service Name is required';
            valid = false;
        }

        if (unit) {
            errorsCopy.unit = '';
        } else {
            errorsCopy.unit = 'Unit is required'
            valid = false;
        }

        if (unitPrice) {
            errorsCopy.unitPrice = '';
        } else {
            errorsCopy.unitPrice = 'Unit Price is required'
            valid = false;
        }

        setErrors(errorsCopy)

        return valid;
    }

    function pageTitle() {
        if (id) {
            return <h2 className="text-center">Update AccompaniedService</h2>
        } else {
            return <h2 className="text-center">Add AccompaniedService</h2>
        }
    }

    return (
        <div className="container">
            <br />
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    {
                        pageTitle()
                    }
                    <div className="card-body">
                        <form action="">
                            <div className="form-group mb-2">
                                <label className="form-label" htmlFor="serviceName">Service Name:</label>
                                <input
                                    type="text"
                                    placeholder="Enter Service name"
                                    name="serviceName"
                                    value={serviceName}
                                    className={`form-control ${errors.serviceName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setServiceName(e.target.value)}
                                />
                                {errors.serviceName && <div className="invalid-feedback"> {errors.serviceName} </div>}
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label" htmlFor="unit">Unit:</label>
                                <input
                                    type="number"
                                    placeholder="Enter Unit"
                                    name="unit"
                                    value={unit}
                                    className={`form-control ${errors.unit ? 'is-invalid' : ''}`}
                                    onChange={(e) => setUnit(e.target.value)}
                                />
                                {errors.unit && <div className="invalid-feedback"> {errors.unit} </div>}
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label" htmlFor="unitPrice">Unit Price:</label>
                                <input
                                    type="number"
                                    placeholder="Enter Unit Price"
                                    name="unitPrice"
                                    value={unitPrice}
                                    className={`form-control ${errors.unitPrice ? 'is-invalid' : ''}`}
                                    onChange={(e) => setUnitPrice(e.target.value)}
                                />
                                {errors.unitPrice && <div className="invalid-feedback"> {errors.unitPrice} </div>}
                            </div>

                            <button className="btn btn-success" onClick={saveOrUpdateAccompaniedService}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddOrUpdateAccompaniedServiceComponent