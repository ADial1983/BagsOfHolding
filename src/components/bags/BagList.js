import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Bags.css"

export const BagList = () => {
    const [bags, setBags] = useState([])
    const [filteredBags, setFilteredBags] = useState([])

    const localBagsUser = localStorage.getItem("bags_user")

    const bagsUserObject = JSON.parse(localBagsUser)

    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/bags`)
                .then(response => response.json())
                .then((bagsArray) => {
                    setBags(bagsArray)
                })
        },
        []
    )

    useEffect(
        () => {
            const myBags = bags.filter(bag => bag.userId === bagsUserObject.id)
            setFilteredBags(myBags)
        },
        [bags]
    )

    return <>
        <button onClick={() => navigate("/bag/create")}>Add Bag</button>
        <h2>My Bags</h2>

        <article className="bags">
            {
                filteredBags.map(
                    bag => {
                        return <section className="bag">
                            <header>{bag.name}</header>
                            <div>Max Bag Weight: {bag.maxWeight}</div>
                            <button onClick={() => navigate(`/bags/${bag.id}`)}>Open Bag</button>
                        </section>
                    }
                )
            }
        </article>
    </>
}