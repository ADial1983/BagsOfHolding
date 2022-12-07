import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Bags.css"

export const ItemList = ({bagId}) => {
    const [items, setItems] = useState([])

    const localBagsUser = localStorage.getItem("bags_user")

    const bagsUserObject = JSON.parse(localBagsUser)

    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/items?bagId=${bagId}&_expand=type`)
                .then(response => response.json())
                .then((itemsArray) => {
                    setItems(itemsArray)
                })
        },
        []
    )

    

    return <article className="items">
            {
                items.map(
                    item => {
                        return <section className="item">
                            <header>{item.name}</header>
                            <div>Weight: {item.weight}</div>
                            <div>Type: {item?.type?.name}</div>
                            <button onClick={() => navigate(`/bags/${bagId}/${item.id}`)}>View Item Details</button>
                        </section>
                    }
                )
            }
        </article>
}