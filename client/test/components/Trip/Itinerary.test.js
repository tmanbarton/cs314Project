import '../../jestConfig/enzyme.config.js';

import React from 'react';
import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it } from '@jest/globals';
import Itinerary from '../../../src/components/Trip/Itinerary/Itinerary.js';
import { MOCK_PLACES } from "../../sharedMocks";

describe('Itinerary', () => {
    let places;

    beforeEach(() => {
        places = MOCK_PLACES;
    });

    it('renders a cell with given place expected', () => {
        const { getByRole } = render(<Itinerary places={places} />);
        expect(getByRole('cell', { name: /40.0/i }).textContent).toContain('40.00, 50.00');
    });

    it('renders the name attribute', () => {
        const { getByRole } = render(<Itinerary places={places} />);
        getByRole('cell', { name: /Place A/i });
    });
});