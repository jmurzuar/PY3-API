

export const formatToDDMMYYYY = (inputDate) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}-${month}-${year}`;
};


export const formatToDDMM = (inputDate) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}-${month}`;
};

export const numberFormatter = new Intl.NumberFormat('es-CL', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

export const numberFormatterInt = new Intl.NumberFormat('es-CL', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
});

export const timestamp_fecha = (timestamp) => {
    const fecha = new Date(timestamp);

    // Obtener las partes de la fecha
    const año = fecha.getFullYear();
    const mes = fecha.getMonth() + 1; // Los meses comienzan desde 0, así que sumamos 1
    const dia = fecha.getDate();
    const hora = fecha.getHours();
    const minutos = fecha.getMinutes();
    const segundos = fecha.getSeconds();

    // Formatear la salida
    const fechaFormateada = `${dia < 10 ? '0' : ''}${dia}-${mes < 10 ? '0' : ''}${mes}- ${hora < 10 ? '0' : ''}${hora}:${minutos < 10 ? '0' : ''}${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
    return (fechaFormateada);
};

export const time_string = (timestamp) => {
    const fecha = new Date(timestamp);
    const horaLocal = fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
    return horaLocal;
  };
  


  export function showClocks() {
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const diasSemana = ["Dom.", "Lun.", "Mar.", "Mié.", "Jue.", "Vie.", "Sáb."];

    function formatTime(date) {
        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    }

    function formatDate(date) {
        return `${diasSemana[date.getDay()]} ${date.getDate().toString().padStart(2, '0')} ${meses[date.getMonth()]}`;
    }

    function updateClocks() {
        const localDate = new Date();
        const utcDate = new Date(localDate.getTime() + (4 * 60 * 60 * 1000)); // Adding 4 hours for Chile time to get UTC

        const chileTimeHTML = `
            <font size='5' face='Arial'><b><font size='1'>CHILE [CL]:&nbsp;&nbsp;</font>${formatTime(localDate)} <font size='2'>${formatDate(localDate)}</b></font>
        `;
        const utcTimeHTML = `
            <font size='5' face='Arial'><b><font size='1'>UTC/GMT:&nbsp;&nbsp;</font>${formatTime(utcDate)} <font size='2'>${formatDate(utcDate)}</b></font>
        `;

        const liveClock1Element = document.getElementById("liveclock1");
        if (liveClock1Element) {
            liveClock1Element.innerHTML = `${chileTimeHTML}<br>${utcTimeHTML}`;
        }
    }
    updateClocks(); // Update immediately
    setInterval(updateClocks, 1000); // Update every second
}


export function determinarDiaNoche() {
    const horaActual = new Date().getHours();
    let esDia;
  
    // Definir intervalos de tiempo para el día y la noche (pueden ajustarse según tus necesidades)
    const horaAmanecer = 6; // Ejemplo: 6:00 AM
    const horaAtardecer = 21; // Ejemplo: 9:00 PM
  
    // Determinar si es de día o de noche
    if (horaActual >= horaAmanecer && horaActual < horaAtardecer) {
      esDia = true;
    } else {
      esDia = false;
    }
  
    return esDia ? 'dia' : 'noche';
  }
  


