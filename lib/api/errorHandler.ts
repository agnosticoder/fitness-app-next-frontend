//Todo: Implement this in nodejs backend
import { NextApiResponse } from 'next';
import { ZodError } from 'zod';

export interface ErrorProps {
    error: string;
    code: number;
}

interface ErrorHandlerProps {
    err: ErrorProps | unknown;
    res: NextApiResponse;
}

const isError = (err: any): err is ErrorProps => {
    if(typeof err !== 'object') return false;
    if(typeof err.error !== 'string') return false;
    if(typeof err.code !== 'number') return false;
    return true;
}


const errorHandler = async ({ err, res }: ErrorHandlerProps) => {
    try {
        if (isError(err)) {
            //* If error is recoverable
            //* Example: email already exists, email or password is invalid, etc.
            if (err.code <= 409 && err.code >= 400) {
                console.log('4XX error', err);
                return res.status(err.code).json(err);
            }
        }

        //* Handle zod errors
        if (err instanceof ZodError) {
            //* we don't want to expose the error to the user because we are already handling user input validations on the client side
            //* this error would only occur if the user is using something else than our user interface
            console.log('zod error', err);
            return res.status(500).json({ error: 'Something went wrong from server', code: 500 });
        }

        //Todo: Handle prisma errors

        //todo: write code to handle login unathorization errors
        // if(err.name === 'UnauthorizedError')

        //* if it is node related error
        //* console.error server errors: only important for developer not client
        // res.status(500).json({error: error.message});

        //* log full err to the server and send back message to client
        //Todo: check if serializeError is a good idea
        // await prisma.error.create({
        //     data: {
        //         error: JSON.stringify(serializeError(err), null, 2),
        //     },
        // });
        console.log({ err });
        res.status(500).json({ error: 'Something went wrong from our end, Please try again later', code: 500 });
    } catch (err) {
        console.error(err);
    } 
};

export default errorHandler;
