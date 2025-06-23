# Deployment Checklist

## Pre-Deployment Security Checklist

Before deploying to production, ensure you have completed the following:

### Environment Variables
- [ ] All environment variables are set in your deployment platform
- [ ] No hardcoded API keys or secrets in the codebase
- [ ] Different Firebase projects for development and production
- [ ] Production OpenRouter API key is set
- [ ] `NEXT_PUBLIC_BASE_URL` is set to your production domain

### Firebase Configuration
- [ ] Production Firebase project is created
- [ ] Firestore security rules are configured
- [ ] Authentication is properly configured
- [ ] Firebase hosting rules are set (if using Firebase hosting)

### Security
- [ ] HTTPS is enabled in production
- [ ] CORS settings are properly configured
- [ ] API rate limiting is implemented (if needed)
- [ ] Error logging is configured but doesn't expose sensitive data

### Code Quality
- [ ] All TypeScript errors are resolved
- [ ] Build process completes successfully
- [ ] All tests pass (if applicable)
- [ ] No console.log statements with sensitive data

### Performance
- [ ] Images are optimized
- [ ] Bundle size is acceptable
- [ ] Loading states are implemented
- [ ] Error boundaries are in place

## Deployment Steps

### Vercel Deployment

1. **Connect Repository**
   ```bash
   # Push your code to GitHub
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Configure Vercel**
   - Connect your GitHub repository to Vercel
   - Set environment variables in Vercel dashboard
   - Configure build settings if needed

3. **Environment Variables in Vercel**
   ```
   NEXT_PUBLIC_OPENROUTER_API_KEY=your_production_key
   NEXT_PUBLIC_FIREBASE_API_KEY=your_production_firebase_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_production_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_production_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_production_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_production_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_production_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_production_measurement_id
   NEXT_PUBLIC_BASE_URL=https://yourdomain.com
   ```

4. **Deploy**
   - Click "Deploy" in Vercel dashboard
   - Monitor deployment logs for any errors
   - Test the deployed application

### Post-Deployment

- [ ] Test all major features in production
- [ ] Verify authentication works
- [ ] Check that AI resume generation works
- [ ] Test PDF export functionality
- [ ] Verify affiliate tracking (if applicable)
- [ ] Monitor error logs for the first few hours

## Rollback Plan

If issues are discovered after deployment:

1. **Immediate Rollback**
   - Use Vercel's instant rollback feature
   - Or redeploy the previous working commit

2. **Fix and Redeploy**
   - Identify and fix the issue
   - Test locally
   - Deploy the fix

## Monitoring

Set up monitoring for:
- Application errors
- API usage and costs
- User authentication issues
- Performance metrics