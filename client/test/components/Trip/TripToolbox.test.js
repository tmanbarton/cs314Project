import React from 'react';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import TripToolbox from '../../../src/components/Trip/Itinerary/TripToolbox';
import { render,screen } from '@testing-library/react';


describe('Trip Toolbox Modal', ()=>{
    const toggleOpen = jest.fn();
    const tripToolbox={
        append: jest.fn(),
        removeAll: jest.fn(),
        showMessage: jest.fn(),
    }

    beforeEach(()=>{
        render(<TripToolbox toolboxMethods={tripToolbox} isOpen={true} toggleToolbox={toggleOpen}/>);
    });

    it('renders', async () =>{
        render(<TripToolbox toolboxMethods={tripToolbox} isOpen={true} toggleToolbox={toggleOpen}/>)
    });

    it('has an upload button', ()=>{
        const upload = screen.getByTestId('upload-btn');
        expect(upload).toBeTruthy();
    });

    it('has a CSV download button', ()=>{
        const download = screen.getByTestId('CSV-download-button');
        expect(download).toBeTruthy();
    });

    it('has a JSON download button', ()=>{
        const download = screen.getByTestId('JSON-download-button');
        expect(download).toBeTruthy();
    });

    it('has a continue button', ()=>{
        const cont = screen.getByTestId('continue-button');
        expect(cont).toBeTruthy();
        
    });
});