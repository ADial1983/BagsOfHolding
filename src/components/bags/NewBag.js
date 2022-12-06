import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const NewBag = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [bag, update] = useState({
        name: "",
        maxWeight: 0,
        copper: 0,
        silver: 0,
        electrum: 0,
        gold: 0,
        platinum: 0
    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */
   const navigate = useNavigate()

    const localBagsUser = localStorage.getItem("bags_user")
    const bagsUserObject = JSON.parse(localBagsUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        console.log("You clicked the button.")
        // TODO: Create the object to be saved to the API
        const bagToSendToAPI = {
            userId: bagsUserObject.id,
            name: bag.name,
            maxWeight: bag.maxWeight,
            copper: bag.copper,
            silver: bag.silver,
            electrum: bag.electrum,
            gold: bag.gold,
            platinum: bag.platinum
        }

        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/bags`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bagToSendToAPI)
        })
        .then(response => response.json())
        .then(() => {
            navigate("/bags")
        })
    }

    return (
        <form className="bagForm">
            <h2 className="bagForm__title">New Bag</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Name your Bag"
                        value={bag.name}
                        onChange={
                            (evt) => {
                                const copy = {...bag}
                                copy.name = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maxWeight">Max Bag Weight:</label>
                    <input type="number"
                        className="form-control"
                        value={bag.maxWeight}
                        onChange={
                            (evt) => {
                                const copy = {...bag}
                                copy.maxWeight = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="copper">Copper:</label>
                    <input type="number"
                        className="form-control"
                        value={bag.copper}
                        onChange={
                            (evt) => {
                                const copy = {...bag}
                                copy.copper = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="silver">Silver:</label>
                    <input type="number"
                        className="form-control"
                        value={bag.silver}
                        onChange={
                            (evt) => {
                                const copy = {...bag}
                                copy.silver = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="electrum">Electrum:</label>
                    <input type="number"
                        className="form-control"
                        value={bag.electrum}
                        onChange={
                            (evt) => {
                                const copy = {...bag}
                                copy.electrum = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gold">Gold:</label>
                    <input type="number"
                        className="form-control"
                        value={bag.gold}
                        onChange={
                            (evt) => {
                                const copy = {...bag}
                                copy.gold = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="platinum">Platinum:</label>
                    <input type="number"
                        className="form-control"
                        value={bag.platinum}
                        onChange={
                            (evt) => {
                                const copy = {...bag}
                                copy.platinum = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button 
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Add New Bag
            </button>
        </form>
    )
}