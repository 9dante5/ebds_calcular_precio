import { createSlice } from "@reduxjs/toolkit"
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { dbFirestore } from "../../firebase/FirebaseConfig";
import Swal from "sweetalert2";

const initialState = {
    productos: []
}

export const productosReducer = createSlice({
    name: "productos",
    initialState,
    reducers: {
        setProductos: (state, action) => {
            state.productos = action.payload
        },
    },
})

export const { setProductos } = productosReducer.actions
export default productosReducer.reducer

//acciones (funciones)

//create
export const createProductoAsync = async (data) => {
    try {
        const response = await addDoc(collection(dbFirestore, "productos"), data);
        if (response.id) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Producto creado correctamente",
                showConfirmButton: false,
                timer: 1500
              });
        }
    } catch (error) {
        console.error(error)
    }
}

//read
export const readProductosAsync = async () => {
    const datos = []
    try {
        const productos = await getDocs(collection(dbFirestore, "productos"))
        productos.forEach((producto) => {
            datos.push({
                ...producto.data(),
            })
        })
        return datos
    } catch (error) {
        console.error(error);
    }
}

//update
export const updateProdructoAsync = async (newData, id) => {
    try {

        const productosColeccion = collection(dbFirestore, "productos");
        const productosQuery = query(productosColeccion, where("id", "==", id))
        const datos = await getDocs(productosQuery)

        datos.forEach((producto) => {
            const docRef = doc(dbFirestore, "productos", producto.id)
            updateDoc(docRef, newData)
        })
    } catch (error) {
        console.error(error)
    }
}

//delete
export const deleteProductoAsync = async (id) => {
    try {
        const productosColeccion = collection(dbFirestore, "productos");
        const productosQuery = query(productosColeccion, where("id", "==", id))


        const datos = await getDocs(productosQuery)

        datos.forEach((producto) => {
            deleteDoc(doc(dbFirestore, "productos", producto.id))
        })
    } catch (error) {
        console.log(error)
    }
}