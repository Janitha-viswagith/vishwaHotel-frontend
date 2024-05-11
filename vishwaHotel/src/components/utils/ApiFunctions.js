import axios from "axios"

export const api = axios.create({
    baseURL : "http://localhost:9192"
})


//This function add new room  room to the databases
export async function addRoom (photo, roomType , roomPrice){
    const fromData = new FormData()
    formData.append("photo",photo)
    formData.append("roomType",roomType)
    formData.append("roomPrice",roomPrice)

    const response = await api.post("/rooms/add/new-room",fromData)
    if(response.status === 201 ){
        return true
    }else{
        return false
    }
}

//This function gets all room types from thee database

export async  function  getRoomTypes(){
    
    try{
      
        const response = await api.get("/rooms/room-types")
         
        return response.data

    }catch(error){

        throw new Error ("Error fetching room types")
    }

}