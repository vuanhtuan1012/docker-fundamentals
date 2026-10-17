# This Dockerfile is used to demonstrate the difference between CMD and ENTRYPOINT instructions in Docker.
# The ENTRYPOINT instruction sets the command that will always be executed when the container starts,
# while the CMD instruction provides default command or arguments for the ENTRYPOINT command.

# In this case, the CMD default command is set to `echo "Hello from CMD!"`.
# When you run this container, it will execute the CMD default command,
# and if you pass an extra command, it will replace the default CMD command.

FROM alpine:3.24.2
CMD ["echo", "Hello from CMD!"]