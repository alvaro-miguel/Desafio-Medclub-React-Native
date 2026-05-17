 
export const validarData = (valorDia:string) => {
    const apenasNumeros = valorDia.replace(/\D/g, "");

    if(apenasNumeros.length < 8){
        return true
    }

    const dia = parseInt(apenasNumeros.slice(0,2));
    const mes = parseInt(apenasNumeros.slice(2,4));
    const ano = parseInt(apenasNumeros.slice(4,8));

    const diasNoMes = [31, (ano % 4 === 0 && (ano % 100 !== 0 || ano % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const formatoValido = mes >= 1 && mes <= 12 && dia >= 1 && dia <= diasNoMes[mes - 1];
    if (!formatoValido) return false;

    const momentoAtual = new Date();
    const dataAtual = new Date(momentoAtual.getFullYear(), momentoAtual.getMonth(), momentoAtual.getDate());
    const dataConsulta = new Date(ano, mes-1, dia);

    return dataConsulta >= dataAtual
}


export const validarHora = (valorHora:string, dataEscolhida: string) =>{
    const apenasNumeros = valorHora.replace(/\D/g, "");
    if(apenasNumeros.length < 4){
        return true;
    }

    const hh = parseInt(apenasNumeros.slice(0,2));
    const mm = parseInt(apenasNumeros.slice(2,4));

    if (hh > 23 || mm > 59) return false;

    const momentoAtual = new Date();
    const momentoAtualFormatado = `${momentoAtual.getDate().toString().padStart(2, '0')}/${(momentoAtual.getMonth() + 1).toString().padStart(2, '0')}/${momentoAtual.getFullYear()}`;

    if (dataEscolhida === momentoAtualFormatado){
        const horaAtual = momentoAtual.getHours();
        const minutoAtual = momentoAtual.getMinutes();

        if (hh < horaAtual || hh === horaAtual && mm <= minutoAtual){
            return false;
        }
    }
    return true
}