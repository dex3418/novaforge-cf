export default function TeamCard({ name, role, bio, photo, social }) {
  return (
    <article className="member panel">
      {photo ? (
        <img className="member__photo" src={photo} alt={name} loading="lazy" />
      ) : (
        <div className="member__photo member__photo--empty" aria-hidden="true">{name.charAt(0)}</div>
      )}
      <h3 className="member__name">{name}</h3>
      {role && <p className="member__role">{role}</p>}
      {bio && <p className="member__bio">{bio}</p>}
      {social && <a className="member__link" href={social} target="_blank" rel="noreferrer">Profile</a>}
    </article>
  )
}
