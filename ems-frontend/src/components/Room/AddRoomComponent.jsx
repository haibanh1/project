import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createRoom, getRoomById, updateRoom } from "../../Services/RoomService";

const AddRoomComponent = () => {

    const [roomName, setRoomName] = useState('');
    const [maximumNumberOfGuests, setMaximumNumberOfGuests] = useState('');
    const [note, setNote] = useState('');

    const [errors, setErrors] = useState({
        roomName: '',
        maximumNumberOfGuests: '',
        note: ''
    })

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getRoomById(id).then((response) => {
                setRoomName(response.data.roomName);
                setMaximumNumberOfGuests(response.data.maximumNumberOfGuests);
                setNote(response.data.note);
            }).catch(error => {
                console.error(error)
            })
        }
        else {
            setRoomName('');
            setMaximumNumberOfGuests('');
            setNote('');
        }
    }, [id])

    const navigator = useNavigate();

    function saveOrUpdateRoom(e) {
        e.preventDefault();

        if (validateForm()) {
            const room = { roomName, maximumNumberOfGuests, note };
            if (id) {
                updateRoom(room, id).then((response) => {
                    console.log(response.data);
                    navigator('/rooms');
                }).catch(error => {
                    console.error(error);
                })
            } else {
                createRoom(room).then((response) => {
                    console.log(response.data);
                    navigator('/rooms')
                }).catch(error => {
                    console.error(error)
                })
            }

        }


    }

    function validateForm() {
        let valid = true;

        const errorsCopy = { ...errors }

        if (roomName.trim()) {
            errorsCopy.roomName = '';
        } else {
            errorsCopy.roomName = 'Room Name is required';
            valid = false;
        }

        if (maximumNumberOfGuests) {
            errorsCopy.maximumNumberOfGuests = '';
        } else {
            errorsCopy.maximumNumberOfGuests = 'Maximum Number of Guests is required'
            valid = false;
        }

        if (note.trim()) {
            errorsCopy.note = '';
        } else {
            errorsCopy.note = 'Note name is required'
            valid = false;
        }

        setErrors(errorsCopy)

        return valid;
    }

    function pageTitle() {
        if (id) {
            return <h2 className="text-center">Update Room</h2>
        } else {
            return <h2 className="text-center">Add Room</h2>
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
                                <label className="form-label" htmlFor="roomName">Room Name:</label>
                                <input
                                    type="text"
                                    placeholder="Enter Room name"
                                    name="roomName"
                                    value={roomName}
                                    className={`form-control ${errors.roomName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setRoomName(e.target.value)}
                                />
                                {errors.roomName && <div className="invalid-feedback"> {errors.roomName} </div>}
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label" htmlFor="maximumNumberOfGuests">Maximum Number of Guests:</label>
                                <input
                                    type="number"
                                    placeholder="Enter Room Maximum Number of Guests"
                                    name="maximumNumberOfGuests"
                                    value={maximumNumberOfGuests}
                                    className={`form-control ${errors.maximumNumberOfGuests ? 'is-invalid' : ''}`}
                                    onChange={(e) => setMaximumNumberOfGuests(e.target.value)}
                                />
                                {errors.maximumNumberOfGuests && <div className="invalid-feedback"> {errors.maximumNumberOfGuests} </div>}
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label" htmlFor="note">Note:</label>
                                <input
                                    type="text"
                                    placeholder="Enter Employee Email"
                                    name="note"
                                    value={note}
                                    className={`form-control ${errors.note ? 'is-invalid' : ''}`}
                                    onChange={(e) => setNote(e.target.value)}
                                />
                                {errors.note && <div className="invalid-feedback"> {errors.note} </div>}
                            </div>

                            <button className="btn btn-success" onClick={saveOrUpdateRoom}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddRoomComponent