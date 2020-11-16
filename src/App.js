import React from "react";
import Search from "./containers/Search/Search";
import ProviderDetail from "./containers/ProviderDetail/ProviderDetail";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
	return (
		<>
			<Router>
				<Switch>
					<Route path="/provider/:id">
						<ProviderDetail />
					</Route>
					<Route path="/">
						<Search />
					</Route>
				</Switch>
			</Router>
		</>
	);
}

export default App;
