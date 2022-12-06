import { Outlet, Route, Routes } from "react-router-dom"
import { BagDetails } from "../bags/BagDetails"
import { BagList } from "../bags/BagList"
import { NewBag } from "../bags/NewBag"

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
				<Route path="bag/create" element={ <NewBag /> } />
				<Route path="bags" element={ <BagList /> } />
				<Route path="bags/:bagId" element={ <BagDetails /> } />
			</Route>
		</Routes>
	)
}

