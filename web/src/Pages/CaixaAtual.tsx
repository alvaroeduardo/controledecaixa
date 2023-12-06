import { useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { caixa } from "../Utils/requisicoes"

function CaixaAtual(){
    const { getUser } = useAuth()

    useEffect(() => {
        async function fetchData(){

            const caixas = await caixa.encontrarTodos()
            console.log(caixas[0].id)
        }

        fetchData()
    },[])

    return (
        <>
            {getUser().nome}
        </>
    )
}

export default CaixaAtual