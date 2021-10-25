import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import user from '@testing-library/user-event';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { MOCK_PLACES } from "../../sharedMocks";
import Itinerary from '../../../src/components/Trip/Itinerary/Itinerary.js';

describe('Itinerary', () => {
    const placeActions ={
        append: jest.fn(),
        removeAll: jest.fn()
    }
    beforeEach(() => {
        render(<Itinerary places={MOCK_PLACES} placeActions={placeActions} />);
    });

    it('has an input and updates teamName', ()=>{
        const input = screen.getByTestId('My Trip');
        expect(input.value).toEqual('My Trip');
        user.clear(input);
        user.paste(input, 'TEST TRIP');
        expect(input.value).toEqual('TEST TRIP');
    });

    it('has a toolbox button and opens TripToolBox', async ()=>{
        const onClick = jest.fn();
        const toolboxBtn = screen.getByTestId('toolbox-btn',);
        user.click(toolboxBtn);
        await waitFor(()=>{
            expect(screen.getByText(/trip toolbox/i)).toBeTruthy();
        });
        screen.debug();
    });

    it('renders a cell with given place expected', () => {
        expect(screen.getByRole('cell', { name: /40.0/i }).textContent)
            .toContain('40.00, 50.00');
    });

    it('renders the name attribute', () => {
        screen.getByRole('cell', { name: /Place A/i });
    });
});