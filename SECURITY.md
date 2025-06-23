# Security Policy

## Environment Variables

This project uses environment variables to store sensitive information. **Never commit actual API keys or secrets to the repository.**

### Required Environment Variables

Copy `.env.example` to `.env.local` and fill in your actual values:

```bash
cp .env.example .env.local
```

### Firebase Security

- Use Firebase Security Rules to protect your Firestore database
- Enable only necessary authentication providers
- Regularly review and update your Firebase project permissions

### API Key Security

- Keep your OpenRouter API key secure and never expose it in client-side code
- Rotate API keys regularly
- Monitor API usage for unusual activity

### Deployment Security

When deploying to production:

1. Set all environment variables in your deployment platform
2. Use different Firebase projects for development and production
3. Enable proper CORS settings
4. Use HTTPS in production

## Reporting Security Issues

If you discover a security vulnerability, please email security@hirableresume.com instead of creating a public issue.

## Security Best Practices

- Never commit `.env` files
- Use strong, unique passwords for all accounts
- Enable two-factor authentication where possible
- Regularly update dependencies
- Review code for security vulnerabilities before merging