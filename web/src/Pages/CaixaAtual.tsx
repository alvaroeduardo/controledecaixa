import { useAuth } from "../context/AuthContext"

function CaixaAtual(){
    const { getUser } = useAuth()

    return (
        <>
            {getUser().nome}
        </>
    )
}

export default CaixaAtual