# Technical Implementation Guide

## National Climate Transparency Platform for IT Teams and System Integrators

---

## Overview

This guide provides technical specifications for deploying, configuring, and maintaining the National Climate Transparency Platform (NCTP). It is intended for IT professionals, system administrators, and technical consultants.

---

## System Requirements

### Minimum Infrastructure

| Component | Specification |
|-----------|--------------|
| **Application Servers** | 2x 4-core CPU, 16GB RAM, 100GB SSD |
| **Database Server** | 8-core CPU, 32GB RAM, 500GB SSD |
| **Cache Server** | 2-core CPU, 8GB RAM |
| **Load Balancer** | Cloud-managed or HAProxy |
| **Object Storage** | 1TB+ expandable |

### Recommended Production

| Component | Specification |
|-----------|--------------|
| **Application Servers** | 3x 8-core CPU, 32GB RAM, 200GB SSD |
| **Database Server** | 16-core CPU, 64GB RAM, 1TB SSD (with replica) |
| **Cache Cluster** | 3x 4-core CPU, 16GB RAM |
| **Elasticsearch** | 3-node cluster, 16GB RAM each |
| **Load Balancer** | Cloud-managed with SSL termination |
| **Object Storage** | 5TB+ with replication |

### Software Stack

```yaml
Runtime:
  - Node.js: 20.x LTS
  - Python: 3.11+
  - pnpm: 8.x

Frontend:
  - Next.js: 16.x
  - React: 19.x
  - Tailwind CSS: 4.x

Backend:
  - Express.js or Fastify
  - PostgreSQL: 15+
  - Redis: 7.x
  - Elasticsearch: 8.x

Infrastructure:
  - Docker: 24.x
  - Kubernetes: 1.28+ (optional)
  - Nginx: 1.24+
```

---

## Deployment Options

### Option 1: Docker Compose (Development/Small Scale)

```yaml
# docker-compose.yml
version: '3.8'

services:
  web:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/nctp
      - REDIS_URL=redis://cache:6379
    depends_on:
      - db
      - cache

  api:
    build: ./backend
    ports:
      - "4000:4000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/nctp
      - REDIS_URL=redis://cache:6379
    depends_on:
      - db
      - cache

  db:
    image: postgres:15
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=nctp
      - POSTGRES_PASSWORD=password

  cache:
    image: redis:7
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

### Option 2: Kubernetes (Production)

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nctp-web
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nctp-web
  template:
    metadata:
      labels:
        app: nctp-web
    spec:
      containers:
      - name: web
        image: nctp/web:latest
        ports:
        - containerPort: 3000
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "2Gi"
            cpu: "2000m"
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: nctp-secrets
              key: database-url
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
---
apiVersion: v1
kind: Service
metadata:
  name: nctp-web
spec:
  selector:
    app: nctp-web
  ports:
  - port: 80
    targetPort: 3000
  type: ClusterIP
```

### Option 3: Cloud Managed (AWS Example)

```
Architecture:
┌─────────────────────────────────────────────────────────────────────────┐
│                           AWS Cloud                                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────┐    ┌─────────────┐    ┌─────────────────────────────┐     │
│  │CloudFront│───►│    ALB      │───►│  ECS Fargate / EKS          │     │
│  │  (CDN)   │    │(Load Balancer)   │  (Application Containers)    │     │
│  └─────────┘    └─────────────┘    └─────────────────────────────┘     │
│                                              │                          │
│                                              ▼                          │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                         VPC Private Subnets                       │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │   │
│  │  │   RDS        │  │ ElastiCache  │  │ OpenSearch   │           │   │
│  │  │ PostgreSQL   │  │   Redis      │  │              │           │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘           │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                  │
│  │     S3       │  │   Lambda     │  │    SES       │                  │
│  │  (Storage)   │  │ (Functions)  │  │  (Email)     │                  │
│  └──────────────┘  └──────────────┘  └──────────────┘                  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Installation

### Step 1: Clone Repository

```bash
git clone https://github.com/nctp/platform.git
cd platform
```

### Step 2: Environment Configuration

```bash
# Copy environment template
cp .env.example .env.local

# Edit configuration
nano .env.local
```

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/nctp
DATABASE_POOL_SIZE=20

# Redis
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your-secure-secret-key
SESSION_SECRET=another-secure-secret

# External Services
CAD_API_URL=https://cad.unfccc.int/api
CAD_API_KEY=your-cad-api-key

# Email
SMTP_HOST=smtp.provider.com
SMTP_USER=noreply@country.gov
SMTP_PASS=email-password

# Storage
S3_BUCKET=nctp-documents
S3_REGION=eu-west-1
AWS_ACCESS_KEY=your-access-key
AWS_SECRET_KEY=your-secret-key
```

### Step 3: Install Dependencies

```bash
# Install frontend dependencies
pnpm install

# Install backend dependencies (if separate)
cd backend && pip install -r requirements.txt
```

### Step 4: Database Setup

```bash
# Run migrations
pnpm run db:migrate

# Seed reference data
pnpm run db:seed

# Verify setup
pnpm run db:verify
```

### Step 5: Build and Start

```bash
# Development
pnpm dev

# Production build
pnpm build
pnpm start
```

---

## Configuration

### Application Configuration

```typescript
// config/app.config.ts
export const config = {
  app: {
    name: 'NCTP',
    country: 'KEN', // ISO 3166-1 alpha-3
    baseYear: 2015,
    defaultCurrency: 'USD',
  },

  mrv: {
    inventoryStartYear: 2000,
    ipccVersion: '2006', // or '2019-refinement'
    defaultTier: 1,
    gwpSource: 'AR5',
  },

  ndc: {
    currentVersion: '3.0',
    targetYear: 2035,
    baseYear: 2019,
  },

  registry: {
    creditPrefix: 'KEN',
    minCreditingPeriod: 5,
    maxCreditingPeriod: 30,
    vcmEnabled: true,
    article6Enabled: true,
  },

  integration: {
    cadSyncEnabled: true,
    cadSyncInterval: 3600000, // 1 hour
  }
};
```

### IPCC Sector Configuration

```typescript
// config/sectors.config.ts
export const sectors = [
  {
    code: '1',
    name: 'Energy',
    categories: [
      { code: '1A', name: 'Fuel Combustion Activities' },
      { code: '1A1', name: 'Energy Industries' },
      { code: '1A2', name: 'Manufacturing Industries' },
      { code: '1A3', name: 'Transport' },
      { code: '1A4', name: 'Other Sectors' },
      { code: '1B', name: 'Fugitive Emissions' },
      // ... more categories
    ]
  },
  // ... more sectors
];
```

### Role Configuration

```typescript
// config/roles.config.ts
export const roles = {
  SYSTEM_ADMIN: {
    permissions: ['*'],
  },
  MRV_COORDINATOR: {
    permissions: [
      'mrv:*',
      'ndc:read',
      'registry:projects:read',
      'reports:generate',
    ],
  },
  SECTOR_LEAD: {
    permissions: [
      'mrv:inventory:${sector}:*',
      'mrv:activity_data:${sector}:*',
    ],
  },
  PROJECT_DEVELOPER: {
    permissions: [
      'registry:projects:own:*',
      'registry:credits:own:read',
    ],
  },
  // ... more roles
};
```

---

## API Reference

### Authentication

```bash
# Login
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@ministry.gov",
  "password": "secure-password"
}

# Response
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "email": "user@ministry.gov",
    "role": "MRV_COORDINATOR"
  }
}
```

### MRV Endpoints

```bash
# Get inventory for year
GET /api/mrv/inventory/{year}
Authorization: Bearer {token}

# Submit activity data
POST /api/mrv/activity-data
Authorization: Bearer {token}
Content-Type: application/json

{
  "inventoryYear": 2023,
  "categoryCode": "1A1",
  "activityType": "electricity_generation",
  "value": 45000,
  "unit": "TJ",
  "source": "Energy Ministry Statistics",
  "documentation": "Reference to source document"
}

# Calculate emissions
POST /api/mrv/calculate
Authorization: Bearer {token}

{
  "inventoryYear": 2023,
  "categoryCode": "1A1",
  "recalculate": false
}
```

### NDC Endpoints

```bash
# Get NDC progress
GET /api/ndc/progress
Authorization: Bearer {token}

# Update target progress
POST /api/ndc/progress
Authorization: Bearer {token}

{
  "targetId": "uuid",
  "year": 2023,
  "actualValue": 45.2,
  "notes": "Based on 2023 inventory"
}
```

### Registry Endpoints

```bash
# List projects
GET /api/registry/projects
Authorization: Bearer {token}

# Create project
POST /api/registry/projects
Authorization: Bearer {token}

{
  "name": "Solar Project Alpha",
  "proponentId": "uuid",
  "sectorCode": "1A1",
  "methodology": "ACM0002",
  "expectedReductions": 50000,
  "creditingPeriodStart": "2024-01-01",
  "creditingPeriodEnd": "2033-12-31",
  "marketType": "ARTICLE_6"
}

# Issue credits
POST /api/registry/credits/issue
Authorization: Bearer {token}

{
  "projectId": "uuid",
  "monitoringPeriodStart": "2024-01-01",
  "monitoringPeriodEnd": "2024-12-31",
  "verifiedReductions": 48500,
  "verificationReportId": "uuid"
}
```

---

## Database Schema

### Key Tables

```sql
-- Organizations
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  country_code CHAR(3),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inventory Years
CREATE TABLE inventories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year INTEGER NOT NULL UNIQUE,
  status VARCHAR(50) DEFAULT 'DRAFT',
  total_emissions DECIMAL(15,2),
  submission_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Activity Data
CREATE TABLE activity_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inventory_id UUID REFERENCES inventories(id),
  category_code VARCHAR(20) NOT NULL,
  activity_type VARCHAR(100),
  value DECIMAL(15,4) NOT NULL,
  unit VARCHAR(50) NOT NULL,
  source TEXT,
  uncertainty DECIMAL(5,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Emissions
CREATE TABLE emissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inventory_id UUID REFERENCES inventories(id),
  category_code VARCHAR(20) NOT NULL,
  ghg_type VARCHAR(10) NOT NULL,
  value DECIMAL(15,4) NOT NULL,
  co2_equivalent DECIMAL(15,4),
  methodology_tier INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_number VARCHAR(50) UNIQUE,
  name VARCHAR(255) NOT NULL,
  proponent_id UUID REFERENCES organizations(id),
  sector_code VARCHAR(20),
  methodology VARCHAR(50),
  market_type VARCHAR(20),
  lifecycle_stage VARCHAR(50),
  expected_reductions DECIMAL(15,2),
  crediting_period_start DATE,
  crediting_period_end DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Credits
CREATE TABLE credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  serial_number VARCHAR(50) UNIQUE NOT NULL,
  project_id UUID REFERENCES projects(id),
  vintage_year INTEGER NOT NULL,
  quantity DECIMAL(15,4) NOT NULL,
  status VARCHAR(50) DEFAULT 'ACTIVE',
  issuance_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transactions
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(50) NOT NULL,
  from_account_id UUID,
  to_account_id UUID,
  quantity DECIMAL(15,4) NOT NULL,
  price_per_unit DECIMAL(10,2),
  status VARCHAR(50) DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transaction Credits (junction table)
CREATE TABLE transaction_credits (
  transaction_id UUID REFERENCES transactions(id),
  credit_id UUID REFERENCES credits(id),
  PRIMARY KEY (transaction_id, credit_id)
);
```

---

## Monitoring and Logging

### Health Checks

```bash
# Application health
GET /health

# Response
{
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "2025-01-15T10:30:00Z",
  "services": {
    "database": "healthy",
    "cache": "healthy",
    "storage": "healthy"
  }
}
```

### Logging Configuration

```typescript
// config/logging.config.ts
export const loggingConfig = {
  level: process.env.LOG_LEVEL || 'info',
  format: 'json',
  outputs: [
    { type: 'console' },
    { type: 'file', path: '/var/log/nctp/app.log' },
    { type: 'elasticsearch', index: 'nctp-logs' }
  ],

  // Audit logging for sensitive operations
  audit: {
    enabled: true,
    events: [
      'user.login',
      'inventory.submit',
      'credit.issue',
      'credit.transfer',
      'authorization.grant'
    ]
  }
};
```

### Metrics

```yaml
# Prometheus metrics exposed at /metrics
nctp_http_requests_total{method, path, status}
nctp_http_request_duration_seconds{method, path}
nctp_database_connections{state}
nctp_inventory_calculations_total{sector, year}
nctp_credits_issued_total{project_type, year}
nctp_active_users{role}
```

---

## Backup and Recovery

### Database Backup

```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR=/backups/nctp

# PostgreSQL dump
pg_dump -h localhost -U nctp_user -d nctp_db \
  -F c -f $BACKUP_DIR/nctp_$DATE.dump

# Upload to S3
aws s3 cp $BACKUP_DIR/nctp_$DATE.dump \
  s3://nctp-backups/database/nctp_$DATE.dump

# Retain last 30 days
find $BACKUP_DIR -name "*.dump" -mtime +30 -delete
```

### Recovery Procedure

```bash
# Restore from backup
pg_restore -h localhost -U nctp_user -d nctp_db \
  -c /backups/nctp/nctp_20250115.dump

# Verify integrity
pnpm run db:verify
```

---

## Security

### SSL/TLS Configuration

```nginx
# nginx.conf
server {
    listen 443 ssl http2;
    server_name nctp.country.gov;

    ssl_certificate /etc/ssl/certs/nctp.crt;
    ssl_certificate_key /etc/ssl/private/nctp.key;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers off;

    add_header Strict-Transport-Security "max-age=63072000" always;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Authentication Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API
    participant DB
    participant IdP as Identity Provider

    User->>Frontend: Login Request
    Frontend->>API: POST /auth/login
    API->>IdP: Verify Credentials
    IdP-->>API: User Validated
    API->>DB: Create Session
    API-->>Frontend: JWT Token
    Frontend-->>User: Logged In

    User->>Frontend: Protected Request
    Frontend->>API: Request + JWT
    API->>API: Validate JWT
    API->>DB: Check Permissions
    API-->>Frontend: Response
    Frontend-->>User: Data
```

---

## Troubleshooting

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Database connection failed | Wrong credentials or network | Check `.env`, verify connectivity |
| Slow inventory calculations | Large dataset, no indexing | Add indexes, optimize queries |
| Credit issuance failed | Validation errors | Check project status, verification |
| CAD sync errors | API key expired or network | Refresh credentials, check firewall |

### Debug Commands

```bash
# Check application logs
docker logs nctp-web --tail 100

# Database connectivity
psql -h localhost -U nctp_user -d nctp_db -c "SELECT 1"

# Redis connectivity
redis-cli ping

# API health
curl -s http://localhost:4000/health | jq

# Check running processes
pm2 status
```

---

## Support

### Technical Support

- **Email**: support@nctp-platform.org
- **Documentation**: https://docs.nctp-platform.org
- **Issue Tracker**: https://github.com/nctp/platform/issues

### Emergency Contacts

- **System Outages**: +1-XXX-XXX-XXXX (24/7)
- **Security Issues**: security@nctp-platform.org
