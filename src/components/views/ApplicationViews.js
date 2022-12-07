import { Outlet, Route, Routes } from "react-router-dom"
import { BagDetails } from "../bags/BagDetails"
import { BagList } from "../bags/BagList"
import { EditBag } from "../bags/EditBag"
import { EditItem } from "../bags/EditItem"
import { ItemDetails } from "../bags/ItemDetails"
import { NewBag } from "../bags/NewBag"
import { NewItem } from "../bags/NewItem"

export const ApplicationViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>Bags of Holding</h1>
					<div>The ultimate dnd inventory tracker</div>

					<Outlet />
				</>
			}>	
				<Route path="bags/:bagId/:itemId" element={ <ItemDetails /> } />
				<Route path="bags/:bagId/:itemId/itemEdit" element={ <EditItem /> } />
				<Route path="bag/create" element={ <NewBag /> } />
				<Route path="bags" element={ <BagList /> } />
				<Route path="bags/:bagId" element={ <BagDetails /> } />
				<Route path="bags/:bagId/itemCreate" element={ <NewItem /> } />
				<Route path="bags/:bagId/bagEdit" element={ <EditBag /> } />
			</Route>
		</Routes>
	)
}

