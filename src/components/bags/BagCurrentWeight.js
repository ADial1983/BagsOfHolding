import { useState, useEffect } from "react"

export const BagCurrentWeight = ({bagId}) => {
    const [items, setItems] = useState([])
    

    useEffect(
        () => {
            fetch(`http://localhost:8088/items?bagId=${bagId}`)
                .then(response => response.json())
                .then((itemsArray) => {
                    setItems(itemsArray)
                })
        },
        []
    )

    const sum = items.reduce((accumulator, item) => {
        return accumulator + item.weight;
        }, 0);

    return <div className="currency_piece">Current Weight: {sum}</div>
}