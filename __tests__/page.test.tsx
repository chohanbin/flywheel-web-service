import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Home from '@/app/page';
import { authenticate } from '@/app/lib/server-actions';
import { credentialSchema } from '@/app/lib/definitions';
import DashboardPage from '@/app/dashboard/page';

// Mocking the Login button's Form.
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

// Mocking the authenticate logic that the Login button triggers.
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

    // TODO: Test cases
    //   - Login Form
    //     - Email input field displays Enter your email.
    //     - Loging button entered without email address, then prompted, without calling authenticate.
    //     - If invalid email address, prompted without calling authenticate.
    //     - If valid email address, authenticate logic gets called.
    //     - If authenticate logic returns success, then the user is redirected to the dashboard.
    //     - If authenticate logic returns validation error, then the user is prompted with the error message.
});

describe('Dashboard', () => {

    // TODO: Test cases
    //   - Displays greeing by the user name (fetched from the session).
    //   - Side nav:
    //     - Displays the list of account IDs fetched from the customer object.
    //     - TODO: Error behavior in case fetching the account ID fails due to network error, or data service error.
    //       - Display feedback: "Something went wrong. Please try again later."
    //   - Clicking the side nav
    //     - Redirects the user to the path /dashboard/[accountId]
    //     - Displays breadcrumb with the account ID.
    //     - Displays the list of transactions fetched by the account Id.
    //     - The nav button for the selected account remains highlighted.
    //     - TODO: Test cases for caching logic. Responses for clicking other side navs would have been pre-fetched.
    //   - Table of transactions
    //     - Clicking on stock symbols lead to the stock summary page..
    //   - Signout
    //     - initiates signOut logic and redirects the user to the home page.
});
