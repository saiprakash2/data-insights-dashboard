# # Use the official .NET 9 SDK image to build the app
# FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
# WORKDIR /app

# COPY . .
# RUN dotnet restore
# RUN dotnet publish -c Release -o out

# # Use the .NET 9 runtime image
# FROM mcr.microsoft.com/dotnet/aspnet:9.0
# WORKDIR /app
# COPY --from=build /app/out .
# EXPOSE 5288
# ENTRYPOINT ["dotnet", "backend-dotnet.dll"]

# # --- Build stage ---
# FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
# WORKDIR /app

# COPY . .
# RUN dotnet restore
# RUN dotnet publish -c Release -o out

# # --- Run stage ---
# FROM mcr.microsoft.com/dotnet/sdk:9.0
# WORKDIR /app
# COPY --from=build /app/out .

# # ✅ Install EF CLI globally
# RUN dotnet tool install --global dotnet-ef
# ENV PATH="$PATH:/root/.dotnet/tools"

# EXPOSE 8080

# # ✅ Run migration before starting the app
# ENTRYPOINT ["sh", "-c", "dotnet ef database update && dotnet backend-dotnet.dll"]


# --- Build stage ---
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app
COPY . .
RUN dotnet restore
RUN dotnet build -c Release

# --- Runtime stage ---
FROM mcr.microsoft.com/dotnet/sdk:9.0
WORKDIR /app

# Copy full source (so migrations have .csproj + Migrations folder)
COPY . .

# Install EF CLI
RUN dotnet tool install --global dotnet-ef
ENV PATH="$PATH:/root/.dotnet/tools"

# Run migration, then start app
ENTRYPOINT ["sh", "-c", "dotnet ef database update && dotnet run --no-build --urls=http://+:8080"]




