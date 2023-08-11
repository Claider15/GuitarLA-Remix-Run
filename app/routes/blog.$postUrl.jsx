import { useLoaderData } from '@remix-run/react'
import {getPost} from '~/models/posts.server'
import {formatearFecha} from '~/utils/helpers'

export async function loader({params}) {
    const {postUrl} = params
    const post = await getPost(postUrl)
    // console.log(post.data[0].attributes)
    if (post.data.length === 0) {
        throw new Response('', {
            status: 404,
            statusText: 'Entrada No Encontrada'
        })
    }

    return post
}

export function meta({data}) {
    if (!data) {
        return [
          {title: `GuitarLA - Entrada No Encontrada`},
          {description: `Guitarras, venta de guitarras, 'Entrada No Encontrada`}
        ] 
    }

    const titulo = data.data[0].attributes.titulo
    return [
        {title: `GuitarLA - ${titulo}`},
        {description: `Guitarras, venta de guitarras, 'Entrada ${titulo}`}
    ]
}

function Post() {
    const post = useLoaderData()
    const {titulo, contenido, imagen, publishedAt} = post.data[0].attributes
    const fechaNueva = formatearFecha(publishedAt)
  return (
    <article className='post mt-3'>
      <img src={imagen.data.attributes.url} alt={`imagen blog ${titulo}`} />
      <div className="contenido">
        <h3>{titulo}</h3>
        <p className="fecha">{fechaNueva}</p>
        <p className="texto">{contenido}</p>
      </div>
    </article>
  )
}

export default Post
