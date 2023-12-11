export function formatarData(dataString: string) {
    // Cria um objeto Date a partir da string fornecida
    const data = new Date(dataString);

    // Obtém os componentes da data
    const dia = data.getUTCDate();
    const mes = obterNomeMes(data.getUTCMonth());
    const ano = data.getUTCFullYear();
    const horas = data.getUTCHours();
    const minutos = adicionarZero(data.getUTCMinutes());
    const segundos = adicionarZero(data.getUTCSeconds());

    // Constrói a string formatada
    const dataFormatada = `${dia} de ${mes} de ${ano} às ${horas}:${minutos}:${segundos}`;

    return dataFormatada;
}

function obterNomeMes(numeroMes: number) {
    const meses = [
        "Janeiro", "Fevereiro", "Março",
        "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro",
        "Outubro", "Novembro", "Dezembro"
    ];
    return meses[numeroMes];
}

function adicionarZero(numero: number) {
    return numero < 10 ? `0${numero}` : numero;
}