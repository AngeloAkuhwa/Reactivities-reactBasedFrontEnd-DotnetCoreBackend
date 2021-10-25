using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Reactivities.Domain;
using Reactivities.Persistence.Data;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Reactivities.API.Controllers
{
    public class ActivitiesController:BaseApiController
    {
        private readonly DataContext contex;

        public ActivitiesController(DataContext contex)
        {
            this.contex = contex;
        }

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await contex.Activities.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await contex.Activities.FindAsync(id);
        }
    }
}
