import { useNavigate } from "react-router"

const LogoutPage = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full bg-base-100">
      <h2>We hope to see you again soon!</h2>
      {setTimeout(() => {
        navigate('/')
      }, 3000)}
    </div>
  )
}

export default LogoutPage