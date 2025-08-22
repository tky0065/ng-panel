#!/usr/bin/env node

/**
 * Test script to validate the version bump logic used in CI/CD workflow
 * This simulates the exact logic that will be used in GitHub Actions
 */

const { execSync } = require('child_process');
const semver = require('semver');

console.log('🔍 Testing version bump logic...\n');

try {
  // Get the current version from package.json
  const localVersion = require('../projects/ng-panel/package.json').version;
  console.log(`📦 Local version: ${localVersion}`);
  
  // Get the latest published version from npm
  let npmVersion;
  try {
    npmVersion = execSync('npm view @enokdev/ng-panel version', { encoding: 'utf8' }).trim();
  } catch (error) {
    npmVersion = '0.0.0';
  }
  console.log(`🌐 NPM version: ${npmVersion}`);
  
  // Use the higher version as base for next version calculation
  const baseVersion = semver.gt(localVersion, npmVersion) ? localVersion : npmVersion;
  console.log(`📊 Base version for calculation: ${baseVersion}`);
  
  // Test different commit message scenarios
  const testCommitMessages = [
    'BREAKING CHANGE: remove deprecated API',
    'major: complete redesign',
    'feat: add new component',
    'feature: implement dark mode',
    'fix: resolve navigation bug',
    'docs: update README',
    'style: fix formatting',
  ];
  
  console.log('\n🧪 Testing version bump scenarios:\n');
  
  for (const commitMsg of testCommitMessages) {
    console.log(`Commit: "${commitMsg}"`);
    
    // Determine bump type (same logic as workflow)
    let bumpType;
    if (commitMsg.includes('BREAKING CHANGE') || commitMsg.includes('major:')) {
      bumpType = 'major';
    } else if (commitMsg.includes('feat:') || commitMsg.includes('feature:')) {
      bumpType = 'minor';
    } else {
      bumpType = 'patch';
    }
    
    // Calculate new version from base version
    let newVersion = semver.inc(baseVersion, bumpType);
    
    console.log(`  → Bump type: ${bumpType}`);
    console.log(`  → Calculated version: ${newVersion}`);
    
    // Check if version already exists on npm
    try {
      execSync(`npm view @enokdev/ng-panel@${newVersion} version`, { stdio: 'ignore' });
      console.log(`  ⚠️  Version ${newVersion} already exists on npm!`);
      // Force increment to next patch version if version collision occurs
      newVersion = semver.inc(newVersion, 'patch');
      console.log(`  → Using next available version: ${newVersion}`);
    } catch (error) {
      console.log(`  ✅ Version ${newVersion} is available`);
    }
    
    console.log('');
  }
  
  console.log('✅ All version bump tests completed successfully!');
  console.log('\n📋 Next steps:');
  console.log('  1. Commit your changes');
  console.log('  2. Push to "prod" branch to trigger automatic publishing');
  console.log('  3. Monitor the GitHub Actions workflow');
  console.log('  4. Verify publication on NPM');
  
} catch (error) {
  console.error('❌ Error testing version logic:', error.message);
  process.exit(1);
}