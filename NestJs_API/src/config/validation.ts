/**
 * Author(s): Diederik
 * Jira-task: 103 - NestJS oauth2 token afhandelen
 * Sprint: 2
 * Last modified: 11-05-2023
 */

import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('dev', 'prod'),
  SF_CLIENT_ID: Joi.string().required(),
  SF_CLIENT_SECRET: Joi.string().required(),
  SF_INSTANCE_URL: Joi.string().required(),
  BASE_URL: Joi.string().required(),
  MONGODB_URI: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().required(),
});
