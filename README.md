Hyper
=====

Hyper is a JavaScript library that implements the Richardson Maturity Model, level 3 for building adaptable front-ends. It allows developers to easily add Hypermedia controls to their applications, providing a more dynamic and flexible API.

Benefits of Hypermedia controls
-------------------------------

*   **Decoupling**: Hypermedia controls allow for decoupling the client from the server, enabling the client to adapt to changes in the API without the need for updates.
*   **Ease of use**: Hypermedia controls are easy to use, providing a simple and consistent way to interact with the API.
*   **Adaptability**: Hypermedia controls allow for a more adaptable front-end, providing a way to easily change the behavior of the application based on the API's capabilities.
*   **Discoverability**: Hypermedia controls provide a way for the client to discover the capabilities of the API, making it easy to learn and use the API.
    

Installation
------------

To install Hyper, you can use npm or yarn:

Copy code

`npm install hyper-media`

Copy code

`yarn add hyper-media`

Usage
-----

Here is an example of how to use Hyper:

Copy code

`import { Hypermedia } from "hyper-media";  const address = "http://localhost/hypermedia"; const hypermedia = await Hypermedia.from(address); const links = hypermedia.all(); console.log(links);`

For more usage examples and API documentation, please refer to the [project's GitHub page](https://github.com/jcfigueiredo/hyper)

Contributing
------------

If you're interested in contributing to Hyper, please check out our [CONTRIBUTING.md](https://github.com/jcfigueiredo/hyper/blob/main/CONTRIBUTING.md) for more information on how to get started.

License
-------

Hyper is open-sourced software licensed under the [MIT license](https://github.com/jcfigueiredo/hyper/blob/main/LICENSE).

Acknowledgements
----------------

*   The Hyper library was inspired by the Richardson Maturity Model.
    
*   The library uses the axios library for making HTTP requests.
    
*   The library uses the nock library for HTTP request mocking during testing.
    
*   The library uses the @tsed/exceptions library for handling HTTP exceptions.
    
*   The library uses the jest library for testing.