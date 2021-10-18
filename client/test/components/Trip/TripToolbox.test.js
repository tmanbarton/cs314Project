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
});