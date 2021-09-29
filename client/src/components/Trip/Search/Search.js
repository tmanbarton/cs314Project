import React from "react";
import { Container } from "reactstrap";
import SearchInput from "./SearchInput";

export default function Search(props) {
	return (
		<Container>
			<SearchInput showMessage={props.showMessage} append={props.append} />
		</Container>
	);
}
