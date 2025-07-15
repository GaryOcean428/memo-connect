#!/bin/bash

echo "=== Gary-Zero Health Check ==="

# Security audit
echo "🔒 Running security audit..."
npm audit --level moderate
if [ $? -eq 0 ]; then
    echo "✅ No moderate+ security issues found"
else
    echo "⚠️  Security issues detected"
fi

# Check for outdated packages
echo ""
echo "📦 Checking for outdated packages..."
npm outdated
if [ $? -eq 0 ]; then
    echo "✅ All packages are up to date"
else
    echo "⚠️  Some packages need updates"
fi

# Build check
echo ""
echo "🔨 Testing build..."
npm run build --quiet
if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi

# Linting check
echo ""
echo "🧹 Running linter..."
npm run lint --quiet
if [ $? -eq 0 ]; then
    echo "✅ No linting issues"
else
    echo "⚠️  Linting issues found"
fi

# Test check
echo ""
echo "🧪 Running tests..."
npm run test -- --run --silent
if [ $? -eq 0 ]; then
    echo "✅ All tests passing"
else
    echo "❌ Tests failed"
    exit 1
fi

echo ""
echo "=== Health Check Complete ==="
echo "✨ System health status: $(date)"