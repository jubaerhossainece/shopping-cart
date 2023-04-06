Setup flow of this project:-

1. Clone this repository in your local computer.

2. Install composer files, create a .env file using .env.example file in you root directory and 
generate application key using key:generate artisan command.

3. Set up DB configuration in .env file.

4. Run migrate artisan command to create all the tables needed for this project.

5. After table migration, run db:seed artisan command to generate 10 new rows in products table.

6. Now install all javascript packages using "npm install" command.

7. Run this project on a server and register as a user. After registration login to dashboard to add prouct items to the cart.
