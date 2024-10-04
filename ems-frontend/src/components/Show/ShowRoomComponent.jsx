import { useEffect, useState } from "react"
import { listRooms } from "../../ShowService/RoomService";


const ShowRoomComponent = () => {

  const [room, setRoom] = useState([]);

  useEffect(() => {
    getAllRoom()
  }, [])

  function getAllRoom() {
    listRooms().then((response) => {
      // Kiểm tra kiểu dữ liệu và định dạng của dữ liệu
      // console.log(response.data);
      if (Array.isArray(response.data)) {
        setRoom(response.data);  // Lưu dữ liệu mảng vào state
        console.log(response.data);
      } else {
        console.error("Expected an array but received:", response.data);
      }
    }).catch(error => {
      console.log(error);
    });
  }

  return (
    <div>ShowRoomComponent</div>
  )
}

export default ShowRoomComponent