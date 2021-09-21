import React from 'react';
import { render, screen } from '@testing-library/react';
import Planner from '../../../src/components/Trip/Planner';

describe('Planner', () => {
    const createSnackBar = jest.fn();

    beforeEach(() => {
        render(<Planner createSnackBar={createSnackBar} />);
    });

    it('renders a Leaflet map', async () => {
        screen.getByText('Leaflet');
    });

    it('renders trip table', async () => {
        screen.getByText('My Trip');
    });
});