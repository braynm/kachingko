# Kachingko

A comprehensive personal finance tool for tracking credit card spending, analyzing expenses, and managing budgets with intelligent categorization and insights.

## What It Does

This application helps you:

- **Import & Parse CC Statements**: Automatically extract transaction data from PDF statements
- **Expense Categorization**: Smart categorization of transactions with manual override options (Available soon!)
- **Spending Analytics**: Detailed insights into spending patterns, trends, and budget performance
- **Multi-Bank Support**: Seamlessly handle statements from different Philippine banks
- **Budget Management**: Set spending limits and track progress across categories
- **Visual Reports**: Interactive charts and graphs for better financial understanding

## Bank Support

Currently supported Philippine banks:

[x] RCBC (Rizal Commercial Banking Corporation)
[x] EastWest Bank
[ ] BPI
[ ] BDO
[ ] Metrobank

*Want support for your bank? Open an issue with a sample statement (remove sensitive data) and we'll add it!*

## Setup Guide

### Prerequisites

- **Node.js** 22.17.0+
- **Elixir** 1.15+
- **Phoenix** 1.7+
- **PostgreSQL** 14+
- **Docker** (Available soon!)

### 🚀 Quick Start

1. **Clone the repository**
```bash
   git clone https://github.com/braynm/kachingko
   cd kachingko/web-app
   npm install && npm run dev
