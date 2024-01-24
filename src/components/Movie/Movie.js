const Movie = ({title, releaseDate, image, overview}) => {
  return (
    <div>
      <h1>{title}</h1>
      <img src={image} rel={title} />
      <p>Release Date: {releaseDate}</p>
      <p>{overview}</p>
    </div>
  )
}

export default Movie
