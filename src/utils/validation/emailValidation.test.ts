/**
 * utils/validation/emailValidation.test.ts
 * ----------------------------------------
 * Test runner script for validateEmail utility.
 * Can be executed using: npx tsx src/utils/validation/emailValidation.test.ts
 */

import { validateEmail } from "./emailValidation";

interface TestCase {
  input: string;
  expectedValid: boolean;
  expectedSuggestion?: string;
  description: string;
}

const testCases: TestCase[] = [
  // --- Invalid email format cases from USER_REQUEST ---
  { input: "test", expectedValid: false, description: "Reject missing @ and domain" },
  { input: "test@", expectedValid: false, description: "Reject missing domain" },
  { input: "test@gmail", expectedValid: false, description: "Reject domain without dot and TLD" },
  { input: "test@.com", expectedValid: false, description: "Reject domain starting with dot" },
  { input: "@gmail.com", expectedValid: false, description: "Reject missing username" },
  { input: "test@@gmail.com", expectedValid: false, description: "Reject multiple @ symbols" },
  { input: "test gmail@gmail.com", expectedValid: false, description: "Reject spaces inside email" },

  // --- Edge cases to handle ---
  { input: "test..user@domain.com", expectedValid: false, description: "Reject double dots in username" },
  { input: "user@domain..com", expectedValid: false, description: "Reject double dots in domain" },
  { input: "user@-domain.com", expectedValid: false, description: "Reject domain starting with hyphen" },
  { input: "user@domain-.com", expectedValid: false, description: "Reject domain ending with hyphen" },
  { input: "user@domain.c", expectedValid: false, description: "Reject TLD shorter than 2 chars" },

  // --- Spaces trimming before/after ---
  { input: "  john@gmail.com  ", expectedValid: true, description: "Trim leading and trailing spaces" },
  { input: " \t john.doe@company.com \n ", expectedValid: true, description: "Trim other whitespace characters" },

  // --- Valid email formats from USER_REQUEST ---
  { input: "user@gmail.com", expectedValid: true, description: "Allow standard gmail format" },
  { input: "john.doe@company.com", expectedValid: true, description: "Allow username with dots and standard domain" },
  { input: "sales@avimpact.in", expectedValid: true, description: "Allow Indian TLD (.in)" },
  { input: "projects.team@company.co.in", expectedValid: true, description: "Allow multi-part TLD (.co.in)" },

  // --- Typo suggestion cases ---
  {
    input: "test@gmail.con",
    expectedValid: true,
    expectedSuggestion: "test@gmail.com",
    description: "Suggest gmail.com for gmail.con",
  },
  {
    input: "john@gamil.com",
    expectedValid: true,
    expectedSuggestion: "john@gmail.com",
    description: "Suggest gmail.com for gamil.com",
  },
  {
    input: "sales@yahoo.co",
    expectedValid: true,
    expectedSuggestion: "sales@yahoo.com",
    description: "Suggest yahoo.com for yahoo.co",
  },
  {
    input: "user@hotmail.co",
    expectedValid: true,
    expectedSuggestion: "user@hotmail.com",
    description: "Suggest hotmail.com for hotmail.co",
  },
];

function runTests() {
  console.log("=== STARTING EMAIL VALIDATION TESTS ===\n");
  let passedCount = 0;
  let failedCount = 0;

  testCases.forEach((tc, index) => {
    const result = validateEmail(tc.input);
    let success = true;

    if (result.isValid !== tc.expectedValid) {
      success = false;
      console.error(
        `FAIL: Test #${index + 1} - "${tc.description}"\n` +
        `  Input: "${tc.input}"\n` +
        `  Expected validity: ${tc.expectedValid}, Got: ${result.isValid}\n` +
        `  Error message: "${result.error || 'none'}"`
      );
    }

    if (success && tc.expectedSuggestion && result.suggestion !== tc.expectedSuggestion) {
      success = false;
      console.error(
        `FAIL: Test #${index + 1} - "${tc.description}" (Suggestion mismatch)\n` +
        `  Input: "${tc.input}"\n` +
        `  Expected suggestion: "${tc.expectedSuggestion}", Got: "${result.suggestion || 'none'}"`
      );
    }

    if (success) {
      passedCount++;
      console.log(`PASS: Test #${index + 1} - "${tc.description}" (Input: "${tc.input}")`);
    } else {
      failedCount++;
    }
  });

  console.log(`\n=== TEST SUMMARY ===`);
  console.log(`Total tests run: ${testCases.length}`);
  console.log(`Passed: ${passedCount}`);
  console.log(`Failed: ${failedCount}`);

  if (failedCount > 0) {
    console.error("\n❌ Some tests failed!");
    process.exit(1);
  } else {
    console.log("\n✅ All tests passed successfully!");
  }
}

runTests();
