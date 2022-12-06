import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const BagDetails = () => {
    const {bagId} = useParams()
    const [bag, updateBag] = useState({})

    useEffect(
        () => {
            fetch(`http://localhost:8088/bags/1`)
        }
    )
}