import '../../jestConfig/enzyme.config.js';

import React from 'react';
import { render } from '@testing-library/react';
import Planner from '../../../src/components/Trip/Planner';

describe('Planner', () => {
    const createSnackBar = jest.fn();

    it('initializes as expected', async () => {
        render(<Planner createSnackBar={createSnackBar} />)
    });
});