type CardProps = {
  src: string
  title: string
  description: string
  href: string
}

const HomePageCard = ({src, title, description, href} : CardProps) => {
  return (
    <div className="card card-compact w-96 m-10 bg-base-100 shadow-xl">
      <figure>
        <img src={src} alt={title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title justify-center">{title}</h2>
        <p>{description}</p>
        <div className="card-actions pt-4 justify-center">
          <a className="btn btn-primary" href={href}>Play Now</a>
        </div>
      </div>
    </div>
  )
}

export default HomePageCard