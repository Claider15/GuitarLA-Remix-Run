import { Outlet } from "@remix-run/react"
import styles from "~/styles/blog.css"

export function links() { // la función links se pasa tanto a blog.$postUrl como a blog._index.jsx por NESTED ROUTES
  return [
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
}

function Blog() {
  return (
    <main className="contenedor">
      <Outlet />
    </main>
  )
}

export default Blog
