// Label + input (or select / textarea) with an optional hint.
export default function FormField({ label, name, as = "input", hint, children, ...props }) {
  const id = `f-${name}`
  const Tag = as
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <Tag id={id} name={name} {...props}>{children}</Tag>
      {hint && <p className="field__hint">{hint}</p>}
    </div>
  )
}
