import { createSlice } from "@reduxjs/toolkit"
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { dbFirestore } from "../../firebase/FirebaseConfig";

const initialState = {
    constantes: []
}

export const constantesReducer = createSlice({
    name: "constantes",
    initialState,
    reducers: {
        setConstantes: (state, action) => {
            state.constantes = action.payload
        },
    },
})

export const { setConstantes } = constantesReducer.actions
export default constantesReducer.reducer

//acciones (funciones)

//read
export const readConstantesAsync = async () => {
    const datos = []
    try {
        const constantes = await getDocs(collection(dbFirestore, "constantes"))
        constantes.forEach((constante) => {
            datos.push({
                ...constante.data(),
            })
        })
        return datos
    } catch (error) {
        console.error(error);
    }
}

//update
export const updateConstantesAsync = async (newData, id) => {
    try {
        const docRef = doc(dbFirestore, "constantes", id)
        await updateDoc(docRef, newData)
    } catch (error) {
        console.error(error)
    }
}