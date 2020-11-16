import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { URL } from "../../constants/constants";
import "./ProviderDetail.css";

function ProviderDetail() {
	const [basicData, setBasicData] = useState([]);
	const [locationAddress, setLocationAddress] = useState([]);
	const [mailingAddress, setMailingAddress] = useState([]);
	const [buttonText, setButtonText] = useState("Copy Link");

	const { id } = useParams();

	useEffect(() => {
		getData();
	}, [id]);

	const getData = () => {
		axios
			.get(
				`${URL}/?number=${id}&enumeration_type=&taxonomy_description=&first_name=&use_first_name_alias=&last_name=&organization_name=&address_purpose=&city=&state=&postal_code=&country_code=&limit=&skip=&pretty=on&version=2.1`
			)
			.then((res) => {
				const results = res.data.results[0];
				setBasicData(results.basic);
				setLocationAddress(results.addresses[0]);
				setMailingAddress(results.addresses[1]);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="view-container">
			<h3>
				{basicData.name_prefix || basicData.authorized_official_name_prefix}{" "}
				{basicData.first_name || basicData.authorized_official_first_name}{" "}
				{basicData.middle_name || basicData.authorized_official_middle_name}{" "}
				{basicData.last_name || basicData.authorized_official_last_name}{" "}
				{basicData.credential || basicData.authorized_official_credential}
			</h3>
			<p>Organization Name: {basicData.organization_name}</p>
			<p>NPI Number: {id}</p>

			<p>Practice Address:</p>
			<p>
				{locationAddress.address_1}
				<br />
				{locationAddress.city}, {locationAddress.state}{" "}
				{locationAddress.postal_code}
				<br />
				{locationAddress.country_name}
			</p>

			<p>Mailing Address:</p>
			<p>
				{mailingAddress.address_1}
				<br />
				{mailingAddress.city}, {mailingAddress.state}{" "}
				{mailingAddress.postal_code}
				<br />
				{mailingAddress.country_name}
			</p>

			<p>Web Link: {window.location.href}</p>
			<button
				className="copy-button"
				onClick={() =>
					navigator.clipboard.writeText(`${window.location.href}`) &&
					setButtonText("Copied!")
				}
			>
				{buttonText}
			</button>
		</div>
	);
}

export default ProviderDetail;
