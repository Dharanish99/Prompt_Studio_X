# TODO: Fix Hardcoded localhost:5000 URLs for Production Deployment

## Completed Tasks
- [x] Analyze server/config/passport.js - Already using environment variables with localhost fallback (correct)
- [x] Analyze client/src/components/LoginPage.js - Added fallback to BACKEND_URL
- [x] Analyze client/src/components/ImagePromptEnhancer.js - Added fallback to BACKEND_URL
- [x] Analyze server/routes/authRoutes.js - Added fallback to FRONTEND_URL
- [x] Global search for "http://localhost:5000" - Identified all instances, most are already handled or acceptable

## Summary of Changes
- **client/src/components/LoginPage.js**: Added `|| "http://localhost:5000"` to BACKEND_URL
- **client/src/components/ImagePromptEnhancer.js**: Added `|| "http://localhost:5000"` to BACKEND_URL
- **server/routes/authRoutes.js**: Added `|| "http://localhost:3000"` to FRONTEND_URL

## Environment Variables Required
- **Server**: SERVER_URL (for passport callbacks), CLIENT_URL (for auth redirects)
- **Client**: REACT_APP_API_URL (for API calls)

## Next Steps for Deployment
- Ensure SERVER_URL and CLIENT_URL are set in Render environment variables
- Ensure REACT_APP_API_URL is set in Render build environment
- Test OAuth flow in production to confirm redirects work correctly
