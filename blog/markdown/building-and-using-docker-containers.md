---
title: Building, deploying and using Docker containers
description: A quick introduction to Docker and how to use it
cover: docker-blue.png
---

Have you ever wanted to deploy something you have made, but the destination server did not have the correct configuration and dependencies to run the app? If so, then you might want to look into running your app inside of something called a Docker Container. In this tutorial we will go over what Docker is, how to create a Docker container and how to deploy it to a server.

<br>

## What is Docker?

Docker is a very handy tool that allows you to recreate your environment on any machine. It does this by using Images and Containers. An Image is a file that contains everything needed to run your app, including the OS, libraries and your app. A Container is an instance of an Image. You can run multiple Containers from the same Image. This allows you to run multiple instances of your app on the same machine. You can also run multiple Images on the same machine, allowing you to run multiple different apps on the same machine.

Now, Docker does not magically work on any machine. You will firstly need to [install Docker](https://docs.docker.com/engine/install/) on the machine you want to run your app on. After that you can start creating your Images and Containers.

<br>

### Docker Images

Now that you have Docker installed, you can start creating your Images. You can create an Image by creating a `Dockerfile` in the root of your project. This file will contain the instructions to build your Image. Let's take a look at an example `Dockerfile`:

```ini
# Use the official .NET ASP Image as a base
FROM mcr.microsoft.com/dotnet/aspnet:8.0-preview AS base
USER app
# Set the working directory to /app
WORKDIR /app

# Copy the files from the publish folder to the working directory
EXPOSE 8080
EXPOSE 8081

# Set the entry point to the app
ENV DOTNET_URLS=http://+:5001

# Get the .NET SDK Docker Image
FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0-preview AS build
ARG BUILD_CONFIGURATION=Release

# Set the working directory to /src
WORKDIR /src

# Copy the csproj file and restore any dependancies
COPY . .
RUN dotnet restore "./EKO.ConnectFour/EKO.ConnectFour.Api.csproj"
COPY . .
WORKDIR "/src/EKO.ConnectFour"
RUN dotnet build "./EKO.ConnectFour.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Publish the app
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./EKO.ConnectFour.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Create the final Image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Define the entry point for the container
ENTRYPOINT ["dotnet", "EKO.ConnectFour.Api.dll"]
```

This Dockerfile is what I use to build my [Connect Four](https://emirkaan.be/projects/connect-four/pages/) API. Let's go over it step by step:

1. First we load the official .NET ASP Image as a base. This will be the base of our Image.
2. Then we set the working directory to `/app`. This is where our app will be stored on the Docker Container.
3. Next we copy the files from the publish folder to the working directory.
4. Then we expose the ports that our app will be using.
5. After that we set the entry point to the app.

Next we will go over how to use this Dockerfile to build and deploy an Image.

<br>

### Build & Deploy the Image

First, open a command line window to the root of your project. Then run the following command:

```bash
docker buildx build --platform linux/arm64 -t eko-raspberry-api . -f .\EKO.RaspberryPi.Api\Dockerfile
```

This will build the Image and tag it as `eko-raspberry-api`, which is basically the name of the image. The `-f` flag specifies the path to the Dockerfile. The `--platform` flag specifies the platform that the Image will be built for. In this case we are building it for a Raspberry Pi (Linux ARM64). You can find a list of all the flags [here](https://docs.docker.com/engine/reference/commandline/buildx_build/).

Next we will tag the Image to the Image on Docker Hub. This will allow us to push the Image to Docker Hub. To do this, run the following command:

```bash
docker tag eko-raspberry-api ekozf/eko-raspberry-api
```

After the image has been tagged, we can push it to Docker Hub. To do this, run the following command:

```bash
docker push ekozf/eko-raspberry-api
```

<br>

### Loading & Running the Image

Now our Image is on Docker Hub, we can load it on any machine that has Docker installed. To do this you should first install Docker on the host machine, then run the following command:

```bash
docker pull ekozf/eko-raspberry-api:latest
```

You might have to run this using `sudo` if you didn't add your user to the Docker group. You might also get an error saying that the Image is not found. This is because the Image is not public. To make it public, go to the Docker Hub page of the Image and click on the `Change visibility` button. Then select `Public` and click on `Change visibility`. But you can also login to Docker on the host machine using `docker login` Now you should be able to pull the Image.

You can run the image using the following command:

```bash
docker run -dit --rm -p 192.168.0.142:80:5000 ekozf/eko-raspberry-api:latest
```

This is what every flag does:

1. `-d` runs the container in the background
2. `-i` keeps STDIN open even if not attached
3. `-t` allocates a pseudo-TTY, which means that you can interact with the container
4. `--rm` removes the container when it exits
5. `-p` publishes a container's port(s) to the host, in this case we expose port 5000 on the container to port 80 on the host
6. `eko-raspberry-api:latest` is the name of the Image we want to run, in this case we are running the latest version of the Image

When you do `run` on an image, a new container is created from that image. This container can be stopped, restarted, and deleted all without affecting the image. You can also run multiple containers from the same image. This allows you to run multiple instances of your app on the same machine.

The `:latest` tag at the end of the image name means that we will use the most recent available version for that image. You can also specify a specific version of the image by using `:version` e.g. `:8.0.2` for version 8.0.2 at the end of the image name. You can find a list of all the flags [here](https://docs.docker.com/engine/reference/commandline/run/).

<br>

### Playing around with the Container

Now that we have our container running, we can interact with it. To do this, we first need to get the container ID. To do this, run the following command:

```bash
docker ps
```

This will show us a list of all the running containers. You should see something like this:

<div class="md-container">
    <img class="w-100 scale-on-tap" src="/resources/images/docker-ps-output.png" />
</div>

As you can see, I have 3 containers running. But that is not important right now, we will start by going over the columns.

The first column is the container ID. We will need this to interact with the container. We will look at how to do this in a bit. The second column is the image name. This is the name of the image that the container was created from. The third column is the command that was used to start the container. In this case it is `dotnet EKO.ConnectFour.Api.dll`. This is the command that is run when the container is started.

After this we have the creation date of the container and its current status. Next we have the exposed ports and at the end we can see the names of the containers themselves.

What we want to do next is run a few commands from within the container, to do this we will start a bash session inside of the container. To do this, run the following command:

```bash
docker exec -it 3309 bash
```

This command wil start an interactive bash session inside of the container.

As you can see, I didn't provide the full id of the container, I only provided the first 4 characters. This is because the container ID is unique, so there is no need to provide the full ID. You can also use the name of the container instead of the ID.

Next we will stop the container and finish this tutorial. To do this, run the following command:

```bash
docker container stop 3309
```

This will stop the container and remove it. This was because, as mentioned previously, we used the `--rm` flag when we ran the container.

<br>

## Conclusion

These were some of the basic functions and use cases of Docker. There is a lot more to Docker than what I have shown here. If you want to learn more about Docker, you can check out the [official documentation](https://docs.docker.com/). Enjoy hosting and deploying your apps!
