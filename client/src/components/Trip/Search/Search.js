import React from "react";
import { Container } from "reactstrap";
import SearchInput from "./SearchInput";

export default function Search(props) {
	return (
		<Container>
			<SearchInput append={props.append} />
		</Container>
	);
}
