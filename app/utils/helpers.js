export const formatearFecha = fecha => {
    const fechaNueva = new Date(fecha) // objeto de tipo fecha para aplicarle un toLocaleDateString (se formatea como fecha para tener acceso al método)
    
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }

    return fechaNueva.toLocaleDateString('es-ES', opciones) // la fecha se va a formatear con esas opciones en el idioma español
}