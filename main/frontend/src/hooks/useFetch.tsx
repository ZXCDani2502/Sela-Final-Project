import { useState, useEffect } from "react"
import axios from "axios"

const useFetch = (url: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [hasError, setHasError] = useState<any | null>(null)
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    axios.get(url).then((res) => {
        setData(res.data)
    })
    .catch((err) => {
        setHasError(err.message)
    })
    .finally(() => {
        setIsLoading(false)
    })
  }, [])
  
  return {isLoading, hasError, data}
}

export default useFetch