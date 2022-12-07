import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ItemList } from "./ItemList"

export const ItemDetails = () => {
    const {itemId, bagId} = useParams()
    const [item, updateItem] = useState({})
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/items?id=${itemId}&_expand=type`)
                .then(response => response.json())
                .then((data) => {
                    const singleItem = data[0]
                    updateItem(singleItem)
                })
        },
        [itemId]
    )
    return <>
    <section className="item_details">
        <h2 className="item_header">{item.name}</h2>
        <section className="item_buttons">
            <button onClick={() => navigate(`/bags/${bagId}/${itemId}/itemEdit`)}>Edit Item</button>
            <button onClick={() => {
                fetch(`http://localhost:8088/items/${item.id}`, {
                    method: "DELETE"
                })
                    .then (() => {
                        navigate(`/bags/${bagId}`)
                    })
            }} className="item_delete">Delete Item</button>
        </section>
        <section className="details">
            <div className="detail">Weight: {item.weight}</div>
            <div className="detail">Type: {item?.type?.name}</div>
            <div className="detail">Description: {item.description}</div>
        </section>
    </section>
    </>
}