import React, { useState } from "react";
import { addRoom } from "../utils/ApiFunctions";
import RoomTypeSelector from "../common/RoomTypeSelector";

const AddRoom = () => {
  const [newRoom, setNewRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: "",
  });

  const [imagePreviwe, setImagePreviwe] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setEyrrorMessage] = useState("");

  const handleRoomInputChang = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === "roomPrice") {
      if (!isNaN(value)) {
        value.parseInt(value);
      } else {
        value = "";
      }
    }

    setNewRoom({ ...newRoom, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    setNewRoom({ ...newRoom, photo: selectedImage });
    setImagePreviwe(URL.createObjectURL(selectedImage));
  };

  const handleSummit = async (e) => {
    e.preventDefault();

    try {
      const success = await AddRoom(
        newRoom.photo,
        newRoom.roomType,
        newRoom.roomPrice
      );

      if (success !== undefined) {
        setSuccessMessage("A new room  was added to the databases");
        setNewRoom({ photo: null, roomType: "", roomPrice: "" });
        setImagePreviwe("");
        setEyrrorMessage("");
      } else {
        setEyrrorMessage("Error adding room");
      }
    } catch (error) {
      setEyrrorMessage(error.Message);
    }
  };

  return (
    <div>
      <section className="Container , mt-5 mb-5">
        <div className="room justify-content-center">
          <div className="col-md-8 col-lg-6">
            <h2 className="mt-5 md-2 "> Add a New Room</h2>

            <form onSubmit={handleSummit}>
             
              <div className="md-3">
                <label htmlFor="roomType" className="form-label">
                  Room Type
                </label>

                <div className=" form-control" >
                  <RoomTypeSelector
                    handleRoomInputChange={handleRoomInputChang}
                    newRoom={newRoom}
                  className ="form-control "/>
                </div>
              </div>

              <div className="md-3 ">
                <label htmlFor="roomPrice" className="form-label">
                  Room Price
                </label>

                <input
                  type="number"
                 className="form-control"
                  required
                  id="roomPrice"
                 
                  name="romPrice"
                  value={newRoom.roomPrice}
                  onChange={handleRoomInputChang}
                />
              </div>

              <div className="md-3 ">
                <label htmlFor="photo" className="form-label">
                  Room Photo
                </label>

                <input
                  id="photo"
                  name="photo"
                  type="file"
                  className="form-control"
                  onChange={handleImageChange}
                />
                {imagePreviwe && (
                  <img
                    src={imagePreviwe}
                    alt="Previwe Room Photo"
                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                    className="mb-3"
                  />
                )}
              </div>

              <div className="d-grid d-md-flex mt-2">
                <button className="btn btn-outline-primary ml-5">
                  Save Room
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddRoom;
