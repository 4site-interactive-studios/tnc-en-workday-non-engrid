# Workday Integration for Non-ENgrid pages

The code in this repository can be implemented into TNC Events pages to provide the same functionality to non-ENgrid pages as is provided by the Workday Integration for ENgrid pages.

## How it works

On page load, we check for the presence of the metadata fields and look at their values. If we have a corresponding mapping for their values, we set the new values.

You can add the URL parameter `debug` to see console output of what the script is doing.

## Implementation Steps

It's not necessary to install any dependencies (it's just for Prettier for code formatting).

To implement the code, follow these steps:

- Include `/src/workday-non-engrid.js` as an external JavaScript file in your Events page template(s).

Or

- Integrate the contents into your existing JavaScript code for the Events pages.
