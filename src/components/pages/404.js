import React from 'react';
import Error from "../error/Error";
import {Link} from "react-router-dom";

const Page404 = () => {
    return (
        <div>
            <Error />
            <p style={{'textAlign': 'center', 'color': '#9f0013', 'fontWeight': 'bold', 'fontSize': '24px'}}>Page doesn't exist</p>
            <Link style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px'}} to="/">Back to main page</Link>
        </div>
    );
};

export default Page404;
