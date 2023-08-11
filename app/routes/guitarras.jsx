import {Outlet, useOutletContext} from '@remix-run/react'; // Outlet nos permite inyectar contenido en otro componente
import styles from '~/styles/guitarras.css'

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles  
    }
  ]
}


function Tienda() {
  return (
    <main className='contenedor'>

      <Outlet 
        context={useOutletContext()} // El archivo guitarras es el archivo principal para las rutas anidadas ($guitarraUrl) por lo que debes usar otra vez context={} para crear un puente con root. El context solo está disponible en el primer nivel de hijos
      /> {/* Nested routes - Remix hace que en este Outlet se inyecte el contenido de la ruta dinámica (guitarras.$guitarraUrl.jsx) */}
    </main>
  );
}

export default Tienda;

