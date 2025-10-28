﻿using System;
using backend_dotnet.Models;
using Microsoft.EntityFrameworkCore;


namespace backend_dotnet.Data
{
    public class AppDbContext : DbContext
    {

          public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

           public DbSet<DataRecord> DataRecords => Set<DataRecord>();
    }

}

