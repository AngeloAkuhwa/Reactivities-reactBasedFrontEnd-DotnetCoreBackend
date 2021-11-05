using MediatR;
using Microsoft.EntityFrameworkCore;
using Reactivities.Application.Core;
using Reactivities.Domain;
using Reactivities.Persistence.Data;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Reactivities.Application.Activities
{
    public class List
    {
        public class Query:IRequest<Result<List<Activity>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Activity>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
            {
               var activity = await _context.Activities.ToListAsync();
                return  Result<List<Activity>>.Success(activity);
            }
        }
    }
}
