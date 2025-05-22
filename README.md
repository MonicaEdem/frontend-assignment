# Products Dashboard

A React application for managing products — listing, adding, editing, deleting, filtering, and pagination.

## Live Demo

https://productss-dashboard.netlify.app/


## Setup Instructions

1. **Clone the repository**

git clone https://github.com/MonicaEdem/frontend-assignment
cd frontend-assignment

2. **Install dependencies**

npm install

3. **Start the development server**

npm run dev


# Assumptions & Decisions
The app expects the backend API to follow RESTful conventions (GET /products, POST /products, PUT /products/:id, DELETE /products/:id).

Basic product attributes include name, description, price, category, and rating.

Client-side validation is minimal; assumes backend will enforce data integrity.

Used Material UI for pagination and selects to speed up development.

Toast notifications added for user feedback on CRUD actions.

Pagination is client-side based on fetched data — no server-side pagination.

The api provided for the filter by category (: https://mock-data
josw.onrender.com/categories) displayed no data so the category were hardcoded (only about 3 options)



# Navigation Flow
Dashboard: Displays a paginated, filterable grid of products.

Add Product: Click "Add Product" to open a form for creating new products. Submit to add.

Edit Product: Click on a product card to view and edit details. Save changes to update.

Delete Product: Use the delete button on product cards to remove a product.

Filtering & Sorting: Use controls to filter by category, search by name, and sort by price.

Pagination: Navigate between pages and adjust the number of items per page.


# What I'd Improve With More Time
UI polish, a more responsive design improvements, and better mobile experience.

UI polish with animations, a more responsive design improvements, and better mobile experience.
