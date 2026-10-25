export default function PageHeader({ title, text }) {
  return (
    <header className="page-header">
      <h1 className="page-header__title">{title}</h1>
      {text && <p className="page-header__text">{text}</p>}
    </header>
  )
}
