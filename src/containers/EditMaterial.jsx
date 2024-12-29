import { useFormik } from 'formik'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { BotomFormEdit, ContainerAlertaEdit, ContainerEditMaterial, FormEdit, InputFormEdit, LabelFormEdit, OptionSelectFormEdit, SelectFormEdit, TituloEdit } from '../styles/EditMaterial-styled'
import { updateMaterialAsync } from '../redux/slices/materialesSlice'

const EditMaterial = () => {
  const navigate = useNavigate()
  const materiales = useSelector((store) => store.materiales)
  const { id } = useParams()

  const material = materiales.materiales.find((material) => material.id === id)

  //-------este es el formik de editar material--------------------------------
  const formik = useFormik({
    initialValues: {
      id: material.id,
      nombreMaterial: material.nombreMaterial,
      cantidadMaterial: material.cantidadMaterial,
      medidaMateria: material.medidaMateria,
      precioMaterial: material.precioMaterial,
      precioUnidadMaterial: material.precioUnidadMaterial
    },

    onSubmit: async (values) => {

      let materialEdit = {
        id: material.id,
        nombreMaterial: values.nombreMaterial,
        cantidadMaterial: values.cantidadMaterial,
        medidaMateria: values.medidaMateria,
        precioMaterial: values.precioMaterial,
        precioUnidadMaterial: values.precioMaterial / values.cantidadMaterial
      }

      updateMaterialAsync(materialEdit, values.id)
      navigate('/materiales')

    },
    validationSchema: Yup.object({
      nombreMaterial: Yup.string().required('El nombre es requerido'),
      cantidadMaterial: Yup.string().required('La cantidad es requerida'),
      medidaMateria: Yup.string().required('La medida es requerida'),
      precioMaterial: Yup.string().required('El precio es requerido'),
    }),
  })
  //------------------------------------------------------------------------------------

  return (
    <>
      <ContainerEditMaterial>
        <TituloEdit>Editar material</TituloEdit>
        <FormEdit onSubmit={formik.handleSubmit}>
          <LabelFormEdit> Nombre material
            <InputFormEdit
              name="nombreMaterial"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.nombreMaterial}
              onBlur={formik.handleBlur} />
          </LabelFormEdit>
          {formik.touched && formik.touched.nombreMaterial ? (
            <ContainerAlertaEdit>{formik.errors.nombreMaterial}</ContainerAlertaEdit>
          ) : null}
          <LabelFormEdit> Cantidad material
            <InputFormEdit
              name="cantidadMaterial"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.cantidadMaterial}
              onBlur={formik.handleBlur} />
          </LabelFormEdit>
          {formik.touched && formik.touched.cantidadMaterial ? (
            <ContainerAlertaEdit>{formik.errors.cantidadMaterial}</ContainerAlertaEdit>
          ) : null}
          <LabelFormEdit> Medida
            <SelectFormEdit
              name="medidaMateria"
              onChange={formik.handleChange}
              value={formik.values.medidaMateria}
              onBlur={formik.handleBlur}>
              <OptionSelectFormEdit value="">Seleccione una opción</OptionSelectFormEdit>
              <OptionSelectFormEdit value="gr">gramos</OptionSelectFormEdit>
              <OptionSelectFormEdit value="cm">centimetros</OptionSelectFormEdit>
              <OptionSelectFormEdit value="und">unidad</OptionSelectFormEdit>
            </SelectFormEdit>
          </LabelFormEdit>
          {formik.touched && formik.touched.medidaMateria ? (
            <ContainerAlertaEdit>{formik.errors.medidaMateria}</ContainerAlertaEdit>
          ) : null}
          <LabelFormEdit> Precio
            <InputFormEdit
              name="precioMaterial"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.precioMaterial}
              onBlur={formik.handleBlur} />
          </LabelFormEdit>
          {formik.touched && formik.touched.precioMaterial ? (
            <ContainerAlertaEdit>{formik.errors.precioMaterial}</ContainerAlertaEdit>
          ) : null}
          <BotomFormEdit type="submit" >Editar material</BotomFormEdit>
        </FormEdit>
      </ContainerEditMaterial>
    </>
  )
}

export default EditMaterial
