import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { TypeSelect } from "./TypeSelect"

export const EditItem = () => {
    const {bagId, itemId} = useParams()
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

     useEffect(() => {
        fetch(`http://localhost:8088/items/${itemId}?_expand=type`)
            .then(response => response.json())
            .then((data) => {
                update(data)
            })
    }, [itemId])

   const navigate = useNavigate()

    const localBagsUser = localStorage.getItem("bags_user")
    const bagsUserObject = JSON.parse(localBagsUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/items/${item.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        })
            .then(response => response.json())
            .then(() => {
                navigate(`/bags/${bagId}/${item.id}`)
            })
    }

    return (
        <form className="itemForm">
            <h2 className="itemForm__title">Edit Item</h2>
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
                Save Item
            </button>
        </form>
    )
}