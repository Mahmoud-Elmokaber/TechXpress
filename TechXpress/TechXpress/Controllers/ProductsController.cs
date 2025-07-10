using Microsoft.AspNetCore.Mvc;
using TechXpress_BLL.Dtos;
using TechXpress_BLL.Services.Contract;
using System.Linq;
using TechXpress_PL.ViewModels;
using TechXpress_DAL.Models;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using TechXpress.Context;

namespace TechXpress.Controllers
{
    public class ProductsController : Controller
    {
        private readonly IproductSevice _productService;
        private readonly ApplicationDbContext _context;
        
        public ProductsController(IproductSevice productService, ApplicationDbContext context)
        {
            _productService = productService;
            _context = context;
        }

        public IActionResult Index(int id)
        {
            
            var product = _productService.GetProductById(id);
            if (product == null)
            {
                return NotFound();
            }
            
            // Load reviews for the product
            var reviews = _context.Reviews
                .Where(r => r.ProductId == id && !r.IsDeleted)
                .Include(r => r.User)
                .OrderByDescending(r => r.CreatedAt)
                .ToList();
            
            product.Reviews = reviews;
            
            var relatedProducts = _productService.GetAllProducts()
                .Where(p => p.CategoryId == product.CategoryId && p.Id != product.Id)
                .Take(4)
                .ToList();
            var productDetailsVm = new ProductDetailsVm()
            {
                Product = product,
                RelatedProducts = _productService.GetAllProducts()
            };


            return View(productDetailsVm);
        }

        [HttpPost]
        public IActionResult AddReview(int id, string UserName, string Email, string Comment, int Rating)
        {
            if (!ModelState.IsValid)
            {
                TempData["ErrorMessage"] = "Please fill in all required fields.";
                return RedirectToAction("Index", new { id });
            }

            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                
                var review = new Review
                {
                    ProductId = id,
                    UserName = UserName,
                    Email = Email,
                    Comment = Comment,
                    Rating = Rating,
                    CreatedAt = DateTime.UtcNow,
                    IsDeleted = false
                };

                _context.Reviews.Add(review);
                _context.SaveChanges();

                TempData["SuccessMessage"] = "Review submitted successfully!";
                return RedirectToAction("Index", new { id });
            }
            catch (Exception ex)
            {
                TempData["ErrorMessage"] = "Error submitting review. Please try again.";
                return RedirectToAction("Index", new { id });
            }
        }
    }
}
