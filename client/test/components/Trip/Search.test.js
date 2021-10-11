import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import  user from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from '@jest/globals';
import SearchInput from '../../../src/components/Trip/Search/SearchInput.js';
import SearchResults from '../../../src/components/Trip/Search/SearchResults.js';


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
});


describe('SearchResults', () => {
    const places = {
        "places": [
            {
                "continent": "North America",
                "country": "United States",
                "latitude": "40.07080078125",
                "name": "Total Rf Heliport",
                "municipality": "Bensalem",
                "region": "Pennsylvania",
                "longitude": "-74.93360137939453"
            },
            {
                "continent": "North America",
                "country": "United States",
                "latitude": "59.94919968",
                "name": "Lowell Field",
                "municipality": "Anchor Point",
                "region": "Alaska",
                "longitude": "-151.695999146"
            },
            {
                "continent": "North America",
                "country": "United States",
                "latitude": "34.86479949951172",
                "name": "Epps Airpark",
                "municipality": "Harvest",
                "region": "Alabama",
                "longitude": "-86.77030181884766"
            },
            {
                "continent": "North America",
                "country": "United States",
                "latitude": "35.608699798583984",
                "name": "Newport Hospital & Clinic Heliport",
                "municipality": "Newport",
                "region": "Arkansas",
                "longitude": "-91.25489807128906"
            },
            {
                "continent": "North America",
                "country": "United States",
                "latitude": "34.305599212646484",
                "name": "Cordes Airport",
                "municipality": "Cordes",
                "region": "Arizona",
                "longitude": "-112.16500091552734"
            }
        ]
    };
    const appendMk = jest.fn()

    beforeEach(() => {
        render(<SearchInput serverSettings={serverSettings} showMessage={mockMessage} append={appendMk} />);
    });



});
