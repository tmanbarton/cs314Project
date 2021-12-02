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
        render(<SearchInput serverSettings={serverSettings} showMessage={mockMessage} append={append} />);
    });

    it('Has a textbox', () => {
    screen.getByTestId('searchBar');
    });

    it('Calls a function when given user input', () => {
    user.paste(screen.getByTestId('searchBar'), 'a');
        });

    it('Can pull up random places', () => {
        const randomPlaces = screen.getByTestId('randomPlaces');
        user.click(randomPlaces);
    });

    it('Can Search by String or Coordinates', () => {
        const byCoordinates = screen.getByTestId('byCoordinates');
        user.click(byCoordinates);
    });
});


describe('SearchResults', () => {
    const append = jest.fn()

    beforeEach(() => {
        render(<SearchResults places={MOCK_PLACES} append={append} />);
    });


    it('Shows Queried Results', () => {
        const resultsItems = screen.getAllByTestId('searchResults');
        user.click(resultsItems[0]);
    });
});
