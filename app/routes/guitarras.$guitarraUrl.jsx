import { useState } from 'react';
import { useLoaderData, useOutletContext } from '@remix-run/react';
import {getGuitarra} from '~/models/guitarras.server';


export async function loader({params}) {
  const {guitarraUrl} = params

  const guitarra = await getGuitarra(guitarraUrl)
  // console.log(guitarra.data[0].attributes)

  if (guitarra.data.length === 0) {
    throw new Response('', {
      status: 404,
      statusText: 'Guitarra No Encontrada'
    })
  }

  return guitarra
}

export function meta({data}) { // data va a diponible una vez que el loader tiene inf. y la pase hacia el componente
  if (!data) {
    return [
      {title: `GuitarLA - Guitarra No Encontrada`},
      {description: `Guitarras, venta de guitarras, 'Guitarra No Encontrada`}
    ] 
  }
  
  const nombre = data.data[0].attributes.nombre
  return [
    {title: `GuitarLA - ${nombre}`},
    {description: `Guitarras, venta de guitarras, guitarra ${nombre}`}
  ]
}

function Guitarra() {
  const {agregarCarrito} = useOutletContext()
  const [cantidad, setCantidad] = useState(0)
  const guitarra = useLoaderData()
  const {nombre, descripcion, imagen, precio} = guitarra.data[0].attributes

  const handleSubmit = e => { // se ejecuta cuando se de en submit 
    e.preventDefault()

    if (cantidad < 1) {
      alert('Debes seleccionar una cantidad')
      
    }

    const guitarraSeleccionada = {
      id: guitarra.data[0].id,
      imagen: imagen.data.attributes.url,
      nombre,
      precio, // para hacer el cálculo en el carrito de compras
      cantidad // ya actualizado la cantidad cuando se de un onChange (setCantidad)
    }
    agregarCarrito(guitarraSeleccionada)
  }
  return (
    <div className='guitarra'>
      <img className='imagen' src={imagen.data.attributes.url} alt={`Imagen de la guitarra ${nombre}`} />

      <div className='contenido'>
        <h3>{nombre}</h3>
        <p className='texto'>{descripcion}</p>
        <p className='precio'>{precio}</p>

        <form onSubmit={handleSubmit} className='formulario'> {/* el formulario va a manejar un estado en el lado del cliente y no en lo va a hacer en el servidor porque vamos a almacenar la inf. en localstorage */}
          <label htmlFor="cantidad">Cantidad</label>
          <select
            onChange={e => setCantidad(parseInt(e.target.value))}
            id='cantidad'
            defaultValue=""
           >
            <option value="" disabled>-- Seleccione --</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <input type="submit" value="Agregar al Carrito" />
        </form>
      </div>
    </div>
  )
}

export default Guitarra
