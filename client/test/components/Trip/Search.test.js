import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import  user from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from '@jest/globals';
import  SearchInput  from '../../../src/components/Trip/Search/SearchInput.js';
import { SearchResults } from '../../../src/components/Trip/Search/SearchResults.js';
import  { MOCK_PLACES } from "../../sharedMocks";

describe('SearchInput', () => {
    const serverSettings = {serverUrl: "http://localhost:8000"}
    const mockMessage = jest.fn();
    const append = jest.fn();
    
    beforeEach(() => {
        render(<SearchInput serverSettings={serverSettings} showMessage={mockMessage} append={append} showSearch={true}/>);
    });

    it('Can pull up random places', () => {
        const randomPlaces = screen.getByTestId('randomPlaces');
        user.click(randomPlaces);
    });

    it('Can Search by Coordinates', () => {
        const byCoordinates = screen.getByTestId('byCoordinates');
        user.click(byCoordinates);
    });

    it('Can Search by String', () => {
        const byString = screen.getByTestId('byString');
        user.click(byString);
    });
});


describe('SearchResults', () => {
    const append = jest.fn()
    const noResultsFound = false
    const searchMode = "search"
    const found = 5;

    beforeEach(() => {
        render(<SearchResults places={MOCK_PLACES} append={append} noResultsFound={noResultsFound} found={found} searchMode={searchMode}/>);
    });


    it('Shows Queried Results', () => {
        const resultsItems = screen.getAllByTestId('searchResults');
        user.click(resultsItems[0]);
    });
});
