// Archivo principal (como si fuera el archivo main en Vite)
import { Meta, Links, Outlet, Scripts, LiveReload, useCatch, useRouteError, isRouteErrorResponse, Link } from '@remix-run/react';
import { useState, useEffect } from 'react';
import styles from './styles/index.css'
import Header from '~/components/header';
import Footer from '~/components/footer';


export function meta() {
    return [
        { charset: "utf-8" },
        { title: "GuitarLA - Remix" },
        { name: "viewport", content: "width=device-width,initial-scale=1" },
      ];
}

export function links() {
    return [
        {
            rel: 'stylesheet',
            href: 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
        },
        {
            rel: 'preconnect',
            href: 'https://fonts.googleapis.com'
        }, 
        {
            rel: 'preconnect',
            href: `https://fonts.gstatic.com`,
            crossOrigin: "true"
        },
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Outfit:wght@400;700;900&display=swap'
        },
        {
            rel: 'stylesheet',
            href: styles
        }
    ]
}

export default function App() {
    const carritoLS = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('carrito')) ?? [] : null
    const [carrito, setCarrito] = useState(carritoLS)   

    useEffect(() => {
        // localStorage es una API que se ejecuta en el navegador y no en el servidor. 
        localStorage.setItem('carrito', JSON.stringify(carrito)) // Remix recomienda que el localStorage se ejecute en la parte del navegador porque no se ejecuta en el servidor
        console.log('render')
    }, [carrito]) // localStorage solo puede almacenar un tipo de datos (string)

    const agregarCarrito = guitarra => {
        if (carrito.some(guitarraState => guitarraState.id === guitarra.id)) {
            // Iterar sobre el arreglo e identificar el elemento duplicado
            const carritoActualizado = carrito.map(guitarraState => {
                if (guitarraState.id === guitarra.id) {
                    // Reescribir la cantidad
                    guitarraState.cantidad = guitarra.cantidad
                    // guitarraState.cantidad += guitarra.cantidad de la cantidad que ya había, le va a sumar la cantidad nueva
                }
                return guitarraState
            })
            // Añadir al carrito
            setCarrito(carritoActualizado)
        } else {
            // Registro nuevo, agregar al carrito
            setCarrito([...carrito, guitarra])
        }
    }

    const actualizarCantidad = guitarra => {
        const carritoActualizado = carrito.map(guitarraState => {
            if (guitarraState.id === guitarra.id) {
                guitarraState.cantidad = guitarra.cantidad
            }
            return guitarraState
        })
        setCarrito(carritoActualizado)
    }

    const eliminarGuitarra = id => {
        const carritoActualizado = carrito.filter(guitarraState => guitarraState.id !== id)
        setCarrito(carritoActualizado)
    }

    return(
        <Document>
            <Outlet /* Nosotros atamos nuestro código (funciones, strings, valores numéricos, etc.) al context del Outlet */
            /* Tenemos un estado global de nuestra aplicación y no local de cada componente */
                context={{ 
                    agregarCarrito,
                    carrito,
                    actualizarCantidad,
                    eliminarGuitarra
                }}
            />
        </Document>
    )
}

function Document({children}) {
    return(
        <html lang="es">
            <head>
               <Meta />
               <Links />
            </head>
            <body>
                <Header />
                {children}
                <Footer />

                <Scripts />
                <LiveReload />

            </body>
        </html>
    )
}

/** Manejo de errores en Remix **/
export function ErrorBoundary() {
    const error = useRouteError() // para acceder al error, tiene que usar useRouteError
    if (isRouteErrorResponse(error)) {
        return (
            <Document>
                <p className='error'>{error.status} {error.statusText}</p>
                <Link className='error-enlace' to="/">Tal vez quieras volver a la página principal</Link>
            </Document>
        )
        
    }
}