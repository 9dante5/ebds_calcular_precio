import { createSlice } from "@reduxjs/toolkit"
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { dbFirestore } from "../../firebase/FirebaseConfig";
import Swal from "sweetalert2";

const initialState = {
    materiales: []
}

export const materialesReducer = createSlice({
    name: "materiales",
    initialState,
    reducers: {
        setMateriales: (state, action) => {
            state.materiales = action.payload
        },
    },
})

export const { setMateriales } = materialesReducer.actions
export default materialesReducer.reducer

//acciones (funciones)

//create
export const createMaterialAsync = async (data) => {
    try {
        const response = await addDoc(collection(dbFirestore, "materiales"), data);
        if (response.id) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Material creado correctamente",
                showConfirmButton: false,
                timer: 1500
              });
        }
    } catch (error) {
        console.error(error)
    }
}

//read
export const readMaterialesAsync = async () => {
    const datos = []
    try {
        const materiales = await getDocs(collection(dbFirestore, "materiales"))
        materiales.forEach((material) => {
            datos.push({
                ...material.data(),
            })
        })
        return datos
    } catch (error) {
        console.error(error);
    }
}

//update
export const updateMaterialAsync = async (newData, id) => {
    try {

        const materialesColeccion = collection(dbFirestore, "materiales");
        const materialesQuery = query(materialesColeccion, where("id", "==", id))
        const datos = await getDocs(materialesQuery)

        datos.forEach((material) => {
            const docRef = doc(dbFirestore, "materiales", material.id)
            updateDoc(docRef, newData)
        })
    } catch (error) {
        console.error(error)
    }
}

//delete
export const deleteMaterialAsync = async (id) => {
    try {
        const materialesColeccion = collection(dbFirestore, "materiales");
        const materialesQuery = query(materialesColeccion, where("id", "==", id))


        const datos = await getDocs(materialesQuery)

        datos.forEach((material) => {
            deleteDoc(doc(dbFirestore, "materiales", material.id))
        })
    } catch (error) {
        console.log(error)
    }
}