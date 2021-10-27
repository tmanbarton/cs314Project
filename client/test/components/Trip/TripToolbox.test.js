import React from 'react';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import TripToolbox from '../../../src/components/Trip/Itinerary/TripToolbox';
import { render,screen } from '@testing-library/react';
import user from '@testing-library/user-event';


describe('Trip Toolbox Modal', ()=>{
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
        render(<TripToolbox tripName={tripName} places={places} toolboxMethods={tripToolbox} isOpen={true} toggleToolbox={toggleOpen}/>);
    });

    it('renders', async () =>{
        render(<TripToolbox toolboxMethods={tripToolbox} isOpen={true} toggleToolbox={toggleOpen}/>)
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

    it('has a CSV download button', ()=>{
        const download = screen.getByTestId('CSV-download-button');
        expect(download).toBeTruthy();
    });

    it('has a JSON download button', ()=>{
        const download = screen.getByTestId('JSON-download-button');
        expect(download).toBeTruthy();
    });

    it('Downloads a CSV file', ()=>{
        global.URL.createObjectURL = jest.fn();
        const download = screen.getByTestId('CSV-download-button');
        user.click(download);
    });

    it('Downloads a JSO file', ()=>{
        global.URL.createObjectURL = jest.fn();
        const download = screen.getByTestId('JSON-download-button');
        user.click(download);
    });

    it('has a continue button and when clicked it closes the modal', async ()=>{
        const cont = screen.getByTestId('continue-button');
        user.click(cont);
        expect(toggleOpen).toHaveBeenCalled();
    });

});