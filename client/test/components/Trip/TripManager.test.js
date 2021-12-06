import React from 'react';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import TripManager from '../../../src/components/Trip/Itinerary/TripManager';
import { render,screen } from '@testing-library/react';
import user from '@testing-library/user-event';


describe('Trip Manager Modal', ()=>{
    const toggleOpen = jest.fn();
    const tripName = "testTrip";
    const tripToolbox={
        append: jest.fn(),
        removeAll: jest.fn(),
        showMessage: jest.fn(),
        setTripName: jest.fn()
    }


    const places = jest.fn(()=> {
        return [{lat: '10.005', lng: '20.12', name: 'place1'},{lat: '60.005', lng: '22.52', name: 'place2'}];
    });

    beforeEach(()=>{
        render(<TripManager tripName={tripName} places={places} managerMethods={tripToolbox}/>);
    });

    it('renders', async () =>{
        render(<TripManager tripName={tripName} places={places} managerMethods={tripToolbox} />)
    });

    it('has an upload button', ()=>{
        const upload = screen.getByTestId('upload-btn');
        expect(upload).toBeTruthy();
    });

    it('uploads a CSV file', ()=>{
        const input = screen.getByTestId('input');
        const file = new File(['test'], 'test.csv', {type: 'text/csv'});
        user.upload(input, file);
        expect(input.files[0]).toStrictEqual(file);
    });

    it('uploads a JSON file', ()=>{
        const input = screen.getByTestId('input');
        const file = new File(['test'], 'test.json', {type: 'application/json'});
        user.upload(input, file);
        expect(input.files[0]).toStrictEqual(file);
    });

    it('Downloads a CSV file', ()=>{
        global.URL.createObjectURL = jest.fn();
        const download = screen.getByTestId('CSV-download-button');
        expect(download).toBeTruthy();
        user.click(download);
    });

    it('Downloads a JSON file', ()=>{
        global.URL.createObjectURL = jest.fn();
        const download = screen.getByTestId('JSON-download-button');
        expect(download).toBeTruthy();
        user.click(download);
    });
});