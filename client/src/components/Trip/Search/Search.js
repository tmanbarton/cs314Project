import React from "react";
import { Container } from "reactstrap";
import SearchInput from "./SearchInput";

export default function Search(props) {
	return (
		<SearchInput serverSettings={props.serverSettings} showMessage={props.showMessage} append={props.append} showSearch={props.showSearch}/>
	);
}
