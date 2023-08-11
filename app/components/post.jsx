import { Link } from "@remix-run/react"
import {formatearFecha} from '~/utils/helpers'

function Post({post}) {
    const {titulo, contenido, imagen, url, publishedAt} = post.attributes
    const fechaNueva = formatearFecha(publishedAt)

  return (
    <article className="post">
      <img src={imagen.data.attributes.formats.small.url} alt={`imagen blog ${titulo}`} />
      <div className="contenido">
        <h3>{titulo}</h3>
        <p className="fecha">{fechaNueva}</p>
        <p className="resumen">{contenido}</p>
        <Link className="enlace" to={`/blog/${url}`}>Leer Post</Link>
      </div>
    </article>
  )
}

export default Post
