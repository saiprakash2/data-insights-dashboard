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

# --- Build stage ---
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

COPY . .
RUN dotnet restore
RUN dotnet publish -c Release -o out

# --- Run stage ---
# ✅ Use SDK image instead of runtime so EF tools work
FROM mcr.microsoft.com/dotnet/sdk:9.0
WORKDIR /app
COPY --from=build /app/out .
EXPOSE 8080

# Run migrations first, then start the app
ENTRYPOINT ["sh", "-c", "dotnet ef database update && dotnet backend-dotnet.dll"]


