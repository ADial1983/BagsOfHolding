import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { TypeSelect } from "./TypeSelect"

export const NewItem = () => {
    const {bagId} = useParams()
    const [types, setTypes] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/types`)
                .then(response => response.json())
                .then((typesArray) => {
                    setTypes(typesArray)
                })
        },
        []
    )
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [item, update] = useState({
        name: "",
        weight: 0,
        description: "",
        typeId: 0,
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
        const itemToSendToAPI = {
            userId: bagsUserObject.id,
            bagId: bagId,
            name: item.name,
            weight: item.weight,
            description: item.description,
            typeId: item.typeId
        }

        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/items`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(itemToSendToAPI)
        })
        .then(response => response.json())
        .then(() => {
            navigate(`/bags/${bagId}`)
        })
    }

    return (
        <form className="itemForm">
            <h2 className="itemForm__title">New Item</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Name your Item"
                        value={item.name}
                        onChange={
                            (evt) => {
                                const copy = {...item}
                                copy.name = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="weight">Item Weight:</label>
                    <input type="number"
                        className="form-control"
                        value={item.weight}
                        onChange={
                            (evt) => {
                                const copy = {...item}
                                copy.weight = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Item Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Describe your Item"
                        value={item.description}
                        onChange={
                            (evt) => {
                                const copy = {...item}
                                copy.description = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <label htmlFor="types">Item Type: </label>
                    <select onChange={
                            (evt) => {
                                const copy = {...item}
                                copy.typeId = parseInt(evt.target.value)
                                update(copy)
                            }
                        }>
                        {types.map((type) => <TypeSelect key={`${type.id}`}type={type}/>)}
                    </select>
            </fieldset>
            <button 
                onClick={(clickEvent) => {if (item.typeId === 0) {
                    // Duplicate email. No good.
                    window.alert("You must select an item type.")
                }
                else {
                    // Good email, create user.
                    handleSaveButtonClick(clickEvent)
                }}}
                className="btn btn-primary">
                Add New Item
            </button>
        </form>
    )
}