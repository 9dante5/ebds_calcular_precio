import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { AgregarProducto, BotomFormBuscar, BotomFormProductos, CardProducto, Categoria, ContainerAgregarProducto, ContainerCalculos, ContainerFiltrar, ContainerFormBuscar, ContainerFormProductos, ContainerHorastrabajadas, ContainerListMateriales, ContainerMostrarProductos, ContainerOpcionesProductos, ContainerProductos, ContainerSelectFormProducto, ContainerValorVenta, DatosCalculados, FormBuscar, FormNuevoProducto, Horastrabajadas, InputFormBuscar, InputFormProducto, LabelFormBuscar, LabelFormProducto, ListProductosCard, ListProductosCardCantidad, ListProductosCardPrecio, ListProductosCardTitulo, OptionSelectFormBuscar, OptionSelectFormProductos, SelectFormBuscar, SelectFormProductos, TituloCardProducto, TituloFormProductos, TituloListMateriales, TituloProductos, TotalPrecioMateriales } from '../styles/Productos-styled'
import { FaPlus } from "react-icons/fa";
import { Box, Modal, Tooltip } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { readMaterialesAsync, setMateriales } from '../redux/slices/materialesSlice';
import { cantidadMateriales, categoriasProductos } from '../helpers/constants';
import { createProductoAsync, deleteProductoAsync, readProductosAsync, setProductos } from '../redux/slices/productosSlice';
import { ContainerAlerta } from '../styles/Materiales-styled';
import { FaRegQuestionCircle } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 620,
  bgcolor: '#F1E1E4',
  boxShadow: 24,
  p: 4,
};

const Productos = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const materiales = useSelector((store) => store.materiales)
  const constantes = useSelector((store) => store.constantes)
  const productos = useSelector((store) => store.productos)

  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(0);
  const [precioMaterialesProductos, setPrecioMaterialesProductos] = useState([])
  const [productosBuscados, setProductosBuscados] = useState(null)
  const [productosFiltro, setProductosFiltro] = useState([])

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

  //calcular precio total de materiales de cada producto

  const calcularPreciosMAteriales = () => {

    let preciosCaculados = []

    productos.productos?.forEach((producto) => {
      let precioTotalMaterial = 0
      producto.materiales?.forEach((material) => {
        if (material.material == undefined) {
          precioTotalMaterial += 0
        } else {
          precioTotalMaterial += material.cantidad * material.material.precioUnidadMaterial
        }
      })
      preciosCaculados.push({
        id: producto.id,
        precioTotalMaterial: precioTotalMaterial
      })
    })

    setPrecioMaterialesProductos(preciosCaculados)
  }

  useEffect(() => {
    calcularPreciosMAteriales()
  }, [productos])
  //----------------------------------------------------------------

  //editar producto

  const handleEdit = (producto) => {
    navigate("/editarProducto/" + producto.id)
    // console.log(producto.id)
  }

  //------------------------------------------

  //este es el formik para buscar producto
  const formikBuscar = useFormik({
    initialValues: {
      buscar: "",
      categoria: ""
    },

    onSubmit: async (values) => {
      const filtrado = productos.productos.filter((producto) => producto.categoria.includes(values.categoria))
      setProductosFiltro(filtrado)
      setProductosBuscados(filtrado)
    },
  })

  const handleUpkey = (e) => {
    let buscado
    if (productosFiltro.length == 0) {
      buscado = productos.productos.filter((producto) => producto.nombreProducto.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(e.target.value))
    } else {
      buscado = productosFiltro.filter((producto) => producto.nombreProducto.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(e.target.value))
    }

    setProductosBuscados(buscado)
  }
  //------------------------------------------

  //-------este es el formik de crear productos--------------------------------
  const formik = useFormik({
    initialValues: {
      nombreProducto: "",
      material1: "",
      cantidadMaterial1: "",
      material2: "",
      cantidadMaterial2: "",
      material3: "",
      cantidadMaterial3: "",
      material4: "",
      cantidadMaterial4: "",
      material5: "",
      cantidadMaterial5: "",
      material6: "",
      cantidadMaterial6: "",
      material7: "",
      cantidadMaterial7: "",
      material8: "",
      cantidadMaterial8: "",
      material9: "",
      cantidadMaterial9: "",
      material10: "",
      cantidadMaterial10: "",
      material11: "",
      cantidadMaterial11: "",
      material12: "",
      cantidadMaterial12: "",
      horasElavoracion: "",
      categoria: ""
    },

    onSubmit: async (values) => {

      let productNuevo = {
        id: crypto.randomUUID(),
        nombreProducto: values.nombreProducto,
        horasElavoracion: values.horasElavoracion,
        categoria: values.categoria,
        valorVenta: "",
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

      await createProductoAsync(productNuevo)
      formik.resetForm()
      setStatus(status + 1)

    },
    validationSchema: Yup.object({
      nombreProducto: Yup.string().required('El nombre es requerido'),
      horasElavoracion: Yup.string().required('Las horas de elaboración son requeridas'),
      categoria: Yup.string().required('La categoría es requerida'),
    }),
  })
  //------------------------------------------------------------------------------------

   //eliminar material
   const handleDelete = (producto) => {
    Swal.fire({
      title: "Estas seguro(a)?",
      text: "Desea eliminar el producto " + producto.nombreProducto + " ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProductoAsync(producto.id)
        setStatus(status + 1)

        Swal.fire({
          title: "Eliminado!",
          text: "el producto " + producto.nombreProducto + " a sido eliminado",
          icon: "success"
        });
      }
    });
    
  }
  //-------------------------------------------

  return (
    <>
      <ContainerProductos>
        <TituloProductos>Productos</TituloProductos>
        <ContainerAgregarProducto>
          <AgregarProducto onClick={handleOpen}><FaPlus style={{ fontSize: '18px', color: '#000000' }} /> Nuevo producto </AgregarProducto>
        </ContainerAgregarProducto>
        <ContainerMostrarProductos>
          <ContainerFormBuscar>
            <FormBuscar onSubmit={formikBuscar.handleSubmit}>
              <ContainerFiltrar>
                <LabelFormBuscar> Categoria
                  <SelectFormBuscar
                    name="categoria"
                    onChange={formikBuscar.handleChange}
                    value={formikBuscar.values.categoria}
                  >
                    <OptionSelectFormBuscar value="">Seleccione una categoria</OptionSelectFormBuscar>
                    {categoriasProductos.map((categoria) => (
                      <OptionSelectFormBuscar key={categoria} value={categoria}>{categoria}</OptionSelectFormBuscar>
                    ))}
                  </SelectFormBuscar>
                </LabelFormBuscar>
                <BotomFormBuscar type="submit">Filtrar</BotomFormBuscar>
              </ContainerFiltrar>
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
            productosBuscados == null ?
              productos.productos?.map((producto) => (
                <CardProducto key={producto.id}>
                  <TituloCardProducto>{producto.nombreProducto}</TituloCardProducto>
                  <Categoria>Categoria: {producto.categoria}</Categoria>
                  <ContainerListMateriales>
                    <TituloListMateriales>Materiales</TituloListMateriales>
                    {
                      producto.materiales?.map((material) => (
                        material.material == undefined ? <></> :
                          <ListProductosCard>
                            <ListProductosCardTitulo>{material.material.nombreMaterial}</ListProductosCardTitulo>
                            <ListProductosCardCantidad>Cantidad usado: {Intl.NumberFormat("de-DE").format(material.cantidad)}{material.material.medidaMateria}</ListProductosCardCantidad>
                            <ListProductosCardPrecio >Precio total material: ${Intl.NumberFormat("de-DE").format(material.cantidad * material.material.precioUnidadMaterial)}</ListProductosCardPrecio>
                          </ListProductosCard>
                      ))
                    }
                    {
                      precioMaterialesProductos.map((precioMaterial) => {
                        if (precioMaterial.id === producto.id) {
                          return <TotalPrecioMateriales >Precio total materiales: ${Intl.NumberFormat("de-DE").format(precioMaterial.precioTotalMaterial)}</TotalPrecioMateriales>
                        }
                      })
                    }
                  </ContainerListMateriales>

                  <ContainerHorastrabajadas>
                    <Horastrabajadas>Horas trabajadas: {Intl.NumberFormat("de-DE").format(producto.horasElavoracion)} Horas</Horastrabajadas>
                    <Horastrabajadas>Precio hora de trabajo: ${Intl.NumberFormat("de-DE").format(constantes.constantes[0].valorHora)}</Horastrabajadas>
                    <Horastrabajadas>Precio horas trabajadas: ${Intl.NumberFormat("de-DE").format(producto.horasElavoracion * constantes.constantes[0].valorHora)} </Horastrabajadas>
                  </ContainerHorastrabajadas>

                  <ContainerCalculos>
                    {
                      precioMaterialesProductos.map((precioMaterial) => {
                        if (precioMaterial.id === producto.id) {
                          return <DatosCalculados>Precio producto: ${Intl.NumberFormat("de-DE").format(precioMaterial.precioTotalMaterial + (producto.horasElavoracion * constantes.constantes[0].valorHora))}</DatosCalculados>
                        }
                      })
                    }
                    <DatosCalculados>% ganancia: {constantes.constantes[0].porcentaje}%</DatosCalculados>
                    {
                      precioMaterialesProductos.map((precioMaterial) => {
                        if (precioMaterial.id === producto.id) {
                          return <DatosCalculados>Precio calculado: ${Intl.NumberFormat("de-DE").format((precioMaterial.precioTotalMaterial + (producto.horasElavoracion * constantes.constantes[0].valorHora)) / (1 - (constantes.constantes[0].porcentaje / 100)))}</DatosCalculados>
                        }
                      })
                    }
                    <ContainerValorVenta>
                      <DatosCalculados> Precio Venta: ${Intl.NumberFormat("de-DE").format(producto.valorVenta)} </DatosCalculados>
                      <Tooltip
                        title="Editar para agregar el valor de venta"

                        placement="bottom"
                        arrow>
                        <div><FaRegQuestionCircle /></div>
                      </Tooltip>
                    </ContainerValorVenta>

                  </ContainerCalculos>

                  <ContainerOpcionesProductos>
                    <MdEdit onClick={() => { handleEdit(producto) }} style={{ cursor: 'pointer', width: '50%', fontSize: '25px', color: '#000000', borderRight: '1px solid #000000', padding: '2px 0' }} />
                    <MdDelete onClick={() => { handleDelete(producto) }} style={{ cursor: 'pointer', width: '50%', fontSize: '25px', color: '#000000', borderLeft: '1px solid #000000', padding: '2px 0' }} />
                  </ContainerOpcionesProductos>

                </CardProducto>
              ))
              :
              productosBuscados?.map((producto) => (
                <CardProducto key={producto.id}>
                  <TituloCardProducto>{producto.nombreProducto}</TituloCardProducto>
                  <Categoria>Categoria: {producto.categoria}</Categoria>
                  <ContainerListMateriales>
                    <TituloListMateriales>Materiales</TituloListMateriales>
                    {
                      producto.materiales?.map((material) => (
                        material.material == undefined ? <></> :
                          <ListProductosCard>
                            <ListProductosCardTitulo>{material.material.nombreMaterial}</ListProductosCardTitulo>
                            <ListProductosCardCantidad>Cantidad usado: {Intl.NumberFormat("de-DE").format(material.cantidad)}{material.material.medidaMateria}</ListProductosCardCantidad>
                            <ListProductosCardPrecio >Precio total material: ${Intl.NumberFormat("de-DE").format(material.cantidad * material.material.precioUnidadMaterial)}</ListProductosCardPrecio>
                          </ListProductosCard>
                      ))
                    }
                    {
                      precioMaterialesProductos.map((precioMaterial) => {
                        if (precioMaterial.id === producto.id) {
                          return <TotalPrecioMateriales >Precio total materiales: ${Intl.NumberFormat("de-DE").format(precioMaterial.precioTotalMaterial)}</TotalPrecioMateriales>
                        }
                      })
                    }
                  </ContainerListMateriales>

                  <ContainerHorastrabajadas>
                    <Horastrabajadas>Horas trabajadas: {Intl.NumberFormat("de-DE").format(producto.horasElavoracion)} Horas</Horastrabajadas>
                    <Horastrabajadas>Precio hora de trabajo: ${Intl.NumberFormat("de-DE").format(constantes.constantes[0].valorHora)}</Horastrabajadas>
                    <Horastrabajadas>Precio horas trabajadas: ${Intl.NumberFormat("de-DE").format(producto.horasElavoracion * constantes.constantes[0].valorHora)} </Horastrabajadas>
                  </ContainerHorastrabajadas>

                  <ContainerCalculos>
                    {
                      precioMaterialesProductos.map((precioMaterial) => {
                        if (precioMaterial.id === producto.id) {
                          return <DatosCalculados>Precio producto: ${Intl.NumberFormat("de-DE").format(precioMaterial.precioTotalMaterial + (producto.horasElavoracion * constantes.constantes[0].valorHora))}</DatosCalculados>
                        }
                      })
                    }
                    <DatosCalculados>% ganancia: {constantes.constantes[0].porcentaje}%</DatosCalculados>
                    {
                      precioMaterialesProductos.map((precioMaterial) => {
                        if (precioMaterial.id === producto.id) {
                          return <DatosCalculados>Precio calculado: ${Intl.NumberFormat("de-DE").format((precioMaterial.precioTotalMaterial + (producto.horasElavoracion * constantes.constantes[0].valorHora)) / (1 - (constantes.constantes[0].porcentaje / 100)))}</DatosCalculados>
                        }
                      })
                    }
                    <ContainerValorVenta>
                      <DatosCalculados> Precio Venta: ${Intl.NumberFormat("de-DE").format(producto.valorVenta)} </DatosCalculados>
                      <Tooltip
                        title="Editar para agregar el valor de venta"

                        placement="bottom"
                        arrow>
                        <div><FaRegQuestionCircle /></div>
                      </Tooltip>
                    </ContainerValorVenta>

                  </ContainerCalculos>

                  <ContainerOpcionesProductos>
                    <MdEdit onClick={() => { handleEdit(producto) }} style={{ cursor: 'pointer', width: '50%', fontSize: '25px', color: '#000000', borderRight: '1px solid #000000', padding: '2px 0' }} />
                    <MdDelete onClick={() => { handleDelete(producto) }} style={{ cursor: 'pointer', width: '50%', fontSize: '25px', color: '#000000', borderLeft: '1px solid #000000', padding: '2px 0' }} />
                  </ContainerOpcionesProductos>

                </CardProducto>

              ))

          }
        </ContainerMostrarProductos>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ContainerFormProductos>
              <TituloFormProductos>Agregar nuevo matarial</TituloFormProductos>
              <FormNuevoProducto onSubmit={formik.handleSubmit}>
                <LabelFormProducto> Nombre producto
                  <InputFormProducto
                    name="nombreProducto"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.nombreProducto}
                    onBlur={formik.handleBlur} />
                </LabelFormProducto>
                {formik.touched && formik.touched.nombreProducto ? (
                  <ContainerAlerta>{formik.errors.nombreProducto}</ContainerAlerta>
                ) : null}
                <ContainerSelectFormProducto>
                  {
                    cantidadMateriales.map((countMaterial) => (
                      <div key={countMaterial}>
                        <LabelFormProducto>
                          Material {countMaterial}
                          <SelectFormProductos
                            name={`material${countMaterial}`}
                            onChange={formik.handleChange}
                            value={formik.values[`material${countMaterial}`]}
                          >
                            <OptionSelectFormProductos value="">Seleccione un material</OptionSelectFormProductos>
                            {materiales.materiales?.map((material) => (
                              <OptionSelectFormProductos key={material.id} value={material.id}>{material.nombreMaterial} - {material.medidaMateria}</OptionSelectFormProductos>
                            ))}
                          </SelectFormProductos>
                        </LabelFormProducto>
                        <LabelFormProducto>
                          Cantidad material {countMaterial}
                          <InputFormProducto
                            name={`cantidadMaterial${countMaterial}`}
                            type="number"
                            onChange={formik.handleChange}
                            value={formik.values[`cantidadMaterial${countMaterial}`]}
                            onBlur={formik.handleBlur} />
                        </LabelFormProducto>
                      </div>
                    ))
                  }
                </ContainerSelectFormProducto>
                <LabelFormProducto> Horas de elaboracion
                  <InputFormProducto
                    name="horasElavoracion"
                    type="number"
                    step="any"
                    onChange={formik.handleChange}
                    value={formik.values.horasElavoracion}
                    onBlur={formik.handleBlur} />
                </LabelFormProducto>
                {formik.touched && formik.touched.horasElavoracion ? (
                  <ContainerAlerta>{formik.errors.horasElavoracion}</ContainerAlerta>
                ) : null}
                <LabelFormProducto> Categoria
                  <SelectFormProductos
                    name="categoria"
                    onChange={formik.handleChange}
                    value={formik.values.categoria}
                  >
                    <OptionSelectFormProductos value="">Seleccione una categoria</OptionSelectFormProductos>
                    {categoriasProductos.map((categoria) => (
                      <OptionSelectFormProductos key={categoria} value={categoria}>{categoria}</OptionSelectFormProductos>
                    ))}
                  </SelectFormProductos>
                  {formik.touched && formik.touched.categoria ? (
                    <ContainerAlerta>{formik.errors.categoria}</ContainerAlerta>
                  ) : null}
                </LabelFormProducto>
                <BotomFormProductos type="submit" >Crear Producto</BotomFormProductos>
              </FormNuevoProducto>
            </ContainerFormProductos>
          </Box>
        </Modal>
      </ContainerProductos>
      <Navbar />
    </>
  )
}

export default Productos
