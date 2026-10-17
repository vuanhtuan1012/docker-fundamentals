# This Dockerfile is used to demonstrate the difference between CMD and ENTRYPOINT instructions in Docker.
# The ENTRYPOINT instruction sets the command that will always be executed when the container starts,
# while the CMD instruction provides the default command or arguments for the ENTRYPOINT command.

# In this case, the ENTRYPOINT is set to "echo",
# and the CMD provides the argument "Hello from ENTRYPOINT CMD!" to the ENTRYPOINT command.
# When you run this container, it will always execute the ENTRYPOINT command, and
# if you provide additional arguments, they will override the default CMD arguments,
# and be passed directly to the ENTRYPOINT command.

FROM alpine:3.24.2
ENTRYPOINT ["echo"]
CMD ["Hello from ENTRYPOINT CMD!"]