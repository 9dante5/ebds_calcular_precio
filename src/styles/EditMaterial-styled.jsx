import styled from "styled-components";

export const ContainerEditMaterial = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

export const TituloEdit = styled.h2`
color: #898989;
font-size: 40px;
font-weight: 700;
text-align: center;
margin-top: 20px;
`

export const FormEdit = styled.form`
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

export const LabelFormEdit = styled.label`
display: flex;
flex-direction: column;
margin-top: 10px;
font-size: 16px;
font-weight: 500;
color: #898989;
`

export const InputFormEdit = styled.input`
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

export const SelectFormEdit = styled.select`
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

export const OptionSelectFormEdit = styled.option`
border: none;
border-radius: 5px;
`

export const ContainerAlertaEdit = styled.div`
font-size: 18px;
font-weight: 900;
color: #ff0000;
margin-top: 2px;
`

export const BotomFormEdit = styled.button`
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