export function formatarNumeroParaReais(numero: number) {
    // Converte o número para formato de moeda brasileira (BRL)
    const numeroFormatado = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(numero);

    return numeroFormatado;
}