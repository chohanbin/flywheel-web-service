import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Home from '@/app/page';
import { authenticate } from '@/app/lib/server-actions';
import { credentialSchema } from '@/app/lib/definitions';

let formState: {};

const formData = new FormData();

formData.append('email', 'validuser@example.com');

jest.mock('react-dom', () => ({
    ...jest.requireActual('react-dom'),
    useFormState: (mockAuthenticateAction: any, state: any) => {
        formState = state;
        return [
            formState,
            (formData: FormData) => {
                mockAuthenticateAction(formData).then((newState: any) => {
                    formState = newState;
                });
            }
        ];
    },
    useFormStatus: jest.fn(() => {
        return { pending: false };
    }),
}));

jest.mock('@/app/lib/server-actions', () => ({
    ...jest.requireActual('@/app/lib/server-actions'),
    authenticate: jest.fn((formData: FormData) => {
        const email = formData.get('email');

        const validatedFields = credentialSchema.safeParse({
            email: email,
        });

        if (validatedFields.success) {
            return Promise.resolve({
                message: 'success',
                errors: {},
            })
        } else {
            return Promise.resolve({
                message: 'validation error',
                errors: validatedFields.error.flatten().fieldErrors,
            });
        }
    }),
}));

describe('Home', () => {
    it('renders the welcome message', () => {
        render(<Home />);
        const welcomeMsg = screen.getByText(/Welcome to Flywill Trading/i);
        expect(welcomeMsg).toBeInTheDocument();
    });
});
