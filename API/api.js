// URLs de las APIs
const urls = {
    dolar: "https://dolarapi.com/v1/dolares/oficial",
    real: "https://dolarapi.com/v1/cotizaciones/brl",
    euro: "https://dolarapi.com/v1/cotizaciones/eur"
  };
  
  // Función para obtener los datos de las APIs y actualizar la tabla
  async function actualizarCotizaciones() {
    try {
      // Obtener los datos de las APIs
      const respuestaDolar = await fetch(urls.dolar);
      const respuestaReal = await fetch(urls.real);
      const respuestaEuro = await fetch(urls.euro);
  
      // Verificar si las respuestas fueron exitosas
      if (!respuestaDolar.ok || !respuestaReal.ok || !respuestaEuro.ok) {
        throw new Error("Error al obtener datos de las APIs");
      }
  
      // Convertir las respuestas a formato JSON
      const datosDolar = await respuestaDolar.json();
      const datosReal = await respuestaReal.json();
      const datosEuro = await respuestaEuro.json();
  
      // Función para formatear el número con dos decimales y separadores de miles
      const formatearCotizacion = (valor) => {
        return parseFloat(valor).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      };
  
      // Actualizar las celdas de la tabla con los datos de las APIs
      document.querySelector("table tbody").innerHTML = `
        <tr>
          <td>1</td>
          <td>Dólar Oficial</td>
          <td>Peso Argentino</td>
          <td>${formatearCotizacion(datosDolar.compra)}</td>
          <td>${formatearCotizacion(datosDolar.venta)}</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Real</td>
          <td>Peso Argentino</td>
          <td>${formatearCotizacion(datosReal.compra)}</td>
          <td>${formatearCotizacion(datosReal.venta)}</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Euro</td>
          <td>Peso Argentino</td>
          <td>${formatearCotizacion(datosEuro.compra)}</td>
          <td>${formatearCotizacion(datosEuro.venta)}</td>
        </tr>
      `;
  
      // Actualizar la fecha de la cotización
      const fecha = new Date().toLocaleDateString();
      document.querySelector("nav h2").textContent = `Fecha: ${fecha}`;
      
      // Actualizar la fecha y la fuente en el pie de página
      document.querySelector("#fecha-actualizacion").textContent = `Actualizado: ${fecha}`;
      document.querySelector("#fuente").textContent = `Fuente: https://dolarapi.com`;
  
    } catch (error) {
      console.error("Error al actualizar las cotizaciones:", error);
      alert("No se pudo obtener la información de las cotizaciones.");
    }
  }
  
  // Llamar a la función para actualizar las cotizaciones al cargar la página
  document.addEventListener("DOMContentLoaded", actualizarCotizaciones);

  