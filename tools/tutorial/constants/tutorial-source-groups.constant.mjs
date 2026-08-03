import path from 'node:path';

/**
 * Returns the source groups used to generate the Angular tutorial source files.
 *
 * Directory groups collect every supported source file in an example directory.
 * File groups collect one standalone source file used by the introductory steps.
 *
 * @param {string} projectRoot - The root path of the project
 * @returns {Array<object>} The configured tutorial source groups
 */
export const TutorialSourceGroupsConstants = (projectRoot) => {
  const angularTutorialExamplesDirectory = path.join(
    projectRoot,
    'apps/docs-app/app/docs/tutorial/angular/examples'
  );

  const angularTutorialGeneratedDirectory = path.join(
    projectRoot,
    'apps/docs-app/app/docs/tutorial/angular/generated'
  );

  /**
   * The format is:
   * export name
   * source directory
   */
  const directorySourceGroups = [
    [
      'STAR_WARS_COMPLETE_CHARACTER_MANAGEMENT',
      'complete-character-management'
    ],
    ['STAR_WARS_DISPLAY_CHARACTER', 'display-character'],
    ['STAR_WARS_DISPLAY_CHARACTERS', 'display-characters'],
    ['STAR_WARS_ADD_EDIT_CHARACTERS', 'add-edit-characters'],
    ['STAR_WARS_DELETE_CHARACTERS', 'delete-characters'],
    ['STAR_WARS_LIFECYCLE_CHARACTERS', 'lifecycle'],
    ['STAR_WARS_FILTERS_AND_REDUCERS_CHARACTERS', 'filters-and-reducers'],
    ['STAR_WARS_ERRORS_CHARACTERS', 'errors'],
    ['STAR_WARS_ASYNC_INPUT', 'async-input'],
    ['STAR_WARS_DELAY', 'delay'],
    ['STAR_WARS_ENCRYPT_AND_PERSIST', 'encrypt-and-persist'],
    ['STAR_WARS_STATE_INTROSPECTION', 'state-introspection'],
    ['STAR_WARS_TAB_SYNC', 'tab-sync'],
    ['STAR_WARS_DISTINCT_UNTIL_CHANGED', 'distinct-until-changed']
  ].map(([exportName, directoryName]) => ({
    exportName,
    sourceDirectory: path.join(angularTutorialExamplesDirectory, directoryName),
    outputFile: path.join(
      angularTutorialGeneratedDirectory,
      `${directoryName}.generated.ts`
    )
  }));

  /**
   * The format is:
   * export name
   * source directory
   * output file.
   */
  const fileSourceGroups = [
    [
      'INITIAL_SERVICE',
      'service-creation/example.service.ts',
      'initial-service.generated.ts'
    ],
    [
      'INITIAL_APP_CONFIG',
      'initial-app-config/initial-app.config.ts',
      'initial-app-config.generated.ts'
    ]
  ].map(([exportName, sourceFile, generatedFileName]) => ({
    exportName,
    sourceFile: path.join(angularTutorialExamplesDirectory, sourceFile),
    outputFile: path.join(angularTutorialGeneratedDirectory, generatedFileName)
  }));

  return [...directorySourceGroups, ...fileSourceGroups];
};
