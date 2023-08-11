import { useLoaderData} from '@remix-run/react'; // Outlet nos permite inyectar contenido en otro componente
import { getGuitarras } from '~/models/guitarras.server';
import ListadoGuitarras from '../components/listado-guitarras';

export function meta() {
  return [
    { title: 'GuitarLA - Tienda de Guitarras' },
    {description: 'Nuestra colección de guitarras'}
  ];
}

export async function loader() {
  const guitarras = await getGuitarras();
  return guitarras.data;
}

function Tienda() {
  const guitarras = useLoaderData();
  return (
    <ListadoGuitarras
    guitarras = {guitarras}
      />




  );
}

export default Tienda;

