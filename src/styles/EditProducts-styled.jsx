import styled from "styled-components";

export const ContainerEditProductos = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

export const TituloEditProductos = styled.h2`
color: #898989;
font-size: 40px;
font-weight: 700;
text-align: center;
margin-top: 20px;
`

export const FormEditProductos = styled.form`
width: 400px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin-top: 20px;
padding: 50px 0;
border-radius: 10px;
background-color: #F1E1E4;
`

export const LabelFormEditProducto = styled.label`
display: flex;
flex-direction: column;
margin-top: 10px;
font-size: 16px;
font-weight: 500;
color: #898989;
`

export const InputFormEditProducto = styled.input`
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

export const ContainerSelectFormEditProducto = styled.div`
width: 100%;
height: 250px;
display: flex;
flex-direction: column;
align-items: center;
overflow: scroll;
scroll-behavior: smooth;
flex-wrap: nowrap;
margin-top: 20px;

&&::-webkit-scrollbar {
	width: 7px;
}

&&::-webkit-scrollbar-thumb {
	background: #898989;
}
`

export const SelectFormEditProductos = styled.select`
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

export const OptionSelectFormEditProductos = styled.option`
border: none;
border-radius: 5px;
`

export const BotomFormEditProducto = styled.button`
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