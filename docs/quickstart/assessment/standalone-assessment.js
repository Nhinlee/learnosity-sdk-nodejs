// Copyright (c) 2021 Learnosity, Apache 2.0 License
//
// Basic example of loading a standalone assessment in a web page using Items API
// with `rendering_type: "assess"`.
'use strict';

// Include server side Learnosity SDK, and set up variables related to user access.
const Learnosity = require('../../../index'); // Include Learnosity SDK constructor
const config = require('../config'); // Load consumer key & secret from config.js
const uuid = require('uuid');        // Load the UUID library
const express = require('express');  // Load 'Express.js", a web server
const app = express();               // Instantiate the web server

app.set('view engine', 'ejs');       // Set EJS as our templating language

// - - - - - - Learnosity server-side configuration - - - - - - //

// Generate the user ID and session ID as UUIDs, set the web server domain.
const user_id = '469e6ec3-2dd9-4b1d-ae7e-d6ee045e3d98';
const session_id = '0d25ac5b-4c89-4042-825a-a3e54f33b709';
const domain = 'localhost';

app.get('/', function (req, res) {
    const learnositySdk = new Learnosity(); // Instantiate the SDK
    // Items API configuration parameters.

    const configObject = {
        "config": {
            "regions": "main", // "main" is the default value, so this line can be removed.
            // "regions":"main",
            // "region_overrides": {
            //     // "right": false,
            //     // "top-left": false,
            //     // "bottom": [
            //     //     {
            //     //         "type": "horizontaltoc_element"
            //     //     }
            //     // ]
            // },
            // "title": "abc",
            // "regions": {
            //     "top-right": [
            //         {
            //             "type": "pause_button",
            //             "position": "right"
            //         },
            //         {
            //             "type": "timer_element"
            //         },
            //         {
            //             "type": "reading_timer_element"
            //         },
            //         {
            //             "type": "itemcount_element",
            //             "position": "right"
            //         }
            //     ],
            //     "right": [
            //         {
            //             "type": "save_button"
            //         },
            //         {
            //             "type": "fullscreen_button"
            //         },
            //         {
            //             "type": "separator_element"
            //         },
            //         {
            //             "type": "accessibility_button"
            //         },
            //         {
            //             "type": "calculator_button"
            //         },
            //         {
            //             "type": "verticaltoc_element"
            //         },
            //         {
            //             "type": "masking_button"
            //         }
            //     ],
            // },
        }}; 

    const request = learnositySdk.init( 
        'items',                              // Select Items API
        // Consumer key and consumer secret are the public & private security keys required to access Learnosity APIs and data. These keys grant access to Learnosity's public demos account. Learnosity will provide keys for your own account.
        {
            consumer_key: config.consumerKey, // Load key from config.js
            domain: domain                   // Set the domain (from line 20)
        },
        config.consumerSecret,                // Load secret from config.js
        {
            // Unique student identifier, a UUID generated on line 18.
            user_id: user_id,
            // A reference of the Activity to retrieve from the Item bank, defining which Items will be served in this assessment.
            activity_template_id: '0188fdf3-29de-7d58-8808-689e9bb98b3c',
            // Selects a rendering mode, `assess` type is a "standalone" mode (loading a complete assessment player for navigation, VS `inline`, for embedded).
            // Uniquely identifies this specific assessment attempt session for  save/resume, data retrieval and reporting purposes. A UUID generated on line 18.
            session_id: session_id,
            // Used in data retrieval and reporting to compare results with other users submitting the same assessment.
            activity_id: 'Demo',
            // Selects a rendering mode, `assess` type is a "standalone" mode (loading a complete assessment player for navigation, VS `inline`, for embedded).
            rendering_type: 'assess',
            // Selects the context for the student response storage `submit_practice` mode means student response storage in the Learnosity cloud, for grading.
            type: 'submit_practice',
            // Human-friendly display name to be shown in reporting.
            name: 'Items API Quickstart',
            // config: {
            //     "labelBundle": {
                    
            //     },
            //     "questions_api_init_options": {
            //         "labelBundle": {
                        
            //         }
            //     }
            // }
        },
        // configObject, // Items API configuration parameters from line 30.
    );


    // console.log(req.query);
    // let signedRequestStr = req.query['signed_request'];
    // let request = JSON.parse(signedRequestStr);
    console.log(request);
    
    res.render('standalone-assessment', { request }); // Render the page and request.
});

app.listen(3000, function () { // Run the web application. Set the port here (3000).
    console.log('Example app listening on port 3000!');
});

// Note: for further reading, the client-side web page configuration can be found in the EJS template: 'docs/quickstart/views/standalone-assessment.ejs'. //
