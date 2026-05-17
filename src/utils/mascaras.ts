
export const mascaraData = (texto: string) => {
    let valorData = texto.replace(/\D/g, "");

    if(valorData.length >= 2){
        let dia = parseInt(valorData.substring(0,2));
        if(dia > 31){
            dia = 31;
        }

        valorData = dia.toString().padStart(2, '0') + valorData.substring(2);
    }

    if(valorData.length >= 4){
        let mes = parseInt(valorData.substring(2,4));
        if(mes > 12){
            mes = 12;
        }
        valorData = valorData.substring(0,2) + mes.toString().padStart(2, '0') + valorData.substring(4);
    }


    if(valorData.length > 2 && valorData.length <= 4){
        valorData = `${valorData.substring(0,2)}/${valorData.substring(2)}`;
    } else if(valorData.length > 4){
        valorData = `${valorData.substring(0,2)}/${valorData.substring(2,4)}/${valorData.substring(4,8)}`
    }

    return valorData;
};


export const mascaraHora = (texto: string) =>{
    let valorHora = texto.replace(/\D/g, "");

    if(valorHora.length >= 2){
        let hh = parseInt(valorHora.substring(0,2));
        if(hh > 23){
            hh = 23;
        }

        valorHora = hh.toString().padStart(2, '0') + valorHora.substring(2);
    }

    if(valorHora.length >= 4){
        let mm = parseInt(valorHora.substring(2,4));
        if(mm > 59){
            mm = 59
        }

        valorHora = valorHora.substring(0,2) + mm.toString().padStart(2, '0');
    }

    if(valorHora.length > 2){
        valorHora = `${valorHora.substring(0,2)}:${valorHora.substring(2,4)}`;
    }

    return valorHora
}