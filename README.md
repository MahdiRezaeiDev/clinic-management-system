
# Clinic Management System

A comprehensive **Laravel-based Clinic Management System** to manage patients, staff, pharmacy, lab, dental, emergency, gynecology, inpatient services, income, expenses, and payroll. Supports both **prescription** and **over-the-counter (OTC)** pharmacy sales, with optional itemized details.

---

## Features

* **User Management:** Register and manage system users.
* **Staff Management:** Doctors, nurses, pharmacists, and support staff with roles and base salaries.
* **Patient Management:** Track patient details and medical visits.
* **Suppliers Management:** Track suppliers for pharmacy purchases and installments.
* **Income Tracking:** Record income from visits, lab, dental, emergency, gynecology, inpatient, and pharmacy. Optional description field for notes.
* **Expenses Tracking:** Track building, kitchen, pharmacy purchase, salaries, overtime, installments, and other expenses. Optional description field.
* **Payroll:** Manage staff salaries and overtime.
* **Pharmacy Management:**
  * Prescription sales with patient and doctor linkage.
  * OTC sales without patient/doctor, optional itemization.
* **Modular Migrations:** Each table has its own migration for flexibility and maintainability.

---

## Installation

1. Clone the repository:

<pre class="overflow-visible!" data-start="1439" data-end="1550"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>git </span><span>clone</span><span> https://github.com/your-username/clinic-management-system.git
</span><span>cd</span><span> clinic-management-system
</span></span></code></div></div></pre>

2. Install dependencies:

<pre class="overflow-visible!" data-start="1579" data-end="1607"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>composer install
</span></span></code></div></div></pre>

3. Copy `.env.example` to `.env` and configure database settings:

<pre class="overflow-visible!" data-start="1677" data-end="1734"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>cp</span><span> .env.example .</span><span>env</span><span>
php artisan key:generate
</span></span></code></div></div></pre>

4. Run migrations:

<pre class="overflow-visible!" data-start="1757" data-end="1788"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>php artisan migrate
</span></span></code></div></div></pre>

5. (Optional) Seed initial data if you create seeders:

<pre class="overflow-visible!" data-start="1847" data-end="1878"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>php artisan db:seed
</span></span></code></div></div></pre>

6. Serve the application:

<pre class="overflow-visible!" data-start="1908" data-end="1937"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>php artisan serve
</span></span></code></div></div></pre>

---

## Database Structure

* **Users** → System users for authentication.
* **Staff** → Doctors, nurses, pharmacists, and other staff roles.
* **Patients** → Patient information and demographics.
* **Suppliers** → Companies that supply drugs or other services.
* **Incomes** → All clinic income categories, linked to staff and patients where relevant.
* **Expenses** → All expense categories, linked to staff or suppliers where relevant.
* **Salaries & Overtimes** → Staff payroll management.
* **Pharmacy Sales & Items** → Supports both prescription and OTC sales.

---

## Usage

* Record **clinic income** via the `incomes` table.
* Record **expenses** via the `expenses` table.
* Track **pharmacy sales** through `pharmacy_sales` and optionally `pharmacy_sale_items`.
* Manage **staff salaries and overtime** in dedicated tables.
* Use `role` in `staff` table to manage permissions and reporting.

---

## Contribution

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

---

## License

This project is open-source and available under the  **MIT License** .
