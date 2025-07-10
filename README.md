# TechXpress

TechXpress is an innovative e-commerce platform designed for buying and selling electronic products, including smartphones, laptops, accessories, and other tech gadgets.

## Features

- **Product Catalog**: Browse a wide selection of electronics and accessories.
- **User Accounts & Authentication**: Secure registration and login with ASP.NET Core Identity, requiring email/phone confirmation.
- **Shopping Cart**: Add, remove, and update product quantities; view and manage your cart with an intuitive interface.
- **Wishlist**: Save products to your wishlist for future purchases.
- **Order Management**: Place orders and track their status.
- **Payment Integration**: Secure payments processed via Stripe.
- **Responsive UI**: Modern, mobile-friendly design using custom CSS and JavaScript for smooth user experience.
- **Admin Features**: (If implemented) Product management, order tracking, and analytics.

## Architecture

TechXpress follows a **3-tier architecture**:
- **Presentation Layer**: ASP.NET Core MVC with Razor views and custom frontend (HTML, CSS, JavaScript).
- **Business Logic Layer (BLL)**: Handles application logic, services, and processing.
- **Data Access Layer (DAL)**: Manages data storage and retrieval using Entity Framework Core and SQL Server.

This separation ensures modularity, scalability, and maintainability.

## Technologies Used

- **Backend**: ASP.NET Core
- **Frontend**: HTML, CSS (custom styles for cart, product pages, checkout, etc.), JavaScript (jQuery for UI interaction)
- **Database**: SQL Server (via Entity Framework Core)
- **ORM**:  Entity Framework Core
- **Authentication**: ASP.NET Core Identity
- **Payment**: Stripe API integration

## Project Structure

- `TechXpress/TechXpress/Program.cs` - Main entry point and service configuration.
- `Controllers/` - MVC controllers for products, cart, wishlist, orders, etc.
- `Views/` - Razor views for rendering UI pages.
- `wwwroot/css/` - Custom stylesheets for layout, cart, and responsive design.
- `wwwroot/js/` - JavaScript for UI interactivity (e.g., responsive navigation, product carousel).
- `Context/` and `DAL/` - Data access layers and database context.
- `BLL/` - Business logic and service implementations.

## Getting Started

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Mahmoud-Elmokaber/TechXpress.git
   cd TechXpress
   ```

2. **Configure the Database**
   - Update the connection string in `appsettings.json` to point to your SQL Server instance.

3. **Set Stripe API Keys**
   - Add your Stripe keys in the configuration section (e.g., `appsettings.json` under `"Stripe"`).

4. **Run Database Migrations**
   ```bash
   dotnet ef database update
   ```

5. **Run the Application**
   ```bash
   dotnet run --project TechXpress/TechXpress
   ```

6. **Access the App**
   - Open your browser and go to `https://localhost:5001` (or the port specified in launch settings).

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

*TechXpress aims to provide a seamless, secure, and modern online shopping experience for tech enthusiasts!*
