import styled from "styled-components"

export const ContainerMateriales = styled.div`
width: 100%;
height: fit-content;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

export const Titulo = styled.h1`
width: 100%;
color: #898989;
font-size: 40px;
font-weight: 700;
text-align: center;
margin-top: 20px;
`

export const ContainerAgregarMaterial = styled.div`
width: 100%;
height: fit-content;
display: flex;
align-items: center;
justify-content: center;
margin-top: 30px;
`

export const AgregarMaterial = styled.button`
width: 300px;
height: 50px;
background-color: #898989;
color: #000000;
border: none;
border-radius: 5px;
font-size: 18px;
font-weight: 700;
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
gap: 10px;
`

export const ContainerMostrarMaterial = styled.div`
width: 90%;
height: fit-content;
display: flex;
flex-direction: row;
flex-wrap: wrap;
gap: 30px;
align-items: center;
justify-content: center;
margin: 30px 0 80px;
`

export const Card = styled.div`
width: 270px;
background-color: #F1E1E4;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
border-radius: 10px;
box-shadow: 0 0 15px #898989;
`

export const TituloCard = styled.h3`
width: 100%;
text-align: center;
font-size: 25px;
font-weight: 700;
color: #000000;
margin-top: 10px;
border-bottom: 1px solid #000000;
padding-bottom: 5px;
`

export const ContainerInfo = styled.div`
width: 90%;
display: flex;
flex-direction: column;
margin-top: 12px;
gap: 10px;
`

export const TituloInfo = styled.span`
font-size: 17px;
font-weight: 600;
color: #000000;
`

export const Info = styled(TituloInfo)`
font-weight: 400;
`

export const ContainerOpciones = styled.div`
width: 100%;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-around;
margin-top: 10px;
border-top: 2px solid #000000;
`

export const ContainerForm = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

export const TituloForm = styled.h3`
color: #898989;
font-size: 26px;
font-weight: 700;
`

export const FormNuevoMaterial = styled.form`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin-top: 20px;
`

export const LabelForm = styled.label`
display: flex;
flex-direction: column;
margin-top: 10px;
font-size: 16px;
font-weight: 500;
color: #898989;
`

export const InputForm = styled.input`
width: 220px;
height: 30px;
border: none;
margin-top: 2px;
border-radius: 5px;
padding: 0 7px;
color: #000000;
font-size: 16px;
outline: none;

&&::-webkit-inner-spin-button, 
&&::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
}
`

export const SelectForm = styled.select`
width: 234px;
height: 30px;
border: none;
margin-top: 2px;
border-radius: 5px;
padding: 0 7px;
color: #000000;
font-size: 16px;
outline: none;
`

export const OptionSelectForm = styled.option`
border: none;
border-radius: 5px;
`

export const ContainerAlerta = styled.div`
font-size: 18px;
font-weight: 900;
color: #ff0000;
margin-top: 2px;
`

export const BotomForm = styled.button`
width: 220px;
height: 40px;
margin-top: 25px;
border: none;
border-radius: 10px;
background-color: #898989;
cursor: pointer;
font-size: 16px;
font-weight: 600;
color: #000000;

&&:hover {
box-shadow: inset 0px 0px 50px #414141;
color: #f3f3f3;
transition: 0.6s;
}
`