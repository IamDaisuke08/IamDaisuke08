using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Job.Services.Models;
using Job.Services.Contracts;
using Microsoft.AspNetCore.Authorization;

namespace Job.Services.Controllers
{
    [Route("api/JobApplications")]
    [ApiController]
    public class JobApplicationsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public JobApplicationsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/JobApplications
        [Authorize, HttpGet]
        public async Task<ActionResult<IEnumerable<JobApplicationDTO>>> GetJobApplications()
        {
            return await _context.JobApplications
                .Select(x => (JobApplicationDTO)x)
                .ToListAsync();
        }

        // GET: api/JobApplications/5
        [Authorize, HttpGet("{id}")]
        public async Task<ActionResult<JobApplicationDTO>> GetJobApplication(long id)
        {
            var jobApplication = await _context.JobApplications.FindAsync(id);
            if (jobApplication == null)
            {
                return NotFound();
            }

            return this.EntityToDto(jobApplication);
        }

        // PUT: api/JobApplications/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize, HttpPut("{id}")]
        public async Task<IActionResult> PutJobApplication(long id, JobApplicationDTO jobApplication)
        {
            if (id != jobApplication.Id)
            {
                return BadRequest();
            }

            _context.Entry(this.DtoToEntity(jobApplication)).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JobApplicationExists(id))
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

        // POST: api/JobApplications
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize, HttpPost]
        public async Task<ActionResult<JobApplicationDTO>> PostJobApplication(JobApplicationDTO jobApplication)
        {
            var newJobApplication = this.DtoToEntity(jobApplication);
            _context.JobApplications.Add(newJobApplication);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetJobApplication", new { id = newJobApplication.Id }, this.EntityToDto(newJobApplication));
        }

        // DELETE: api/JobApplications/5
        [Authorize, HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJobApplication(long id)
        {
            var jobApplication = await _context.JobApplications.FindAsync(id);
            if (jobApplication == null)
            {
                return NotFound();
            }

            _context.JobApplications.Remove(jobApplication);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool JobApplicationExists(long id)
        {
            return _context.JobApplications.Any(e => e.Id == id);
        }

        private JobApplication DtoToEntity(JobApplicationDTO jobApplication)
        {
            return new JobApplication()
            {
                Id = jobApplication.Id,
                CompanyName = jobApplication.CompanyName,
                Position = jobApplication.Position,
                LocationId = jobApplication.LocationId,
                StatusId = jobApplication.StatusId,
                Comment = jobApplication.Comment,
                CreatedDate = jobApplication.CreatedDate
            };
        }

        private JobApplicationDTO EntityToDto(JobApplication jobApplication)
        {
            return new JobApplicationDTO()
            {
                Id = jobApplication.Id,
                CompanyName = jobApplication.CompanyName,
                Position = jobApplication.Position,
                LocationId = jobApplication.LocationId,
                StatusId = jobApplication.StatusId,
                Comment = jobApplication.Comment,
                CreatedDate = jobApplication.CreatedDate
            };
        }
    }
}
