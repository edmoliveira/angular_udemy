using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Versioning;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using System;
using mean_signaIR.Domain;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Threading.Tasks;

namespace mean_signaIR
{
    public class Startup
    {
        #region Fields private

        /// <summary>
        /// Web Api version
        /// </summary>
        private readonly Version _apiVersion = new Version(1, 0);
        /// <summary>
        /// Allow specific origins.
        /// </summary>
        private readonly string _allowSpecificOrigins = "allowSpecificOrigins";
        /// <summary>
        /// Represents a set of key/value application configuration properties.
        /// </summary>
        private readonly IConfiguration _configuration;

        #endregion

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            AppConfig appConfig = _configuration.GetSection("AppConfig").Get<AppConfig>();

            services.AddSingleton<IAppConfig>(sp => appConfig);
            services.AddSingleton<ITokenJwtHelper>(c => new TokenJwtHelper(c.GetService<IAppConfig>()));

            services.AddScoped<IAccountManager, AccountManager>();

            services.AddDistributedRedisCache(option =>
            {
                option.Configuration = appConfig.CacheAddress;
                option.InstanceName = appConfig.CacheInstance;
            });

            services.AddSwaggerGen(c =>
            {
                foreach (IConfigurationOpenApiInfo item in appConfig.Documents)
                {
                    c.SwaggerDoc(item.DocumentName, new OpenApiInfo
                    {
                        Version = _apiVersion.ToString(2),
                        Title = item.Title,
                        Description = item.Description,
                        TermsOfService = new Uri(appConfig.TermsOfServiceOpenApi),
                        Contact = new OpenApiContact
                        {
                            Name = appConfig.NameOpenApiContact,
                            Email = appConfig.EmailOpenApiContact,
                            Url = new Uri(appConfig.UrlOpenApiContact),
                        },
                        License = new OpenApiLicense
                        {
                            Name = appConfig.NameOpenApiLicense,
                            Url = new Uri(appConfig.UrlOpenApiLicense),
                        }
                    });
                }
            });
            services.AddSwaggerGenNewtonsoftSupport();

            JsonConvert.DefaultSettings = () => new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };

            services.AddMvcCore(options => options.EnableEndpointRouting = false)
                    .AddCors(options =>
                    {
                        options.AddPolicy(name: _allowSpecificOrigins,
                                          builder =>
                                          {
                                              builder
                                                .WithMethods(appConfig.AllowedMethods)
                                                .WithHeaders(appConfig.AllowedHeaders);

                                              if (appConfig.AllowedOrigins?.Length > 0)
                                              {
                                                  builder
                                                    .WithOrigins(appConfig.AllowedOrigins);
                                              }
                                          });
                    });

            services
                .AddControllers(options =>
                {
                    options.Filters.Add(typeof(HttpResponseExceptionFilter));
                })
                .AddNewtonsoftJson(opts =>
                {
                    opts.SerializerSettings.Converters.Add(new StringEnumConverter());
                });

            services.AddApiVersioning(version =>
            {
                version.DefaultApiVersion = new ApiVersion(_apiVersion.Major, _apiVersion.Minor);
                version.AssumeDefaultVersionWhenUnspecified = true;
                version.ReportApiVersions = true;
                version.ApiVersionReader = new HeaderApiVersionReader("x-api-version");
            });

            services.AddSignalR();

            IServiceProvider serviceProvider = services.BuildServiceProvider();

            services.AddAuthentication(x =>
                {
                    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(options =>
                {
                    ITokenJwtHelper tokenJwtHelper = serviceProvider.GetService<ITokenJwtHelper>();

                    options.RequireHttpsMetadata = true;
                    options.SaveToken = true;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(tokenJwtHelper.GetAuthTokenBytes()),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                    options.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                          var accessToken = context.Request.Query["access_token"];

                          var path = context.HttpContext.Request.Path;
                          if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/hubs"))
                          {
                            context.Token = accessToken;
                          }

                          return Task.CompletedTask;
                        },
                        OnTokenValidated = context =>
                        {
                            return System.Threading.Tasks.Task.CompletedTask;
                        },
                        OnAuthenticationFailed = context =>
                        {
                            return System.Threading.Tasks.Task.CompletedTask;
                        }
                    };
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseSwagger(c =>
            {
                c.RouteTemplate = "/api-docs/{documentName}/swagger.json";
            });

            app.UseSwaggerUI(c =>
            {
                IAppConfig appConfig = _configuration.GetSection("AppConfig").Get<AppConfig>();

                foreach (IConfigurationOpenApiInfo item in appConfig.Documents)
                {
                    c.SwaggerEndpoint($"/api-docs/{item.DocumentName}/swagger.json", item.DocumentName);
                }

                c.RoutePrefix = string.Empty;
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage()
                    .UseCors(policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            }
            else
            {
                app.UseCors(_allowSpecificOrigins);
            }

            app.UseHttpsRedirection();
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();
            app.UseStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<ServerHub>("hubs/server");
            });
        }
    }
}
