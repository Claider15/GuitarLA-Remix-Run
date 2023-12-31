import Guitarra from '~/components/guitarra'

function ListadoGuitarras({guitarras}) {
  return (
    <>
      <h2 className='heading'>Nuestra Colección</h2>

        {guitarras.length > 0 && (
        <div className='guitarras-grid'>
            {guitarras.map(guitarra => (
            <Guitarra
                key={guitarra.id}
                guitarra={guitarra.attributes}
            />
            ))}
        </div>
        )}
    </>
  )
}

export default ListadoGuitarras
