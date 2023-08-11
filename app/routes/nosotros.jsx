import imagen from '../../public/img/nosotros.jpg'
import styles from '~/styles/nosotros.css'
import { useOutletContext } from '@remix-run/react';

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles
    },
    {
      rel: 'preload',
      href: imagen,
      as: 'image'
    }
  ]
}

export function meta() {
  return [
    {title: 'GuitarLA - Sobre Nosotros'},
    {description: 'Venta de guitarras, blog de música'}
  ]
}

function Nosotros() {
  return (
    <main className="contenedor nosotros">
      <h2 className="heading">Nosotros</h2>

      <div className="contenido">
        <img src={imagen} alt="imagen nosotros" />

        <div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem sint, nesciunt numquam ad voluptates ipsum, cum, delectus mollitia optio necessitatibus expedita quam facilis est sunt tempora culpa in voluptas perferendis.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem sint, nesciunt numquam ad voluptates ipsum, cum, delectus mollitia optio necessitatibus expedita quam facilis est sunt tempora culpa in voluptas perferendis.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem sint, nesciunt numquam ad voluptates ipsum, cum, delectus mollitia optio necessitatibus expedita quam facilis est sunt tempora culpa in voluptas perferendis.</p>
        </div>
      </div>
    </main>
  )
}

export default Nosotros
