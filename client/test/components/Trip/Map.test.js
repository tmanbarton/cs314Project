import '../../jestConfig/enzyme.config.js';

import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { expect } from '@jest/globals';
import Map from '../../../src/components/Trip/Map/Map';
import { MOCK_PLACES } from "../../sharedMocks";

describe('Map', () => {
    const places = MOCK_PLACES;
    const placeActions = {
        append: jest.fn()
    };

    it('Clicking the map calls append', async () => {
        const { getByRole } = render(<Map places={places} placeActions={placeActions} />)

        fireEvent.click(getByRole('presentation'));
        await waitFor(() => {
            expect(placeActions.append).toHaveBeenCalled();
        });
    });
});