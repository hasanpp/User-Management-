import '../styles/NotFound.css'
import NotFounded from '../assets/404.png'

const NotFound = () => {
  return (
    <div className="contbod">
      <div className="container">
        <div className="error">
          <h1>404</h1>
          <p>{`Oops! The page you're looking for doesn't exist.`}</p>
          <a href="/" className="btn">Go Home</a>
        </div>
        <div className="animation">
          <img src={NotFounded} alt="404 illustration" />
        </div>
      </div>
    </div>
  )
}

export default NotFound