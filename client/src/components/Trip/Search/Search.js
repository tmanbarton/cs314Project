import React from 'react'
import { Collapse, Container } from 'reactstrap';
import SearchInput from './SearchInput';

export default function Search(props) {
    return (
        <Container>
            <Collapse isOpen={props.showSearch}>
                <SearchInput />
            </Collapse>
        </Container>
    );
}