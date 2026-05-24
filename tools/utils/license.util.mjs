// --- AI Model File Path (DO NOT DELETE) ---
// FilePath: tools > utils > license.util.mjs
// Updated: 2026-03-25
// --- END AI MODEL FILE PATH ---

// Import license constants (single source of truth)
import { MIT_LICENSE_1_0 } from '../../apps/docs-app/app/docs/top-tier/license/sdux-license/constants/mit-license-1.0.mjs';
import { NGL_COMMERCIAL_LICENSE_1_0 } from '../../apps/docs-app/app/docs/top-tier/license/sdux-license/constants/ngl-commercial-license-1.0.mjs';
import { SDUX_VAULT_COMMUNITY_LICENSE_1_0 } from '../../apps/docs-app/app/docs/top-tier/license/sdux-license/constants/ngl-vault-community-license-1.0.mjs';

export const LicenseUtil = {
  /**
   * MIT License (with SDuX clarification)
   */
  mit() {
    return MIT_LICENSE_1_0;
  },

  /**
   * NGL Commercial License
   */
  commercial() {
    return NGL_COMMERCIAL_LICENSE_1_0;
  },

  /**
   * SDuX Vault Community License
   */
  community() {
    return SDUX_VAULT_COMMUNITY_LICENSE_1_0;
  },

  /**
   * Generic loader (string-based key)
   */
  load(type) {
    switch (type) {
      case 'mit':
        return this.mit();
      case 'commercial':
        return this.commercial();
      case 'community':
        return this.community();
      default:
        throw new Error(`Unknown license type: ${type}`);
    }
  }
};
