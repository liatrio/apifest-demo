# apifest-demo

This sample app can be easily run locally with any http server. One of the simplest methods is: `python -m SimpleHTTPServer` which will run the app on http://localhost:8000

This does, however, require that you have the SimpleHTTPServer module for python (default with most modern python installs)

Altternatively you can use the provided Dockerfile to build a container that runs an NGINX server for the app. This can be built with `docker build . ` in the project root. With your image created, simply run it with: `docker run -P -d <image> ` this will assign a random port (-P) and put the process in the background (-d). Altternatively, you can manually specify the port you want to run it on with `-p <host_port>:<container_port>` in place of `-P`


# Login

The login for this application is `mayduncan` for both username and password
