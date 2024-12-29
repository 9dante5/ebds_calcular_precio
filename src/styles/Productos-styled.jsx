import styled from "styled-components";

export const ContainerProductos = styled.div`
width: 100%;
height: fit-content;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

export const TituloProductos = styled.h1`
width: 100%;
color: #898989;
font-size: 40px;
font-weight: 700;
text-align: center;
margin-top: 20px;
`

export const ContainerAgregarProducto = styled.div`
width: 100%;
height: fit-content;
display: flex;
align-items: center;
justify-content: center;
margin-top: 30px;
`

export const AgregarProducto = styled.button`
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

export const ContainerFormProductos = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

export const TituloFormProductos = styled.h3`
color: #898989;
font-size: 26px;
font-weight: 700;
`

export const FormNuevoProducto = styled.form`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin-top: 20px;
`

export const LabelFormProducto = styled.label`
display: flex;
flex-direction: column;
margin-top: 10px;
font-size: 16px;
font-weight: 500;
color: #898989;
`

export const ContainerSelectFormProducto = styled.div`
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

export const InputFormProducto = styled.input`
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

export const SelectFormProductos = styled.select`
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

export const OptionSelectFormProductos = styled.option`
border: none;
border-radius: 5px;
`

export const BotomFormProductos = styled.button`
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

export const ContainerMostrarProductos = styled.div`
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

export const CardProducto = styled.div`
width: 300px;
background-color: #F1E1E4;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
border-radius: 10px;
box-shadow: 0 0 15px #898989;
`

export const TituloCardProducto = styled.h3`
width: 100%;
font-size: 20px;
text-align: center;
color: #000000;
font-weight: 600;
margin-top: 15px;
border-bottom: 2px solid #000000;
`

export const Categoria = styled.h3`
font-size: 18px;
font-weight: 500;
margin-top: 15px;
`

export const ContainerListMateriales = styled.div`
width: 280px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: fit-content;
background-color: #ffffff;
border-radius: 10px;
margin-top: 15px;
`

export const TituloListMateriales = styled.h4`
width: 100%;
font-size: 18px;
text-align: center;
color: #898989;
font-weight: 500;
margin-top: 10px;
`

export const ListProductosCard = styled.div`
width: 230px; 
display: flex; 
flex-direction: column; 
align-items: center; 
justify-content: center; 
margin-top: 10px; 
background-color: #F1E1E4; 
border-radius: 15px; 
padding: 5px; 
color: #000000
`

export const ListProductosCardTitulo = styled.h3`
font-size: 18px;
font-weight: 400;
margin-bottom: 8px;
color: #000000;
`

export const ListProductosCardCantidad = styled.h3`
font-size: 15px;
font-weight: 300;
margin-bottom: 2px;
color: #000000;
`

export const ListProductosCardPrecio = styled(ListProductosCardCantidad)`
margin: 0
`

export const TotalPrecioMateriales = styled.h3`
font-size: 15px;
font-weight: 500;
color: #000000;
margin: 8px 0
`

export const ContainerHorastrabajadas = styled.div`
width: 260px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: fit-content;
background-color: #ffffff;
border-radius: 10px;
margin-top: 15px;
padding: 10px 10px;
gap: 5px;
`
export const Horastrabajadas = styled.span`
font-size: 14px;
font-weight: 400;
text-align: center;
`
export const ContainerCalculos = styled.div`
width: 260px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: fit-content;
background-color: #ffffff;
border-radius: 10px;
margin-top: 15px;
padding: 10px 10px;
gap: 5px;
`

export const DatosCalculados = styled(Horastrabajadas)`
`

export const ContainerValorVenta = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
gap: 5px;
`

export const ContainerOpcionesProductos = styled.div`
width: 100%;
display: flex;
flex-direction: row;
margin-top: 18px;
border-top: 2px solid #000000;
`

export const ContainerFormBuscar = styled.div`
width: 100%;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
`

export const FormBuscar = styled.form`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 10px;
`

export const LabelFormBuscar = styled.label`
display: flex;
flex-direction: column;
font-size: 16px;
font-weight: 500;
color: #898989;
`

export const ContainerFiltrar = styled.div`
display: flex;
flex-direction: column;
gap: 5px;
align-items: center;
justify-content: center;
`

export const SelectFormBuscar = styled.select`
width: 234px;
height: 30px;
border: none;
margin-top: 2px;
border-radius: 5px;
padding: 0 7px;
color: #000000;
font-size: 16px;
outline: none;
background-color: #F1E1E4;
`

export const OptionSelectFormBuscar = styled.option`
border: none;
border-radius: 5px;
`

export const BotomFormBuscar = styled.button`
width: 220px;
height: 40px;
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

export const InputFormBuscar = styled.input`
width: 220px;
height: 30px;
border: none;
margin-top: 2px;
border-radius: 5px;
padding: 0 7px;
color: #000000;
font-size: 16px;
outline: none;
background-color: #F1E1E4;

&&::-webkit-inner-spin-button, 
&&::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
}
`

