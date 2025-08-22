#!/usr/bin/env node

/**
 * Test script to validate the version conflict resolution logic
 */

const { execSync } = require('child_process');
const semver = require('semver');

console.log('🔍 Testing version conflict resolution logic...\n');

// Simulate the workflow logic
function findAvailableVersion(baseVersion, bumpType) {
  console.log(`Testing with base version: ${baseVersion}, bump type: ${bumpType}`);
  
  // Calculate initial new version
  let newVersion = semver.inc(baseVersion, bumpType);
  console.log(`Initial calculated version: ${newVersion}`);
  
  // Check for version conflicts and resolve them
  let attempts = 0;
  const maxAttempts = 5;
  let finalVersion = newVersion;
  
  while (attempts < maxAttempts) {
    try {
      execSync(`npm view @enokdev/ng-panel@${finalVersion} version`, { stdio: 'ignore' });
      console.log(`⚠️  Version ${finalVersion} already exists on npm!`);
      finalVersion = semver.inc(finalVersion, 'patch');
      console.log(`Trying next version: ${finalVersion}`);
      attempts++;
    } catch (error) {
      console.log(`✅ Version ${finalVersion} is available`);
      break;
    }
  }
  
  if (attempts >= maxAttempts) {
    console.log(`❌ Error: Could not find available version after ${maxAttempts} attempts`);
    return null;
  }
  
  console.log(`Final version: ${finalVersion}\n`);
  return finalVersion;
}

// Test scenarios
const testScenarios = [
  { base: '0.1.5', bump: 'patch' },   // Should find 0.1.6
  { base: '0.1.5', bump: 'minor' },   // Should find 0.2.0
  { base: '0.1.5', bump: 'major' },   // Should find 1.0.0
];

for (const scenario of testScenarios) {
  const result = findAvailableVersion(scenario.base, scenario.bump);
  if (!result) {
    console.error('❌ Test failed!');
    process.exit(1);
  }
}

console.log('✅ All version conflict resolution tests passed!');