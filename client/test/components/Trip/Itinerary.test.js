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
        removeAll: jest.fn(),
        moveToHome: jest.fn()
    }
    beforeEach(() => {
        render(<Itinerary places={MOCK_PLACES} placeActions={placeActions}/>);
    });

    it('has an input and updates teamName', ()=>{
        const input = screen.getByTestId('My Trip');
        user.click(input)
        const textBox = screen.getByTestId('Trip Text');
        expect(textBox.value).toEqual('My Trip');
        user.clear(textBox);
        user.paste(textBox, 'TEST TRIP');
        expect(textBox.value).toEqual('TEST TRIP');
    });

    it('has a manager button and opens Trip Manager', async ()=>{
        const dropdown = screen.getByTestId('file-dropdown');
        user.click(dropdown);
    });

    it('renders the name attribute', () => {
       
        screen.getByRole('cell', { name: /Place A/i });
    });

    it('has a delete all button that deletes all places', ()=> {
        const deleteBtn = screen.getByTestId('delete-all-button');
        user.click(deleteBtn);
        expect(placeActions.removeAll).toHaveBeenCalled();
        
    })

    it('has a home button that calls moveToHome', ()=> {
        const homeBtn = screen.getByTestId('home-button');
        user.click(homeBtn);
        expect(placeActions.moveToHome).toHaveBeenCalled();
    })
});