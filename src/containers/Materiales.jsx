import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import { FaPlus } from "react-icons/fa";
import { createMaterialAsync, deleteMaterialAsync, readMaterialesAsync, setMateriales } from '../redux/slices/materialesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Box, Modal } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import { AgregarMaterial, BotomForm, Card, ContainerAgregarMaterial, ContainerAlerta, ContainerForm, ContainerInfo, ContainerMateriales, ContainerMostrarMaterial, ContainerOpciones, FormNuevoMaterial, Info, InputForm, LabelForm, OptionSelectForm, SelectForm, Titulo, TituloCard, TituloForm, TituloInfo } from '../styles/Materiales-styled';
import { readProductosAsync, setProductos } from '../redux/slices/productosSlice';
import { ContainerFormBuscar, FormBuscar, InputFormBuscar, LabelFormBuscar } from '../styles/Productos-styled';
import Swal from 'sweetalert2';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#F1E1E4',
  boxShadow: 24,
  p: 4,
};

const Materiales = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const materiales = useSelector((store) => store.materiales)

  const [status, setStatus] = useState(0)
  const [open, setOpen] = useState(false);
  const [materialesBuscados, setMaterialesBuscados] = useState(null)

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //cargar materiales
  async function handleData() {
    await readMaterialesAsync().then((resp) => {
      dispatch(setMateriales(resp))
    })
  }

  useEffect(() => {
    handleData()
  }, [status])
  //----------------------------------------------------------------

  //cargar productos
  async function handleData2() {
    let datos = []

    await readProductosAsync().then((resp) => {
      resp.forEach((producto) => {
        let materialesUsados = []

        producto.materiales?.forEach((material) => {
          materialesUsados.push({
            material: materiales.materiales?.find((m) => m.id == material.nombreMaterial),
            cantidad: material.cantidad
          })
        })
        producto.materiales = materialesUsados

        datos.push(
          producto
        )
      })
    })
    dispatch(setProductos(datos))
  }

  useEffect(() => {
    handleData2()
  }, [status, materiales])
  //----------------------------------------------------------------

  //este es el formik para buscar materiales
  const formikBuscar = useFormik({
    initialValues: {
      buscar: "",
    },

    onSubmit: () => {
    },
  })

  const handleUpkey = (e) => {
    let buscado = materiales.materiales.filter((material) => material.nombreMaterial.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(e.target.value))

    setMaterialesBuscados(buscado)
  }
  //------------------------------------------

  //-------este es el formik de crear materiales--------------------------------
  const formik = useFormik({
    initialValues: {
      nombreMaterial: "",
      cantidadMaterial: "",
      medidaMateria: "",
      precioMaterial: "",
    },

    onSubmit: async (values) => {

      let materialNuevo = {
        id: crypto.randomUUID(),
        nombreMaterial: values.nombreMaterial,
        cantidadMaterial: values.cantidadMaterial,
        medidaMateria: values.medidaMateria,
        precioMaterial: values.precioMaterial,
        precioUnidadMaterial: values.precioMaterial / values.cantidadMaterial
      }

      await createMaterialAsync(materialNuevo)
      formik.resetForm()
      setStatus(status + 1)

    },
    validationSchema: Yup.object({
      nombreMaterial: Yup.string().required('El nombre es requerido'),
      cantidadMaterial: Yup.string().required('La cantidad es requerida'),
      medidaMateria: Yup.string().required('La medida es requerida'),
      precioMaterial: Yup.string().required('El precio es requerido'),
    }),
  })
  //------------------------------------------------------------------------------------

  //editar material

  const handleEdit = (material) => {
    navigate("/editarMaterial/" + material.id)
  }

  //------------------------------------------

  //eliminar material
  const handleDelete = (material) => {
    Swal.fire({
      title: "Estas seguro(a)?",
      text: "Desea eliminar el material " + material.nombreMaterial + " ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMaterialAsync(material.id)
        setStatus(status + 1)

        Swal.fire({
          title: "Eliminado!",
          text: "el material " + material.nombreMaterial + " a sido eliminado",
          icon: "success"
        });
      }
    });
    
  }
  //-------------------------------------------


  return (
    <>
      <ContainerMateriales>
        <Titulo>Materiales</Titulo>

        <ContainerAgregarMaterial>
          <AgregarMaterial onClick={handleOpen}><FaPlus style={{ fontSize: '18px', color: '#000000' }} /> Nuevo material </AgregarMaterial>
        </ContainerAgregarMaterial>

        <ContainerMostrarMaterial>
          <ContainerFormBuscar>
            <FormBuscar onSubmit={formikBuscar.handleSubmit}>
              <LabelFormBuscar> Buscar producto
                <InputFormBuscar
                  name="buscar"
                  type="text"
                  onChange={formikBuscar.handleChange}
                  value={formikBuscar.values.buscar}
                  onBlur={formikBuscar.handleBlur}
                  onKeyUp={handleUpkey} />
              </LabelFormBuscar>
            </FormBuscar>
          </ContainerFormBuscar>

          {
            materialesBuscados == null ?
              materiales.materiales.map((material) => (
                <Card key={material.id}>
                  <TituloCard>{material.nombreMaterial}</TituloCard>
                  <ContainerInfo>
                    <TituloInfo>Precio: <Info>${Intl.NumberFormat("de-DE").format(material.precioMaterial)} pesos</Info></TituloInfo>
                    <TituloInfo>Cantidad: <Info>{Intl.NumberFormat("de-DE").format(material.cantidadMaterial)}{material.medidaMateria}</Info></TituloInfo>
                    <TituloInfo>Precio unidad: <Info>${Intl.NumberFormat("de-DE").format(material.precioUnidadMaterial)} pesos/{material.medidaMateria}</Info></TituloInfo>
                  </ContainerInfo>
                  <ContainerOpciones>
                    <MdEdit onClick={() => handleEdit(material)} style={{ cursor: 'pointer', width: '50%', fontSize: '25px', color: '#000000', borderRight: '1px solid #000000', padding: '2px 0' }} />
                    <MdDelete onClick={() => { handleDelete(material) }} style={{ cursor: 'pointer', width: '50%', fontSize: '25px', color: '#000000', borderLeft: '1px solid #000000', padding: '2px 0' }} />
                  </ContainerOpciones>
                </Card>
              ))
              :
              materialesBuscados.map((material) => (
                <Card key={material.id}>
                  <TituloCard>{material.nombreMaterial}</TituloCard>
                  <ContainerInfo>
                    <TituloInfo>Precio: <Info>${Intl.NumberFormat("de-DE").format(material.precioMaterial)} pesos</Info></TituloInfo>
                    <TituloInfo>Cantidad: <Info>{Intl.NumberFormat("de-DE").format(material.cantidadMaterial)}{material.medidaMateria}</Info></TituloInfo>
                    <TituloInfo>Precio unidad: <Info>${Intl.NumberFormat("de-DE").format(material.precioUnidadMaterial)} pesos/{material.medidaMateria}</Info></TituloInfo>
                  </ContainerInfo>
                  <ContainerOpciones>
                    <MdEdit onClick={() => handleEdit(material)} style={{ cursor: 'pointer', width: '50%', fontSize: '25px', color: '#000000', borderRight: '1px solid #000000', padding: '2px 0' }} />
                    <MdDelete onClick={() => { handleDelete(material) }} style={{ cursor: 'pointer', width: '50%', fontSize: '25px', color: '#000000', borderLeft: '1px solid #000000', padding: '2px 0' }} />
                  </ContainerOpciones>
                </Card>
              ))
          }
        </ContainerMostrarMaterial>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ContainerForm>
              <TituloForm>Agregar nuevo matarial</TituloForm>
              <FormNuevoMaterial onSubmit={formik.handleSubmit}>
                <LabelForm> Nombre material
                  <InputForm
                    name="nombreMaterial"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.nombreMaterial}
                    onBlur={formik.handleBlur} />
                </LabelForm>
                {formik.touched && formik.touched.nombreMaterial ? (
                  <ContainerAlerta>{formik.errors.nombreMaterial}</ContainerAlerta>
                ) : null}
                <LabelForm> Cantidad material
                  <InputForm
                    name="cantidadMaterial"
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.cantidadMaterial}
                    onBlur={formik.handleBlur} />
                </LabelForm>
                {formik.touched && formik.touched.cantidadMaterial ? (
                  <ContainerAlerta>{formik.errors.cantidadMaterial}</ContainerAlerta>
                ) : null}
                <LabelForm> Medida
                  <SelectForm
                    name="medidaMateria"
                    onChange={formik.handleChange}
                    value={formik.values.medidaMateria}
                    onBlur={formik.handleBlur}>
                    <OptionSelectForm value="">Seleccione una opción</OptionSelectForm>
                    <OptionSelectForm value="gr">gramos</OptionSelectForm>
                    <OptionSelectForm value="cm">centimetros</OptionSelectForm>
                    <OptionSelectForm value="und">unidad</OptionSelectForm>
                  </SelectForm>
                </LabelForm>
                {formik.touched && formik.touched.medidaMateria ? (
                  <ContainerAlerta>{formik.errors.medidaMateria}</ContainerAlerta>
                ) : null}
                <LabelForm> Precio
                  <InputForm
                    name="precioMaterial"
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.precioMaterial}
                    onBlur={formik.handleBlur} />
                </LabelForm>
                {formik.touched && formik.touched.precioMaterial ? (
                  <ContainerAlerta>{formik.errors.precioMaterial}</ContainerAlerta>
                ) : null}
                <BotomForm type="submit" >Crear material</BotomForm>
              </FormNuevoMaterial>
            </ContainerForm>

          </Box>
        </Modal>
      </ContainerMateriales>

      <Navbar />
    </>
  )
}

export default Materiales
