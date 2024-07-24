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
    [Route("api/Locations")]
    [ApiController]
    public class LocationsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LocationsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Locations
        [Authorize, HttpGet]
        public async Task<ActionResult<IEnumerable<LocationDTO>>> GetLocations()
        {
            return await _context.Locations
                .Select(x => (LocationDTO)x)
                .ToListAsync();
        }

        // GET: api/Locations/5
        [Authorize, HttpGet("{id}")]
        public async Task<ActionResult<LocationDTO>> GetLocation(long id)
        {
            var location = await _context.Locations.FindAsync(id);
            if (location == null)
            {
                return NotFound();
            }

            return this.EntityToDto(location);
        }

        // PUT: api/Locations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize, HttpPut("{id}")]
        public async Task<IActionResult> PutLocation(long id, LocationDTO location)
        {
            if (id != location.Id)
            {
                return BadRequest();
            }

            _context.Entry(this.DtoToEntity(location)).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LocationExists(id))
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

        // POST: api/Locations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize, HttpPost]
        public async Task<ActionResult<LocationDTO>> PostLocation(LocationDTO location)
        {
            var newLocation = this.DtoToEntity(location);
            _context.Locations.Add(newLocation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLocation", new { id = newLocation.Id }, this.EntityToDto(newLocation));
        }

        // DELETE: api/Locations/5
        [Authorize, HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLocation(long id)
        {
            var location = await _context.Locations.FindAsync(id);
            if (location == null)
            {
                return NotFound();
            }

            _context.Locations.Remove(location);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LocationExists(long id)
        {
            return _context.Locations.Any(e => e.Id == id);
        }

        private Location DtoToEntity(LocationDTO location)
        {
            return new Location()
            {
                Id = location.Id,
                Name = location.Name,
                CreatedDate = location.CreatedDate,
                Lng = location.Lng,
                Lat = location.Lat,
                Zoom = location.Zoom
            };
        }

        private LocationDTO EntityToDto(Location location)
        {
            return new LocationDTO()
            {
                Id = location.Id,
                Name = location.Name,
                CreatedDate = location.CreatedDate,
                Lng = location.Lng,
                Lat = location.Lat,
                Zoom = location.Zoom
            };
        }
    }
}
