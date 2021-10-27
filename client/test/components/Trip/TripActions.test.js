import React from 'react';
import { render } from '@testing-library/react';
import { beforeEach, describe, it } from '@jest/globals';
import TripActions from '../../../src/components/Trip/Itinerary/TripActions';

describe('Trip Actions',()=>{
    beforeEach(()=>{
        render(<TripActions />);
    });
    it('renders', async ()=>{
        render(<TripActions />);
    });
});