import { FileBuilderApiTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-api.type';
import { FileBuilderArgStyleTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-arg-style.type';
import { FileBuilderCallStyleTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-call-style.type';
import { FileBuilderEmitTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-emit.type';
import { FileBuilderRoleTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-role.type';
import { FileBuilderTargetTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-target.type';
import { PipelineEncryptAes256BehaviorComponent } from '../../../../../../docs/pipeline/behaviors/components/encrypt/aes-256/aes-256.behavior.component';
import { BehaviorDefinitionShape } from '../../../../../shapes/behavior-definition.shape';
import { BehaviorIdTypes } from '../../../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../../../types/id/stage-id.type';

export const PipelineBuilderAes256EncryptConstant: BehaviorDefinitionShape = {
  /** Stable identifier */
  id: BehaviorIdTypes.WithAes256EncryptBehavior,

  /** Owning stage */
  parentId: StageIdTypes.Encrypt,

  /** UI label */
  label: 'AES-256 Encrypt',

  question:
    'Do you want to protect persisted FeatureCell state using AES-256-GCM encryption?',

  description:
    'Encrypts finalized pipeline output using AES-256-GCM before persistence and decrypts during hydration. Operates strictly at the persistence boundary and never modifies in-memory state.',

  /**
   * AES-256 configuration parameters
   */
  params: [
    {
      key: 'aes256Secret',
      label: 'Encryption Secret',
      type: 'string',
      defaultValue: 'my-insecure-secret',
      optional: false,
      hint: 'Engineer-supplied secret used for PBKDF2 key derivation. Must be non-empty.',
      placeholder: 'my-strong-secret'
    },
    {
      key: 'salt',
      label: 'Salt (Uint8Array)',
      type: 'string',
      defaultValue: 'this.vault.generateSalt()',
      optional: false,
      hint: 'Cryptographic salt (minimum 16 bytes). Use generateSalt() or supply a stable stored value.'
    },
    {
      key: 'iterations',
      label: 'PBKDF2 Iterations',
      type: 'number',
      defaultValue: 250000,
      optional: false,
      hint: 'Must be between 100,000 and 5,000,000. Higher values increase brute-force resistance.'
    }
  ],

  /** Documentation renderer */
  documentationComponentReference: PipelineEncryptAes256BehaviorComponent,

  /** AI Assist snippet */

  /**
   * ─────────────────────────────
   * Code emission metadata
   * ─────────────────────────────
   */
  code: [
    {
      target: FileBuilderTargetTypes.FeatureCell,
      api: FileBuilderApiTypes.Behaviors,
      emit: FileBuilderEmitTypes.Reference,
      symbol: 'withAes256EncryptBehavior',
      role: FileBuilderRoleTypes.Structural,
      import: '@sdux-vault/addons',
      order: 0
    },
    {
      target: FileBuilderTargetTypes.Vault,
      api: FileBuilderApiTypes.Encrypt,
      emit: FileBuilderEmitTypes.Call,
      symbol: 'setAes256Secret',
      role: FileBuilderRoleTypes.Functional,
      callStyle: FileBuilderCallStyleTypes.Fluent,
      argStyle: FileBuilderArgStyleTypes.Object,
      order: 1
    }
  ]
};
