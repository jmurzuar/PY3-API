import config from './licencia.js';
import { callAPI, } from "./fetch.js"
import { formatToDDMMYYYY, formatToDDMM, numberFormatter , numberFormatterInt, timestamp_fecha, time_string, showClocks, determinarDiaNoche } from "./funciones.js"

let cards = [];

// Accede a la clave API
const apiKey = config.apiKey;

let lon
let lat

let temperaturaValor = document.getElementById('temperatura-valor')
let temperaturaDescripcion = document.getElementById('temperatura-descripcion')

let ubicacion = document.getElementById('ubicacion')
let iconoAnimado = document.getElementById('icono')

let vientoVelocidad = document.getElementById('viento-velocidad')


window.addEventListener('load', () => {


  if (navigator.geolocation) {
    
    navigator.geolocation.getCurrentPosition(posicion => {



      //lon = posicion.coords.longitude
      //lat = posicion.coords.latitude

      // Santiago
      lon = -70.64827
      lat = -33.45694 

      

       
      //getDataNow_city(-72.9447, -41.4698); //Puerto Montt
      //getDataNow_city(-70.318055555556, -18.477777777778,8); //Arica
      //getDataNow_city(-70.398055555556, -23.646388888889); // Antofagasta
      //getDataNow_city(-71.252, -29.9027, 7); // Puerto Mont 
      //getDataNow_city(-84.0966,9.9956,6); // Punta Arenas

  

      // const url = `https://api.openweathermap.org/data/2.5/weather?lang=es&units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`;
      // //const response = await callAPI(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
      // fetch(url)
      //   .then(response => { return response.json() })
      //   .then(data => {


      //     //console.log(data);



      //     let temp = Math.round(data.main.temp)
      //     //console.log(temp)
      //     temperaturaValor.textContent = `${temp} ° C`

      //     //console.log(data.weather[0].description)
      //     let desc = data.weather[0].description
      //     temperaturaDescripcion.textContent = desc.toUpperCase()
      //     ubicacion.textContent = data.name

      //     vientoVelocidad.textContent = `Veloc. viento: ${data.wind.speed} m/s`
      //     // const iconCode = data.weather[0].icon
      //     //para iconos estáticos
      //     // const urlIcon = `http://openweathermap.org/img/wn/${iconCode}.png`
      //     // icono.src = urlIcon
      //     // icono.src='animated/day.svg'
      //     // console.log(data.weather[0].icon)
      //   })
    })
  }
  else {
    //ubicación por ciudad


    //console.log(url)
    //console.log('no autorizado')
  }
}
);



const getDataNow_city = async (lon1, lat1, order) => {
  try {
    const response = await callAPI(`https://api.openweathermap.org/data/2.5/weather?lang=es&units=metric&lat=${lat1}&lon=${lon1}&appid=${apiKey}`);
    //console.log('Api original: ', response)
    const rates = response.main;

    //console.log(rates)
    //console.log(`https://api.openweathermap.org/data/2.5/weather?lang=es&units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`)

    const temp = rates.temp;
    const ciudad = response.name;
    let cielo = response.weather[0].description;
    const viento = response.wind.speed;
    const ordenar_num = ''+`${order}`+'';
    
    // console.log(cielo);

    const arrayTexto = ['algo de nubes', 'cielo claro', 'humo', 'llovizna ligera', 'lluvia', 'lluvia ligera', 'lluvia moderada', 'muy nuboso', 'niebla', 'nubes', 'nubes dispersas', 'tormentas'];

    // Texto que deseas buscar
    const textoABuscar = "" + cielo + "";

    // Verificar si el texto está presente en el array
    const estaPresente = arrayTexto.includes(textoABuscar);

    // Asignar un valor predeterminado si el elemento no se encuentra
    const valorPredeterminado = estaPresente ? textoABuscar : "weather";


    //console.log(valorPredeterminado);
    cielo = valorPredeterminado;
    

    console.log(ciudad, ' - ', temp);

  
    var nuevoRegistro = { ciudad: ""+ ciudad +"", temp: ""+ temp+"", cielo: ""+ cielo +"", viento: ""+ viento +"" , ordenar: ""+ ordenar_num +"" };

    const indice = cards.findIndex(item => item.ciudad === ciudad);
    if (indice !== -1) {
        cards.splice(indice, 1);
    }
    
    cards.push(nuevoRegistro);

    function compararNumeros(a, b) {
      return a.ordenar - b.ordenar;
    }
  
    cards.sort(compararNumeros);
  
    //console.log(cards);

    renderCards();

  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }

};












// Bitcoin actual
let values = [];
let dates = [];

const backgroundRedColor = "rgba(255, 99, 132, 0.2)";
const backgroundOrangeColor = "rgba(255, 159, 64, 0.2)";

const borderRedColor = "rgb(255, 99, 132)";
const borderOrangeColor = "rgb(255, 159, 64)";



const getDataNow = async () => {
  try {
    const response = await callAPI('https://api.coincap.io/v2/rates/bitcoin');
    const rates = response.data;

    let values2 = rates.id;
    let values3 = rates.rateUsd;
    let values4 = response.timestamp;
    let values5 = timestamp_fecha(response.timestamp);


    //console.log('prueba: ', values2 + ' - ' + values3 + ' - ' + values3 + ' - ' + values4 + ' - ' + values5)

    document.getElementById("BTC").innerHTML = 'El valor actual de BITCOIN es UDS: ' + numberFormatter.format(values3);
    document.getElementById("BTC2").innerHTML = 'El valor actual de BITCOIN es UDS: ' + numberFormatter.format(values3);
    document.getElementById("BTC3").innerHTML = 'El valor actual de BITCOIN es UDS: ' + numberFormatter.format(values3);

  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }

};

// Bitcoin histórico

const getData = async () => {
  try {
    const response = await callAPI('https://api.coincap.io/v2/assets/bitcoin/history?interval=d1');
    const historical = response.data;

    if (!Array.isArray(historical)) {
      throw new Error('Data is not an array');
    }

    //console.log('arreglo original: ', historical);

    values = (historical.map(history => history.priceUsd)).slice(-30);
    dates = (historical.map(history => formatToDDMM(history.date))).slice(-30);

    //console.log('arreglo valores: ', values);
    //console.log('arreglo fechas: ', dates);


  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }


  const ctx = document.getElementById('myChart');
  const ctx2 = document.getElementById('myChart2');



  new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [{
        label: 'Value Bitcoin',
        data: values,
        borderWidth: 1
      }]
    },
    options: {

    
      scales: {
        y: {
          beginAtZero: false, 
          title: {
          display: true,
          text: "USD dollar"
          }
        }
      }
    }

  });


  // new Chart(ctx2, {
  //   type: 'line',
  //   data: {
  //     labels: dates,
  //     datasets: [{
  //       label: 'Value Bitcoin',
  //       data: values,
  //       borderWidth: 1
  //     }]
  //   },
  //   options: {
  //     scales: {
  //       y: {
  //         beginAtZero: false
  //       }
  //     }
  //   }



  // });

};


// Ethereum

const getData_ethereum = async () => {
  try {
    const response = await callAPI('https://api.coincap.io/v2/assets/ethereum/history?interval=d1');
    const historical = response.data;

    if (!Array.isArray(historical)) {
      throw new Error('Data is not an array');
    }

    //console.log('arreglo original: ', historical);

    values = (historical.map(history => history.priceUsd)).slice(-30);
    dates = (historical.map(history => formatToDDMM(history.date))).slice(-30);

    //console.log('arreglo valores: ', values);
    //console.log('arreglo fechas: ', dates);


  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }


  
  const ctx2 = document.getElementById('myChart2');
  let delayed;

  new Chart(ctx2, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [{
        label: 'Value Ethereum',
        data: values,
        borderWidth: 1
      }]
    },
    options: {

      animation: {
        onComplete: () => {
          delayed = true;
        },
        delay: (context) => {
          let delay = 0;
          if (context.type === 'data' && context.mode === 'default' && !delayed) {
            delay = context.dataIndex * 300 + context.datasetIndex * 100;
          }
          return delay;
        },
      },

      scales: {
        y: {
          beginAtZero: false, 
          title: {
          display: true,
          text: "USD dollar"
          }
          
        }
      }
    }



  });

};



const getData_rates = async () => {
  try {
    const response = await callAPI('https://api.coincap.io/v2/rates');
    const rates = response.data;

    let values2 = rates;
    
    
    //console.log('probando: ', values2)
    const mapppp = rates.map(rate => rate.id).slice(0, 12);
   
    let desarrolladores = rates.filter(miembro => miembro.id == 'bitcoin')
    let rateUsd = desarrolladores.map(miembro2 => miembro2.rateUsd)
    //console.log(rateUsd);

  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }

};


// const actualizarCada10Segundos = () => {
//   //getData();
//   //getDataNow();
//   //getData_ethereum();
//   getData_rates();

//   //console.log('Código actualizado');

//   // Puedes poner aquí el código que deseas ejecutar cada 10 segundos
// };

showClocks();







const getDataChile = async () => {

  fetch('https://mindicador.cl/api').then(function (response) {
    return response.json();
  }).then(function (dailyIndicators) {
    document.getElementById("fecha_indicadores").innerHTML = '&nbsp;&nbsp;&nbsp;INDICADORES ECONÓMICOS '+ formatToDDMMYYYY(dailyIndicators.fecha) + '&nbsp;&nbsp;&nbsp;';
    document.getElementById("UF").innerHTML = '$ ' + numberFormatterInt.format(dailyIndicators.uf.valor);
    document.getElementById("Dolar").innerHTML = '$ ' + numberFormatterInt.format(dailyIndicators.dolar.valor);
    document.getElementById("IPC").innerHTML = numberFormatter.format(dailyIndicators.ipc.valor) + '%';
    document.getElementById("EURO").innerHTML = '$ ' + numberFormatterInt.format(dailyIndicators.euro.valor);

  }).catch(function (error) {
    console.log('Requestfailed', error);
  });
};

getDataChile();

// // Ejecutar la función inicialmente
// actualizarCada10Segundos();

// // Configurar la actualización cada 10 segundos
// const intervalId = setInterval(actualizarCada10Segundos, 1000000);


const getDataUF = async () => {
  try {
    const response = await callAPI(`https://www.mindicador.cl/api/ipc`);
    //console.log('Api original: ', response)
    const rates = response.serie;
    //console.log('Api nivel 2: ', rates)
    
    const values99 = rates.map(rate => rate.valor).slice(0, 12);

    //console.log('Api nivel 3: ', values99)

    // Sumar los valores
    const sumaValores = values99.reduce((acc, valor) => acc + valor, 0);

    //console.log('Suma de valores: ', sumaValores);
    


  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }

};

getDataUF();



const getData_HistoryCL = async (val, type) => {
  try {
    const response = await callAPI(`https://www.mindicador.cl/api/${val}`);
    const historical = response.serie;

    //console.log('arreglo valores222: ', `${val}`);

    if (!Array.isArray(historical)) {
      throw new Error('Data is not an array');
    }

    //console.log('arreglo original: ', historical);

    values = (historical.map(history => history.valor)).slice(0, 12).reverse();
    dates = (historical.map(history => formatToDDMMYYYY(history.fecha))).slice(0, 12).reverse();
    
    //var nuevoRegistro = { moneda: ""+`${val}`+"", value: ""+values[0]+"", value2: ""+dates[0]+"" };

    //cards.push(nuevoRegistro);
    
    //console.log('carga de valores a tarjetas: ',cards)

    //renderCards();

    

  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }


  
  const ctx22= document.getElementById(`myChart_${val}`);
  let delayed;

  let chart = Chart.getChart(ctx22);

  // Si hay un gráfico asociado con el canvas, destrúyelo
  if (chart) {
    chart.destroy();
  }

  new Chart(ctx22, {
    type: `${type}`,
    data: {
      labels: dates,
      datasets: [{
        label: `${val}`.toUpperCase(),
        data: values,
        borderWidth: 1
      }]
    },
    options: {
    
      animation: {
        onComplete: () => {
          delayed = true;
        },
        delay: (context) => {
          let delay = 0;
          if (context.type === 'data' && context.mode === 'default' && !delayed) {
            delay = context.dataIndex * 2000 + context.datasetIndex * 1;
          }
          return delay;
        },
      },

     
      scales: {
        x: {
    
          display: false // Oculta las etiquetas del eje X
      },
        y: {
          beginAtZero: false,
          display: false,
                 
        }
      },

    

      plugins: {
        legend: {
            display: false,
            labels: {
                color: 'rgb(255, 99, 132)'
            }
        }
    }

      
      
    }



  });

};




const getDataNowCoin = async (val) => {
  try {
    const response = await callAPI(`https://api.coincap.io/v2/rates/${val}`);
    const rates = response.data;

    let coin = `${val}`;
    let values2 = rates.id;
    let values3 = rates.rateUsd;
    let values4 = response.timestamp;
    let values5 = timestamp_fecha(response.timestamp);

    //console.log('valor ', coin, ' es: ', values3)
    //console.log('prueba: ', values2 + ' - ' + values3 + ' - ' + values3 + ' - ' + values4 + ' - ' + values5)

    //document.getElementById("BTC").innerHTML = 'El valor actual de BITCOIN es UDS: ' + numberFormatter.format(values3);

  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }

};

//getDataNowCoin('bitcoin');
//getDataNowCoin('ethereum');


function renderCards() {
  const cardContainer = document.getElementById('cardContainer');

 

  cardContainer.innerHTML = '';

  // Ejemplo de uso
  const momentoDelDia = determinarDiaNoche();


 

  cards.forEach(card => {

    //console.log(`${card.cielo} `+momentoDelDia+`.svg`);


 
    
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    //cardElement.style.backgroundImage = `url('animated/day.svg')`;
    cardElement.innerHTML = `
      <p class="titulo1">${card.ciudad}</p>
      <p class="titulo2">${card.temp} °C</p>
      <p class="titulo3">${card.cielo}</p>
      <p class="titulo4">viento  ${card.viento} m/s</p>
      <img src="animated/${card.cielo} ${momentoDelDia}.svg" class="imagen-flotante" alt="Imagen flotante a la derecha">
      
      </div>
    `;
    cardContainer.appendChild(cardElement);
   });

}


const getData_MiIndicador = async () => {
  try {
    const response = await callAPI('https://www.mindicador.cl/api/');
    const { uf, dolar, euro } = response;
    const historical_0 = uf;
    const historical_1 = dolar;
    const historical_2 = euro;


    console.log('MiIndicador: ', response);

    var nuevoRegistro = [
      { moneda: ""+historical_0.codigo+"", value: ""+historical_0.valor+"", value2: ""+formatToDDMMYYYY(historical_0.fecha)+"" },
      { moneda: ""+historical_1.codigo+"", value: ""+historical_1.valor+"", value2: ""+formatToDDMMYYYY(historical_1.fecha)+"" },
      { moneda: ""+historical_2.codigo+"", value: ""+historical_2.valor+"", value2: ""+formatToDDMMYYYY(historical_2.fecha)+"" }
    ];
      cards.push(...nuevoRegistro);

    //console.log('MiIndicador: ', nuevoRegistro);

    renderCards();

    
    


  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }

}

//getData_MiIndicador();


const getData_weather = async () => {

  try {
    const response = await callAPI('https://api.openweathermap.org/data/2.5/forecast?lang=es&units=metric&lat=-34.4345789&lon=-71.0838467&appid=ab075b504cf24be625cbe2ac5a63ae59');
    const rates = response.list;
    
    //console.log('Datos del clima: ', response);

    const datos = rates.slice(0, 6).map(rate => ({
      fecha: rate.dt_txt,
      temperatura: rate.main.temp,
      velocidadViento: rate.wind.speed
    }));

    

    //cards.push(...datos);
    //renderCards();

  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }

}

getData_weather();


const getData_moneyE = async (val, graph) => {
  try {
    const response = await callAPI(`https://api.coincap.io/v2/assets/${val}/history?interval=d1`);
    const historical = response.data;

    if (!Array.isArray(historical)) {
      throw new Error('Data is not an array');
    }

    //console.log('arreglo original: ', historical);

    values = (historical.map(history => history.priceUsd)).slice(-30);
    dates = (historical.map(history => formatToDDMM(history.date))).slice(-30);


  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }


  
  const ctx2 = document.getElementById(`${graph}`);
  let delayed;

  let chart = Chart.getChart(ctx2);

  // Si hay un gráfico asociado con el canvas, destrúyelo
  if (chart) {
    chart.destroy();
  }

  new Chart(ctx2, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [{
        label: `${val}`,
        data: values,
        borderWidth: 1
      }]
    },
    options: {

      animation: {
        onComplete: () => {
          delayed = true;
        },
        delay: (context) => {
          let delay = 0;
          if (context.type === 'data' && context.mode === 'default' && !delayed) {
            delay = context.dataIndex * 300 + context.datasetIndex * 100;
          }
          return delay;
        },
      },

      scales: {
        y: {
          beginAtZero: false, 
          title: {
          display: true,
          text: "USD dollar"
          }
          
        }
      }
    }



  });

};





const getDataNow_moneyE = async (val, element) => {
  try {
    const response = await callAPI(`https://api.coincap.io/v2/rates/${val}`);
    const rates = response.data;

    //console.log(response.timestamp);

    let values2 = rates.id;
    let values3 = rates.rateUsd;
    let values4 = response.timestamp;
    let values5 = timestamp_fecha(response.timestamp);

    //console.log(values3);
    let money = `${val}`.toUpperCase();
    document.getElementById(`${element}`).innerHTML = '' + money +' USD ' + numberFormatter.format(values3);
    
    document.getElementById('mon_elec').innerHTML = '&nbsp;&nbsp;&nbsp;MONEDAS ELECTRÓNICAS&nbsp;&nbsp;&nbsp;' + timestamp_fecha(response.timestamp) +'&nbsp;&nbsp;&nbsp;';

  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }

};




function actualizarCada_30_Segundos() {
  setInterval(function() {
    
    getDataNow_moneyE('bitcoin', 'BTC');
getDataNow_moneyE('ethereum', 'BTC2');

    
  }, 30000); // 30000 milisegundos = 30 segundos
}

function actualizarCada_60_Segundos() {
  setInterval(function() {
    
    getData_moneyE('bitcoin','myChart');
    getData_moneyE('ethereum','myChart2');
//getData_moneyE('dogecoin','myChart3');
    
  }, 60000); // 10000 milisegundos = 10 segundos
}

function actualizarCada_110_Segundos() {
  setInterval(function() {
    
    getData_HistoryCL('uf','bar');
getData_HistoryCL('dolar','line');
getData_HistoryCL('ipc','line');
getData_HistoryCL('euro','line');
    
  }, 110000); // 10000 milisegundos = 110 segundos
}

function actualizarCada_180_Segundos() {
  setInterval(function() {
    
    getDataNow_city(-70.6483, -33.4569, 2); // Santiago
getDataNow_city(-71.0838467, -34.4345789, 3); // San Vicente
getDataNow_city(-72.5901, -38.7399, 5); // Temuco
getDataNow_city(-71.5518, -33.0245,1); // Viña del Mar
getDataNow_city(-73.050277777778, -36.826944444444, 4); // Concepción

    
  }, 600000); // 180000 milisegundos = 180 segundos
}

// Llamar a la función para iniciar la actualización cada 10 segundos
actualizarCada_30_Segundos();
actualizarCada_60_Segundos();
actualizarCada_110_Segundos();
actualizarCada_180_Segundos();

getDataNow_moneyE('bitcoin', 'BTC');
getDataNow_moneyE('ethereum', 'BTC2');



getData_moneyE('bitcoin','myChart');
getData_moneyE('ethereum','myChart2');


getData_HistoryCL('uf','bar');
getData_HistoryCL('dolar','line');
getData_HistoryCL('ipc','line');
getData_HistoryCL('euro','line');


getDataNow_city(-70.6483, -33.4569, 2); // Santiago
getDataNow_city(-71.0838467, -34.4345789, 3); // San Vicente
getDataNow_city(-72.5901, -38.7399, 5); // Temuco
getDataNow_city(-71.5518, -33.0245,1); // Viña del Mar
getDataNow_city(-73.050277777778, -36.826944444444, 4); // Concepción





const getDataBIT= async () => {
  try {
    const response = await callAPI('https://api.coincap.io/v2/rates/bitcoin');
    const rates = response.data;
    let values3 = rates.rateUsd;
    
    return (values3);
    
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }

};


const ctx = document.getElementById('miGrafico').getContext('2d');

// Inicializar el gráfico
const miGrafico = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [], // Etiquetas de tiempo (opcional)
    datasets: [{
      label: 'Datos en tiempo real',
      data: [], // Valores de los datos
      backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color del área bajo la línea
      borderColor: 'rgba(75, 192, 192, 1)', // Color de la línea
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: false
      }
    }
  }
});




// Función para agregar un nuevo valor al gráfico cada 10 segundos
async function agregarNuevoValor() {
  try {
    // Obtener datos de la API
    const response = await fetch('https://api.coincap.io/v2/rates/bitcoin');
    const data = await response.json();
    const nuevoValor = data.data.rateUsd; // Obtener el valor específico que necesitas de la respuesta

    // Agregar el nuevo valor al conjunto de datos
    miGrafico.data.datasets[0].data.push(nuevoValor);
    
    const count_reg = miGrafico.data.datasets[0].data.length;

    //count_reg = count_reg > 10 ? 10 : count_reg;

    if (count_reg ===1) {
      document.getElementById('BTC3').innerHTML = 'BITCOIN último valor';  
    }
    else if (count_reg >10) {
      document.getElementById('BTC3').innerHTML = 'BITCOIN últimos 10 valores';
    }
    else {
      document.getElementById('BTC3').innerHTML = 'BITCOIN últimos ' + count_reg +' valores';
    }

    

    // Agregar una nueva etiqueta de tiempo (opcional)
    const ahora = new Date();
    const hora = ahora.getHours();
    const minuto = (ahora.getMinutes() < 10 ? '0' : '') + ahora.getMinutes();
    const segundo = (ahora.getSeconds() < 10 ? '0' : '') + ahora.getSeconds();
    
    const etiquetaTiempo = `${hora}:${minuto}:${segundo}`;
    miGrafico.data.labels.push(etiquetaTiempo);
    
    // Limitar el número de valores en el gráfico (opcional)
    const maximoValores = 10;
    if (miGrafico.data.datasets[0].data.length > maximoValores) {
      miGrafico.data.datasets[0].data.shift(); // Eliminar el primer valor
      miGrafico.data.labels.shift(); // Eliminar la primera etiqueta de tiempo
    }
    
    // Actualizar el gráfico
    miGrafico.update();
  } catch (error) {
    console.error('Error al obtener datos de la API:', error);
  }

  
}

// Llamar a la función para agregar un nuevo valor cada 10 segundos
setInterval(agregarNuevoValor, 10000);

agregarNuevoValor();




