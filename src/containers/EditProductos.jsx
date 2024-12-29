import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { BotomFormEditProducto, ContainerEditProductos, ContainerSelectFormEditProducto, FormEditProductos, InputFormEditProducto, LabelFormEditProducto, OptionSelectFormEditProductos, SelectFormEditProductos, TituloEditProductos } from '../styles/EditProducts-styled';
import { ContainerAlerta } from '../styles/Materiales-styled';
import { cantidadMateriales, categoriasProductos } from '../helpers/constants';
import { updateProdructoAsync } from '../redux/slices/productosSlice';

const EditProductos = () => {
    const navigate = useNavigate()
    const productos = useSelector((store) => store.productos)
    const materiales = useSelector((store) => store.materiales)
    const { id } = useParams()

    const producto = productos.productos.find((material) => material.id === id)

    //-------este es el formik de editar productos--------------------------------
    const formik = useFormik({
        initialValues: {
            nombreProducto: producto.nombreProducto,
            material1: producto.materiales[0].material == undefined ? "" : producto.materiales[0].material.id,
            cantidadMaterial1: producto.materiales[0].cantidad,
            material2: producto.materiales[1].material == undefined ? "" : producto.materiales[1].material.id,
            cantidadMaterial2: producto.materiales[1].cantidad,
            material3: producto.materiales[2].material == undefined ? "" : producto.materiales[2].material.id,
            cantidadMaterial3: producto.materiales[2].cantidad,
            material4: producto.materiales[3].material == undefined ? "" : producto.materiales[3].material.id,
            cantidadMaterial4: producto.materiales[3].cantidad,
            material5: producto.materiales[4].material == undefined ? "" : producto.materiales[4].material.id,
            cantidadMaterial5: producto.materiales[4].cantidad,
            material6: producto.materiales[5].material == undefined ? "" : producto.materiales[5].material.id,
            cantidadMaterial6: producto.materiales[5].cantidad,
            material7: producto.materiales[6].material == undefined ? "" : producto.materiales[6].material.id,
            cantidadMaterial7: producto.materiales[6].cantidad,
            material8: producto.materiales[7].material == undefined ? "" : producto.materiales[7].material.id,
            cantidadMaterial8: producto.materiales[7].cantidad,
            material9: producto.materiales[8].material == undefined ? "" : producto.materiales[8].material.id,
            cantidadMaterial9: producto.materiales[8].cantidad,
            material10: producto.materiales[9].material == undefined ? "" : producto.materiales[9].material.id,
            cantidadMaterial10: producto.materiales[9].cantidad,
            material11: producto.materiales[10].material == undefined ? "" : producto.materiales[10].material.id,
            cantidadMaterial11: producto.materiales[10].cantidad,
            material12: producto.materiales[11].material == undefined ? "" : producto.materiales[11].material.id,
            cantidadMaterial12: producto.materiales[11].cantidad,
            horasElavoracion: producto.horasElavoracion,
            categoria: producto.categoria,
            valorVenta: producto.valorVenta
        },

        onSubmit: async (values) => {

            let productEdit = {
                id: producto.id,
                nombreProducto: values.nombreProducto,
                horasElavoracion: values.horasElavoracion,
                categoria: values.categoria,
                valorVenta: values.valorVenta,
                materiales: [
                    {
                        nombreMaterial: values.material1,
                        cantidad: values.cantidadMaterial1,
                    },
                    {
                        nombreMaterial: values.material2,
                        cantidad: values.cantidadMaterial2,
                    },
                    {
                        nombreMaterial: values.material3,
                        cantidad: values.cantidadMaterial3,
                    },
                    {
                        nombreMaterial: values.material4,
                        cantidad: values.cantidadMaterial4,
                    },
                    {
                        nombreMaterial: values.material5,
                        cantidad: values.cantidadMaterial5,
                    },
                    {
                        nombreMaterial: values.material6,
                        cantidad: values.cantidadMaterial6,
                    },
                    {
                        nombreMaterial: values.material7,
                        cantidad: values.cantidadMaterial7,
                    },
                    {
                        nombreMaterial: values.material8,
                        cantidad: values.cantidadMaterial8,
                    },
                    {
                        nombreMaterial: values.material9,
                        cantidad: values.cantidadMaterial9,
                    },
                    {
                        nombreMaterial: values.material10,
                        cantidad: values.cantidadMaterial10,
                    },
                    {
                        nombreMaterial: values.material11,
                        cantidad: values.cantidadMaterial11,
                    },
                    {
                        nombreMaterial: values.material12,
                        cantidad: values.cantidadMaterial12,
                    }
                ]
            }

            updateProdructoAsync(productEdit, producto.id)
            navigate('/')

        },
        validationSchema: Yup.object({
            nombreProducto: Yup.string().required('El nombre es requerido'),
            horasElavoracion: Yup.string().required('Las horas de elaboración son requeridas'),
            categoria: Yup.string().required('La categoría es requerida'),
            valorVenta: Yup.string().required('El valor de venta es requerido'),
        }),
    })
    //------------------------------------------------------------------------------------

    return (
        <>
            <ContainerEditProductos>
                <TituloEditProductos>Editar producto</TituloEditProductos>
                <FormEditProductos onSubmit={formik.handleSubmit}>
                    <LabelFormEditProducto> Nombre producto
                        <InputFormEditProducto
                            name="nombreProducto"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.nombreProducto}
                            onBlur={formik.handleBlur} />
                    </LabelFormEditProducto>
                    {formik.touched && formik.touched.nombreProducto ? (
                        <ContainerAlerta>{formik.errors.nombreProducto}</ContainerAlerta>
                    ) : null}

                    <ContainerSelectFormEditProducto>
                        {
                            cantidadMateriales.map((countMaterial) => (
                                <div key={countMaterial}>
                                    <LabelFormEditProducto>
                                        Material {countMaterial}
                                        <SelectFormEditProductos
                                            name={`material${countMaterial}`}
                                            onChange={formik.handleChange}
                                            value={formik.values[`material${countMaterial}`]}
                                        >
                                            <OptionSelectFormEditProductos value="">Seleccione un material</OptionSelectFormEditProductos>
                                            {materiales.materiales?.map((material) => (
                                                <OptionSelectFormEditProductos key={material.id} value={material.id}>{material.nombreMaterial} - {material.medidaMateria}</OptionSelectFormEditProductos>
                                            ))}
                                        </SelectFormEditProductos>
                                    </LabelFormEditProducto>
                                    <LabelFormEditProducto>
                                        Cantidad material {countMaterial}
                                        <InputFormEditProducto
                                            name={`cantidadMaterial${countMaterial}`}
                                            type="number"
                                            onChange={formik.handleChange}
                                            value={formik.values[`cantidadMaterial${countMaterial}`]}
                                            onBlur={formik.handleBlur} />
                                    </LabelFormEditProducto>
                                </div>
                            ))
                        }
                    </ContainerSelectFormEditProducto>
                    <LabelFormEditProducto> Horas de elaboracion
                        <InputFormEditProducto
                            name="horasElavoracion"
                            type="number"
                            step="any"
                            onChange={formik.handleChange}
                            value={formik.values.horasElavoracion}
                            onBlur={formik.handleBlur} />
                    </LabelFormEditProducto>
                    {formik.touched && formik.touched.horasElavoracion ? (
                        <ContainerAlerta>{formik.errors.horasElavoracion}</ContainerAlerta>
                    ) : null}
                    <LabelFormEditProducto> Categoria
                        <SelectFormEditProductos
                            name="categoria"
                            onChange={formik.handleChange}
                            value={formik.values.categoria}
                        >
                            <OptionSelectFormEditProductos value="">Seleccione una categoria</OptionSelectFormEditProductos>
                            {categoriasProductos.map((categoria) => (
                                <OptionSelectFormEditProductos key={categoria} value={categoria}>{categoria}</OptionSelectFormEditProductos>
                            ))}
                        </SelectFormEditProductos>
                        {formik.touched && formik.touched.categoria ? (
                            <ContainerAlerta>{formik.errors.categoria}</ContainerAlerta>
                        ) : null}
                    </LabelFormEditProducto>
                    <LabelFormEditProducto> Precio de venta
                        <InputFormEditProducto
                            name="valorVenta"
                            type="number"
                            step="any"
                            onChange={formik.handleChange}
                            value={formik.values.valorVenta}
                            onBlur={formik.handleBlur} />
                    </LabelFormEditProducto>
                    {formik.touched && formik.touched.valorVenta ? (
                        <ContainerAlerta>{formik.errors.valorVenta}</ContainerAlerta>
                    ) : null}
                    <BotomFormEditProducto type="submit">Editar producto</BotomFormEditProducto>
                </FormEditProductos>
            </ContainerEditProductos>
            <button onClick={() => { console.log(producto) }}>el boton</button>
            <button onClick={() => { console.log(productos) }}>el boton 2</button>
        </>
    )
}

export default EditProductos
