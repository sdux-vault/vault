#!/usr/bin/env node

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { EnterpriseDocsBuilder } from './build-enterprise-docs.class.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '../../../');

const builder = new EnterpriseDocsBuilder({
  root: projectRoot
});

builder.run();
