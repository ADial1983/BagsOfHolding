import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ItemList } from "./ItemList"

export const BagDetails = () => {
    const { bagId } = useParams()
    const [bag, updateBag] = useState({})
    const navigate = useNavigate()
    const [itemsToDelete, setItemsToDelete] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/bags?id=${bagId}`)
                .then(response => response.json())
                .then((data) => {
                    const singleBag = data[0]
                    updateBag(singleBag)
                })
        },
        [bagId]
    )

    const handleDelete = (event) => {
        event.preventDefault()
        const theArray = []

        fetch(`http://localhost:8088/bags/${bagId}`, {
            method: "DELETE"
        })
        .then(response => response.json())
            .then(() => {
                itemsToDelete.map((currentItem) => {
                    theArray.push(
                        fetch(`http://localhost:8088/items/${currentItem.id}`, {
                            method: "DELETE"
                        })
                    )
                })
                Promise.all(theArray)
                setItemsToDelete([])
            })
            .then(() => {
                navigate(`/bags`)
            })
    }

    return <>
        <section className="bag_details">
            <h2 className="bag_header">{bag.name}</h2>
            <section className="bag_buttons">
                <button onClick={() => navigate(`/bags/${bagId}/bagEdit`)}>Edit Bag</button>
                <button onClick={() => navigate(`/bags/${bagId}/itemCreate`)}>Add Item</button>
                <button onClick={handleDelete}>Delete Bag</button>
            </section>
            <section className="currency">
                <div className="currency_piece">Max Weight: {bag.maxWeight}</div>
                <div className="currency_piece">Copper: {bag.copper}</div>
                <div className="currency_piece">Silver: {bag.silver}</div>
                <div className="currency_piece">Electrum: {bag.electrum}</div>
                <div className="currency_piece">Gold: {bag.gold}</div>
                <div className="currency_piece">Platinum: {bag.platinum}</div>
            </section>
        </section>
        <section className="item_list">
            <ItemList bagId={bagId} setItemsToDelete={setItemsToDelete} />
        </section>
    </>
}