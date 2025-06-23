#!/bin/bash

# Security Check Script for HirableResume
# Run this before making the repository public

echo "🔍 Running security checks..."

# Check for common API key patterns
echo "Checking for exposed API keys..."
if grep -r "sk-" --exclude-dir=node_modules --exclude-dir=.git . | grep -v ".env.example" | grep -v "security-check.sh"; then
    echo "❌ Found potential API keys in code!"
    exit 1
fi

# Check for Firebase keys
echo "Checking for exposed Firebase keys..."
if grep -r "AIzaSy" --exclude-dir=node_modules --exclude-dir=.git . | grep -v ".env.example"; then
    echo "❌ Found Firebase API keys in code!"
    exit 1
fi

# Check for hardcoded secrets
echo "Checking for hardcoded secrets..."
if grep -r "secret" --exclude-dir=node_modules --exclude-dir=.git . | grep -i "=" | grep -v ".env.example" | grep -v "security-check.sh"; then
    echo "⚠️  Found potential secrets - please review manually"
fi

# Check for .env files in git
echo "Checking for .env files in git..."
if git ls-files | grep "\.env$"; then
    echo "❌ Found .env files tracked by git!"
    exit 1
fi

# Check if .env.example exists
if [ ! -f ".env.example" ]; then
    echo "❌ .env.example file is missing!"
    exit 1
fi

# Check if sensitive files are in .gitignore
echo "Checking .gitignore..."
if ! grep -q "\.env" .gitignore; then
    echo "❌ .env files not properly ignored in .gitignore!"
    exit 1
fi

echo "✅ Security checks passed!"
echo "📋 Manual checklist:"
echo "  - Review all environment variables in .env.example"
echo "  - Ensure Firebase security rules are configured"
echo "  - Verify API rate limits are in place"
echo "  - Check that error messages don't expose sensitive data"
echo "  - Test authentication and authorization"