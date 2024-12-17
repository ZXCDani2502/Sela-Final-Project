import { useState, useEffect } from "react"
import axios from "axios"

const useFetch = (url) => {
  const [isLoding, setIsLoding] = useState(true)
  const [hasError, setHasError] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    axios.get(url).then((res) => {
        setData(res.data)
    })
    .catch((err) => {
        setHasError(err.message)
    })
    .finally(() => {
        setIsLoding(false)
    })
  }, [])
  
  return {isLoding, hasError, data}
}

export default useFetch