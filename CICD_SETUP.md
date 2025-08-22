# CI/CD Setup Documentation

This document provides comprehensive instructions for setting up Continuous Integration and Continuous Deployment (CI/CD) for the @enokdev/ng-panel library.

## Overview

The CI/CD pipeline automatically builds, tests, and publishes the ng-panel library to NPM when code is pushed to the `prod` branch. The workflow includes:

- ✅ Automated building and testing
- ✅ Automatic version bumping based on commit messages
- ✅ NPM package publishing
- ✅ Git tag creation for releases

## Workflow Triggers

The CI/CD pipeline triggers on:
- **Push to `prod` branch**: Builds, tests, and publishes to NPM
- **Pull Request to `prod` branch**: Builds and tests only (no publishing)

## Prerequisites

Before using the CI/CD pipeline, ensure you have the following configured:

### 0. Production Branch Setup

If the `prod` branch doesn't exist yet, create it:

```bash
# Create and switch to prod branch from master
git checkout master
git checkout -b prod

# Push the new branch to GitHub
git push -u origin prod
```

The `prod` branch should be your main release branch. Consider setting up branch protection rules in GitHub to require pull request reviews before merging.

### 1. NPM Token Configuration



You need to set up an NPM authentication token in your GitHub repository secrets:

1. **Generate NPM Token:**
   ```bash
   # Login to NPM
   npm login
   
   # Generate an automation token
   npm token create --type=automation
   ```

2. **Add to GitHub Secrets:**
   - Go to your repository on GitHub
   - Navigate to `Settings` > `Secrets and variables` > `Actions`
   - Click `New repository secret`
   - Name: `NPM_TOKEN`
   - Value: Your NPM automation token

### 2. NPM Package Configuration

Ensure your package is properly configured for publishing:

1. **Verify package.json settings** in `projects/ng-panel/package.json`:
   ```json
   {
     "name": "@enokdev/ng-panel",
     "publishConfig": {
       "access": "public"
     }
   }
   ```

2. **Test local publishing** (optional):
   ```bash
   npm run build:lib
   cd dist/ng-panel
   npm publish --dry-run
   ```

## Version Management

The pipeline automatically determines version bumps based on commit message conventions:

### Commit Message Conventions

| Commit Message Pattern | Version Bump | Example |
|------------------------|--------------|---------|
| `BREAKING CHANGE:` or `major:` | Major (1.0.0 → 2.0.0) | `major: redesign API interface` |
| `feat:` or `feature:` | Minor (1.0.0 → 1.1.0) | `feat: add new dashboard component` |
| Any other message | Patch (1.0.0 → 1.0.1) | `fix: resolve sidebar navigation bug` |

### Examples of Good Commit Messages

```bash
# Major version bump
git commit -m "BREAKING CHANGE: remove deprecated methods"
git commit -m "major: complete API redesign"

# Minor version bump  
git commit -m "feat: add user management component"
git commit -m "feature: implement dark mode support"

# Patch version bump
git commit -m "fix: resolve memory leak in table component"
git commit -m "docs: update installation instructions"
git commit -m "style: fix button alignment issues"
```

### Intelligent Version Conflict Resolution

The CI/CD pipeline now includes intelligent version conflict detection and resolution:

1. **Version Source Comparison**: Compares local `package.json` version with the latest published NPM version
2. **Smart Base Version Selection**: Uses the higher of the two versions as the base for calculation
3. **Automatic Conflict Resolution**: If the calculated version already exists on NPM:
   - Automatically increments to the next patch version
   - Repeats up to 5 times until an available version is found
   - Fails gracefully if no version can be found after 5 attempts
4. **Detailed Logging**: Provides clear feedback about version resolution process

Example scenario:
- Local version: `0.1.4`
- NPM version: `0.1.5` 
- Commit: `fix: resolve bug`
- Result: Uses `0.1.5` as base → calculates `0.1.6` → publishes `0.1.6`

## Workflow Steps

### Build and Test Job

1. **Checkout code** with full git history
2. **Setup Node.js 20** with npm cache
3. **Install dependencies** (`npm ci`)
4. **Build library** (`npm run build:lib`)
5. **Run tests in headless mode** (`npm run test:ci`)
6. **Upload build artifacts** for the publish job

### Publish Job (Production Only)

Only runs when pushing to `prod` branch:

1. **Download build artifacts** from the build job
2. **Intelligent version calculation**:
   - Compare local and NPM versions
   - Determine appropriate bump type from commit messages
   - Calculate next version with conflict resolution
   - Ensure version availability on NPM
3. **Update package.json** with new version
4. **Rebuild library** with updated version  
5. **Publish to NPM** with public access
6. **Create Git tag** for the new version

## Available NPM Scripts

The following scripts are available for local development and CI:

```bash
# Build the library
npm run build:lib

# Run tests (interactive)
npm run test

# Run tests (CI - headless)
npm run test:ci

# Run library-specific tests (headless)
npm run test:lib

# Pack library for testing
npm run pack:lib

# Publish library manually
npm run publish:lib
```

### CI/CD Testing Scripts

Validate the CI/CD workflow logic locally before pushing:

```bash
# Test version bump logic with various commit message scenarios
node scripts/test-version-logic.js

# Test version conflict resolution
node scripts/test-conflict-resolution.js

# Comprehensive workflow simulation (reproduces and validates the fix)
bash scripts/test-full-workflow.sh
```

## Development Workflow

### For Regular Development

1. Work on your feature branch
2. Create a pull request to `prod` branch
3. The CI will run tests automatically
4. After review and approval, merge to `prod`

### For Production Releases

1. **Ensure your commit message follows conventions**:
   ```bash
   git commit -m "feat: add new authentication module"
   ```

2. **Push to prod branch**:
   ```bash
   git push origin prod
   ```

3. **Monitor the workflow**:
   - Go to GitHub Actions tab
   - Watch the "Build and Publish to NPM" workflow
   - Verify successful completion

4. **Verify publication**:
   ```bash
   # Check the new version on NPM
   npm view @enokdev/ng-panel versions --json
   ```

## Troubleshooting

### Common Issues

1. **NPM Token Expired**
   - Error: `401 Unauthorized`
   - Solution: Generate a new NPM token and update GitHub secrets

2. **Version Already Exists / Version Conflicts**
   - Error: `403 Forbidden` - You cannot publish over the previously published versions
   - **Solution**: The workflow now automatically detects version conflicts and resolves them:
     - Compares local package.json version with latest NPM version
     - Uses the higher version as base for calculations
     - Automatically increments to next available version if conflicts occur
     - Supports up to 5 retry attempts to find an available version
   - **Prevention**: Keep your local package.json version in sync with NPM releases

3. **Build Failures**
   - Check the build logs in GitHub Actions
   - Ensure all dependencies are properly installed
   - Verify TypeScript compilation passes

4. **Test Failures**
   - Tests must pass before publishing
   - Fix failing tests and push again
   - Check test output in the Actions logs

### Manual Recovery

If you need to manually publish or fix a version:

```bash
# Build the library
npm run build:lib

# Navigate to dist folder
cd dist/ng-panel

# Update version manually (if needed)
npm version patch  # or minor, major

# Publish manually
npm publish --access public

# Create git tag
git tag -a "v$(node -p "require('./package.json').version")" -m "Manual release"
git push origin --tags
```

## Security Considerations

1. **NPM Token**: Keep your NPM token secure and rotate it regularly
2. **Branch Protection**: Consider adding branch protection rules for the `prod` branch
3. **Review Process**: Ensure proper code review before merging to `prod`

## Monitoring and Maintenance

- **Monitor workflow runs** in the GitHub Actions tab
- **Check NPM download statistics** on the NPM package page
- **Review and update dependencies** regularly
- **Update documentation** when workflow changes are made

## Support

For issues with the CI/CD pipeline:
1. Check the GitHub Actions logs for detailed error messages
2. Verify all prerequisites are met
3. Test the build process locally first
4. Create an issue in the repository with workflow logs attached
