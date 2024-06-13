using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Job.Services.Models;
using Job.Services.Contracts;

namespace Job.Services.Controllers
{
    [Route("api/JobStatus")]
    [ApiController]
    public class JobStatusController : ControllerBase
    {
        private readonly AppDbContext _context;

        public JobStatusController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/JobStatus
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobStatusDTO>>> GetJobStatuses()
        {
            return await _context.JobStatuses
                .Select(x => (JobStatusDTO)x)
                .ToListAsync();
        }

        // GET: api/JobStatus/5
        [HttpGet("{id}")]
        public async Task<ActionResult<JobStatusDTO>> GetJobStatus(long id)
        {
            var jobStatus = await _context.JobStatuses.FindAsync(id);

            if (jobStatus == null)
            {
                return NotFound();
            }

            return (JobStatus)jobStatus;
        }

        // PUT: api/JobStatus/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJobStatus(long id, JobStatusDTO jobStatus)
        {
            if (id != jobStatus.Id)
            {
                return BadRequest();
            }

            _context.Entry((JobStatus)jobStatus).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JobStatusExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/JobStatus
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<JobStatusDTO>> PostJobStatus(JobStatusDTO jobStatus)
        {
            _context.JobStatuses.Add((JobStatus)jobStatus);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetJobStatus", new { id = jobStatus.Id }, (JobStatusDTO)jobStatus);
        }

        // DELETE: api/JobStatus/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJobStatus(long id)
        {
            var jobStatus = await _context.JobStatuses.FindAsync(id);
            if (jobStatus == null)
            {
                return NotFound();
            }

            _context.JobStatuses.Remove(jobStatus);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool JobStatusExists(long id)
        {
            return _context.JobStatuses.Any(e => e.Id == id);
        }
    }
}
