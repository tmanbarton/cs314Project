
import React from 'react';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import TripActions from '../../../src/components/Trip/Itinerary/TripActions';
import { MOCK_PLACES } from "../../sharedMocks";
import user from '@testing-library/user-event';
import { sendAPIRequest } from '../../../src/utils/restfulAPI';

describe('Trip Actions',()=>{
    const shuffleTrip = jest.fn();
    const reversePlaces = jest.fn();
    const setChangedTrip = jest.fn();
    const places = jest.fn(()=> {
        return [{lat: '10.005', lng: '20.12', name: 'dPlace1'},{lat: '60.005', lng: '22.52', name: 'zPlace2'},{lat: '35.22', lng: '17.31', name: 'aPlace3'}];
    });
    const placesOrig = jest.fn(()=> {
        return [{lat: '10.005', lng: '20.12', name: 'dPlace1'},{lat: '60.005', lng: '22.52', name: 'zPlace2'},{lat: '35.22', lng: '17.31', name: 'aPlace3'}];
    });
    const placesRev = jest.fn(()=> {
        return [{lat: '35.22', lng: '17.31', name: 'zPlace3'},{lat: '60.005', lng: '22.52', name: 'zPlace2'},{lat: '10.005', lng: '20.12', name: 'dPlace1'}];
    });

    const append = jest.fn();
    const serverSettings = {serverUrl: "http://localhost:8000"};
    const distances = [1, 2, 3, 4];
    const undo = jest.fn();
    const mapRef = {
        current: {
            leafletElement: {
                fitBounds: jest.fn()
            }
        }
    };
    

    beforeEach(()=>{
        render(<TripActions mapRef={mapRef} setChangedTrip={setChangedTrip} undo={undo} reversePlaces={reversePlaces} shuffleTrip={shuffleTrip} distances={distances} places={MOCK_PLACES} serverSettings={serverSettings} bulkAppend={append}/>);
    });

    it('opens a menu', ()=>{
        const dropdown = screen.getByTestId('dropdown');
        user.click(dropdown);
    });

    it('Has a button', ()=>{
        const optimize = screen.getByTestId('optimize');
        user.click(optimize);
    });

    it('Has a shuffle button that shuffles places', ()=>{
        const shuffle = screen.getByTestId('shuffleBtn');
        expect(shuffle).toBeTruthy();
        user.click(shuffle);
        shuffleTrip(places);
        expect(shuffleTrip).toHaveBeenCalled();
        expect(places != placesOrig);
    });

    it('Has a reverse button that reverses places', ()=>{
        const rev = screen.getByTestId('reverse');
        expect(rev).toBeTruthy();
        user.click(rev);
        reversePlaces(places);
        expect(reversePlaces).toHaveBeenCalled();
        expect(places == placesRev);        
    });

});