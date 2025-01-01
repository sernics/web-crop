export default function Layout(
  { children } : { children: React.ReactNode }
) 
{
  return (
    <section>
    Esto Es el layout de la prueba
    {children}
  </section>
  )
}