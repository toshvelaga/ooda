import React, { useState } from "react";
import SearchResult from "../../components/SearchResult/SearchResult";
import axios from "axios";
import { LIMIT, URL } from "../../constants/constants";
import "./Search.css";

function Search() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [org, setOrg] = useState("");
	const [data, setData] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");

	const submit = () => {
		if (org !== "" && (firstName || lastName !== "")) {
			setErrorMessage(
				" Please do not search by name and organization in a single search"
			);
		} else
			axios
				.get(
					`${URL}/?number=&enumeration_type=&taxonomy_description=&first_name=${firstName}&use_first_name_alias=&last_name=${lastName}&organization_name=${org}&address_purpose=&city=&state=&postal_code=&country_code=&limit=${LIMIT}&skip=&pretty=on&version=2.1`
				)
				.then((res) => {
					const results = res.data.results;
					console.log(results);
					setData(results);
					setErrorMessage("");
				})
				.catch((err) => {
					console.log(err);
				});
	};

	return (
		<div className="wrap">
			<h3 className="title">
				Please search for a provider by name or organization.
				<span className="error-message">{errorMessage}</span>
			</h3>
			<p className="label">First name</p>
			<div className="search">
				<input
					type="text"
					className="search-term"
					onChange={(e) => setFirstName(e.target.value)}
				/>
			</div>
			<p className="label">Last name</p>
			<div className="search">
				<input
					type="text"
					className="search-term"
					onChange={(e) => setLastName(e.target.value)}
				/>
			</div>
			<p className="label">Provider organization</p>
			<div className="search">
				<input
					type="text"
					className="search-term"
					onChange={(e) => setOrg(e.target.value)}
				/>
			</div>
			<div className="search">
				<button onClick={submit} className="search-button">
					Search
				</button>
			</div>
			{data
				? data.map((result) => (
						<SearchResult
							key={result.number}
							firstName={
								result.basic.first_name ||
								result.basic.authorized_official_first_name
							}
							lastName={
								result.basic.last_name ||
								result.basic.authorized_official_last_name
							}
							number={result.number}
							city={result.addresses[0].city}
						/>
				  ))
				: null}
		</div>
	);
}

export default Search;
