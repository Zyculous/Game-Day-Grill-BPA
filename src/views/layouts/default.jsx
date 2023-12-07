import React from 'react';

const DefaultLayout = (props) => (
    <html lang="en">
        <head>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>{props.title}</title>
        </head>
        <body>{props.children}</body>
    </html>
);

export default DefaultLayout;
