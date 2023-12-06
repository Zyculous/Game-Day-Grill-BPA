var React = require('react');
var DefaultLayout = require('./layouts/default');

module.exports = (props) => (
    <DefaultLayout title="Home">
        <div>
            This is the home page!
        </div>
    </DefaultLayout>
);