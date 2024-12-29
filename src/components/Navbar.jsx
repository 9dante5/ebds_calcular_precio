import React, { useEffect, useState } from 'react'
import { PiTreasureChestBold } from "react-icons/pi";
import { FaRegListAlt } from "react-icons/fa";
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { readConstantesAsync, setConstantes, updateConstantesAsync } from '../redux/slices/constantesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Modal } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { FaEdit } from "react-icons/fa";

const ContainerNavbar = styled.div`
width: 100%;
height: 60px;  
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
position: fixed;
bottom: 0;
background-color: #FFFFFF;
`

const ContainerOpciones = styled.div`
width: 50%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 5px;
cursor: pointer;
border-top: 2px solid #F1E1E4;
transition: 0.5s;

&&:hover {
background-color: #F1E1E4;
transition: 0.5s;
}
`

const TituloOpciones = styled.h4`
font-size: 15px;
color: #898989;
`

const OpcionConstantes = styled.div`
width: fit-content;
height: fit-content;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
border-radius: 100%;
z-index: 1000;
position: fixed;
left: 2%;
top: 2%;
`

const LogoIcon = styled.img`
width: 120px;
transition: 0.5s;

&&:hover {
transform: scale(1.2);
transition: 0.5s;
}
`

const FormConstantes = styled.form`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

const LabelFormConstantes = styled.label`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
margin-top: 10px;
font-size: 20px;
color: #898989;
`

const InputFormConstantes = styled.input`
width: 45px;
height: 20px;
display: flex;
align-items: center;
justify-content: center;
border: none;
font-size: 16px; 
outline: none;
margin-left: 5px;

&&:disabled {
background-color: #F1E1E4;
color: #898989;
font-size: 20px;
}

&&::-webkit-inner-spin-button, 
&&::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
}
`
const ContainerBotones = styled.div`
width: fit-content;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
gap: 20px;
margin-top: 20px;
`

const BotonEditar = styled.button`
width: 90px;
height: 30px;
cursor: pointer;
font-size: 18px;
color: #000000;
background-color: #898989;
border: none;
border-radius: 8px;

&&:disabled {
display: none;
}
`

const InputPorcentaje = styled(InputFormConstantes)`
width: 24px;
`



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

const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const constantes = useSelector((store) => store.constantes.constantes)

    const [open, setOpen] = useState(false);
    const [editar, setEditar] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //cargar constantes
    async function handleData() {
        await readConstantesAsync().then((resp) => {
            dispatch(setConstantes(resp))
        })
    }

    useEffect(() => {
        handleData()
    }, [editar])
    //----------------------------------------------------------------

    //-------este es el formik de crear materiales--------------------------------
    const formik = useFormik({
        initialValues: {
            precioHora: constantes[0]?.valorHora || 0,
            porcentaje: constantes[0]?.porcentaje || 0
        },

        onSubmit: async (values) => {
            let newConstants = {
                id: constantes[0]?.id,
                valorHora: values.precioHora,
                porcentaje: values.porcentaje
            }

            updateConstantesAsync(newConstants, newConstants.id)
            setEditar(false)
        },
        validationSchema: Yup.object({
            // precioHora: Yup.string().required('El nombre es requerido'),

        }),
    })
    //------------------------------------------------------------------------------------

    return (
        <>
            <OpcionConstantes onClick={handleOpen}>
                <LogoIcon src={Logo} alt="" />
            </OpcionConstantes>
            <ContainerNavbar>
                <ContainerOpciones onClick={() => { navigate("/") }}>
                    <PiTreasureChestBold style={{ fontSize: '25px', color: '#898989' }} />
                    <TituloOpciones>Productos</TituloOpciones>
                </ContainerOpciones>
                <ContainerOpciones onClick={() => { navigate("/materiales") }}>
                    <FaRegListAlt style={{ fontSize: '25px', color: '#898989' }} />
                    <TituloOpciones>Materiales</TituloOpciones>
                </ContainerOpciones>
            </ContainerNavbar>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <FormConstantes onSubmit={formik.handleSubmit}>
                        <LabelFormConstantes> Precio hora de trabajo:
                            <InputFormConstantes
                                name="precioHora"
                                type="number"
                                onChange={formik.handleChange}
                                value={formik.values.precioHora}
                                onBlur={formik.handleBlur}
                                disabled={!editar} /> pesos
                        </LabelFormConstantes>
                        {formik.touched && formik.touched.precioHora ? (
                            <div>{formik.errors.precioHora}</div>
                        ) : null}
                        <LabelFormConstantes> Porcentaje ganancia:
                            <InputPorcentaje
                                name="porcentaje"
                                type="number"
                                onChange={formik.handleChange}
                                value={formik.values.porcentaje}
                                onBlur={formik.handleBlur}
                                disabled={!editar} /> %
                        </LabelFormConstantes>
                        {formik.touched && formik.touched.porcentaje ? (
                            <div>{formik.errors.porcentaje}</div>
                        ) : null}
                        <ContainerBotones>
                            <BotonEditar type="submit" disabled={!editar} >Editar</BotonEditar>
                            <FaEdit onClick={() => setEditar(true)} style={{ fontSize: "30px", cursor: "pointer" }} />
                        </ContainerBotones>
                    </FormConstantes>
                </Box>
            </Modal>
        </>
    )
}

export default Navbar
