/**
 * Author(s): Diederik
 * Jira-task: 103 - NestJS oauth2 token afhandelen
 * Sprint: 2
 * Last modified: 11-05-2023
 */

export const jwtConfig = {
  global: true,
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
};
