// Copyright (c) 2021 Learnosity, Apache 2.0 License
//
// Basic example of loading a standalone assessment in a web page using Items API
// with `rendering_type: "assess"`.
'use strict';

// Include server side Learnosity SDK, and set up variables related to user access.
const Learnosity = require('../../../index'); // Include Learnosity SDK constructor
const config = require('../config'); // Load consumer key & secret from config.js
const express = require('express');  // Load 'Express.js", a web server
const app = express();               // Instantiate the web server
const https = require('https');

app.set('view engine', 'ejs');       // Set EJS as our templating language

// - - - - - - Learnosity server-side configuration - - - - - - //

// Set the web server domain.

const domain = 'localhost';

app.get('/', function (req, res) {
    const learnositySdk = new Learnosity(); // Instantiate the SDK
    // Reports API configuration parameters.

    const resourceURL = "https://learnosity-web-view-staging.web.app/custom_questions/config.json"

    https.get(resourceURL, (htpRes) => {
        let data = '';
      
        // Collect data chunks as they arrive
        htpRes.on('data', (chunk) => {
          data += chunk;
        });
      
        // Parse the JSON data when the request is complete
        htpRes.on('end', () => {
          try {
            const jsonData = JSON.parse(data);
            console.log(jsonData); // Use the parsed JSON data

            // Initialize the Learnosity Author API
            const request = learnositySdk.init(
                'author',                              // Select Author API
                // Consumer key and consumer secret are the public & private security keys required to access Learnosity APIs and data. These keys grant access to Learnosity's public demos account. Learnosity will provide keys for your own account.
                {
                    consumer_key: config.consumerKey, // Load key from config.js
                    domain: domain                   // Set the domain (from line 20)
                },
                config.consumerSecret,                // Load secret from config.js
                // simple api request object for item list view
                {
                    mode: 'item_list',
                    config: {
                        item_edit: {
                            item: {
                                reference: {
                                    show: true,
                                    edit: true
                                },
                                dynamic_content: true,
                                shareed_passage: true,
                                enable_audio_recording: true
                            }
                        },
                        dependencies : {
                            question_editor_api: {
                                init_options: jsonData,
                            }
                        }
                    },
                    user: {
                        id: 'demos-site',
                        firstname: 'Demos',
                        lastname: 'User',
                        email: 'demos@learnosity.com'
                    }
                }
        
            );
            res.render('item-list', { request }); // Render the page and request.
            
          } catch (err) {
            console.error('Error parsing JSON:', err);
          }
        });
      
      }).on('error', (err) => {
        console.error('Error fetching JSON:', err);
      });
});

app.listen(3000, function () { // Run the web application. Set the port here (3000).
    console.log('Example app listening on port 3000!');
});

// Note: for further reading, the client-side web page configuration can be found in the EJS template: 'docs/quickstart/views/item-list.ejs'. //
