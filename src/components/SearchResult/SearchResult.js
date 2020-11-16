import React from "react";
import "./SearchResult.css";
import { Link } from "react-router-dom";

function SearchResult(props) {
	return (
		<div className="results">
			<Link
				style={{ textDecoration: "none", color: "black" }}
				to={`/provider/${props.number}`}
			>
				<p>
					{props.firstName} {props.lastName} | {props.number}
					<span style={{ float: "right", paddingRight: "10px" }}>
						{props.city}
					</span>
				</p>
			</Link>
		</div>
	);
}

export default SearchResult;
