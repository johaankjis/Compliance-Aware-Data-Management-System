# Compliance-Aware Data Management System

A modern, HIPAA-compliant data management platform for healthcare organizations to securely upload, validate, and manage sensitive healthcare data with automated compliance checks and comprehensive audit logging.

## 🚀 Features

### Core Functionality
- **Data Upload & Validation**: Upload CSV files with automatic HIPAA compliance validation
- **PHI Detection & Masking**: Automatic detection and masking of Protected Health Information (PHI) identifiers
- **Real-time Validation**: Instant feedback on compliance status and policy adherence
- **Comprehensive Dashboard**: Visual analytics and metrics for compliance monitoring
- **Access Logging**: Complete audit trail of all data access and modifications
- **Compliance Reports**: Generate detailed reports and analytics dashboards

### Security & Compliance
- **HIPAA Compliant**: Built-in support for HIPAA compliance policies
- **PHI Identifier Detection**: Validates all 18 HIPAA identifiers are properly masked
- **Data Encryption**: AES-256 encryption validation for sensitive fields
- **Access Control**: Role-based access control (RBAC) validation
- **Audit Trail**: Comprehensive logging of user activities, IP addresses, and timestamps
- **User Activity Tracking**: Monitor and analyze access patterns

## 🛠️ Technology Stack

### Frontend
- **Framework**: [Next.js 16.0.0](https://nextjs.org/) (React 19.2.0)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4.1.9
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form with Zod validation

### Backend (Current: Mock Data)
- **Database**: PostgreSQL (schema provided for production)
- **Mock Layer**: In-memory data store for MVP demonstration
- **Future**: Production-ready PostgreSQL integration

### Development Tools
- **Package Manager**: pnpm
- **Linting**: ESLint
- **Analytics**: Vercel Analytics

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js**: Version 18.x or higher
- **pnpm**: Version 8.x or higher (recommended) or npm/yarn
- **Git**: For version control

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/johaankjis/Compliance-Aware-Data-Management-System.git
   cd Compliance-Aware-Data-Management-System
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables** (for production)
   ```bash
   # Create a .env.local file
   cp .env.example .env.local
   # Add your PostgreSQL connection string and other configs
   ```

## 🚀 Usage

### Development Mode

Start the development server:
```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Production Build

Build the application for production:
```bash
pnpm build
# or
npm run build
```

Start the production server:
```bash
pnpm start
# or
npm start
```

### Linting

Run ESLint to check code quality:
```bash
pnpm lint
# or
npm run lint
```

## 📁 Project Structure

```
Compliance-Aware-Data-Management-System/
├── app/                          # Next.js app directory
│   ├── dashboard/               # Dashboard page and components
│   ├── logs/                    # Access logs page
│   ├── reports/                 # Compliance reports and analytics
│   ├── upload/                  # Data upload page
│   ├── layout.tsx               # Root layout component
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── ui/                      # Reusable UI components (Radix UI)
│   ├── access-logs-table.tsx    # Access logs table component
│   ├── access-trends-chart.tsx  # Access trends visualization
│   ├── compliance-chart.tsx     # Compliance metrics chart
│   ├── datasets-list.tsx        # Dataset list component
│   ├── theme-provider.tsx       # Theme management
│   ├── upload-form.tsx          # File upload form
│   └── user-activity-chart.tsx  # User activity visualization
├── lib/                         # Utility libraries
│   ├── db.ts                    # Database functions (mock data)
│   └── utils.ts                 # Helper utilities
├── scripts/                     # Database migration scripts
│   ├── 001-create-tables.sql    # Table creation script
│   ├── 002-seed-policies.sql    # Compliance policies seed data
│   └── 003-seed-sample-data.sql # Sample data for testing
├── public/                      # Static assets
├── hooks/                       # Custom React hooks
├── styles/                      # Additional stylesheets
├── components.json              # shadcn/ui configuration
├── next.config.mjs              # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── postcss.config.mjs           # PostCSS configuration
└── package.json                 # Project dependencies
```

## 🗄️ Database Schema

The system uses PostgreSQL with the following main tables:

### `data_records`
Stores uploaded dataset information with validation status
- Primary fields: `id`, `dataset_name`, `owner_id`, `validation_status`, `pii_masked`, `record_count`

### `access_logs`
Tracks all user activities and data access events
- Primary fields: `id`, `user_id`, `action`, `dataset_id`, `timestamp`, `ip_address`

### `compliance_policies`
Defines HIPAA compliance policies and rules
- Primary fields: `id`, `policy_name`, `policy_type`, `description`, `is_active`

### `validation_results`
Stores detailed validation check results
- Primary fields: `id`, `dataset_id`, `policy_id`, `check_result`, `details`

See `scripts/001-create-tables.sql` for complete schema definitions.

## 🏥 HIPAA Compliance Features

### Automated Checks
1. **PHI Identifier Detection**: Validates masking of all 18 HIPAA identifiers including:
   - Names, addresses, dates (except year)
   - Social Security Numbers
   - Medical record numbers
   - Email addresses and phone numbers
   - Account numbers and more

2. **Encryption Validation**: Ensures AES-256 encryption on sensitive fields

3. **Access Control**: Role-based permissions (Researcher, Data Manager, Security Officer)

### Audit Trail
- Complete logging of all data access
- User activity tracking with timestamps
- IP address logging for security monitoring
- Action-based filtering (VIEW, UPLOAD, DOWNLOAD, VALIDATE, AUDIT)

## 📊 Main Pages

### Home Page (`/`)
- Landing page with feature overview
- Quick access to upload and dashboard
- HIPAA compliance badge

### Dashboard (`/dashboard`)
- Validation status overview
- Dataset statistics
- Recent access activity
- Active compliance policies
- Complete dataset list

### Upload Page (`/upload`)
- CSV file upload interface
- Automatic validation on upload
- Real-time feedback

### Reports Page (`/reports`)
- Compliance metrics with visual charts
- Access analytics and trends
- User activity breakdown
- Exportable reports

### Logs Page (`/logs`)
- Complete access log history
- Filterable by user, action, and date
- Detailed audit information

## 🔐 Security Best Practices

- All sensitive data is validated against HIPAA policies
- PHI identifiers are automatically detected and flagged
- Comprehensive audit logging for compliance requirements
- Role-based access control for different user types
- IP address tracking for security monitoring

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## 📧 Support

For questions, issues, or feature requests, please open an issue in the GitHub repository.

---

**Note**: This is an MVP demonstration. The current version uses mock data for demonstration purposes. For production deployment, integrate the provided PostgreSQL schema and implement the database connection layer in `lib/db.ts`.
