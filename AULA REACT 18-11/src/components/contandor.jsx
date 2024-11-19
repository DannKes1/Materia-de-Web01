import React, {useState} from "react";

function Contador(props){
const [contador, setContador] = useState(0); 

return (
<div>
    <p>Você clicou {contador} vezes</p>
    <p>Seu nome {props.nome} e idade {props.idade} </p>
    
    <button onClick={() => {
        setContador(contador + 1)
    }}> 
    Clique aqui
    </button>
</div>


)
}

export default Contador;