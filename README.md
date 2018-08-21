# Introduction
This module is a Typescript conversion of zoho's [js SDK](https://www.zoho.com/crm/help/developer/server-side-sdks/node-js.html).
Unlike their SDK, this one expects a storage mechanism to be passed in such as the one I wrote [here](https://github.com/Kuttle/zoho-crm-serverless-spotinst-storage). For a complete example have a look [here](https://github.com/Kuttle/zoho-crm-serverless). 

This makes this SDK more flexible if your storage mechanism requires any configuration at runtime - unlike [theirs](https://www.zoho.com/crm/help/developer/server-side-sdks/node-js.html#Token_Storage) that uses a module import satement.

# Configuration
add this as a dependency to your `package.json` file like so:
```json
"dependencies": {
    "zoho-crm-nodejs-sdk": "https://github.com/Kuttle/zoho-crm-nodejs-sdk.git",
  }
```
Sorry, I have yet to release this as a standard npm module - if this gains any traction I will do it.
# Usage
Please refer to the example [here](https://github.com/Kuttle/zoho-crm-serverless). 
# Contributing
This really is a minimum conversion to typescript. There are a lot of types that need defining. If anyone adds any types and wants to do a pull request I would be grateful. 