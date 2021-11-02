import React from 'react';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, it } from '@jest/globals';
import TripActions from '../../../src/components/Trip/Itinerary/TripActions';
import { MOCK_PLACES } from "../../sharedMocks";
import user from '@testing-library/user-event';
import { sendAPIRequest } from '../../../src/utils/restfulAPI';


describe('Trip Actions',()=>{
    const shuffleTrip = jest.fn();
    beforeEach(()=>{
        render(<TripActions />);
    });
    it('renders', async ()=>{
        const append = jest.fn();
        const serverSettings = {serverUrl: "http://localhost:8000"};
        const distances = [1, 2, 3, 4];
        render(<TripActions shuffleTrip={shuffleTrip} distances={distances} places={MOCK_PLACES} serverSettings={serverSettings} bulkAppend={append}/>);
    });
    

    it('opens a menu', ()=>{
        const dropdown = screen.getByTestId('dropdown');
        user.click(dropdown);
    });

    it('Has a button', ()=>{
        const optimize = screen.getByTestId('optimize');
        user.click(optimize);
    });

    it('Has a shuffle button that calls shuffle trip', ()=>{
        const shuffle = screen.getByTestId('shuffleBtn');
        expect(shuffle).toBeTruthy();
        user.click(shuffle);
        shuffleTrip();
        expect(shuffleTrip).toHaveBeenCalled();
    });

    it('Has a reverse button', ()=>{
        const rev = screen.getByTestId('reverse');
        expect(rev).toBeTruthy();
    });

    it('Has a alphasort button', ()=>{
        const alpha = screen.getByTestId('alphasort');
        expect(alpha).toBeTruthy();
    });


});