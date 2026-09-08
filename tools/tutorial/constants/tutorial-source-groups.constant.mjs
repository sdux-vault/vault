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
    ['STAR_WARS_DISPLAY_CHARACTER_FILES', '02-display-character'],
    ['STAR_WARS_DISPLAY_CHARACTERS_FILES', '03-display-characters'],
    ['STAR_WARS_ADD_EDIT_CHARACTERS_FILES', '04-add-edit-characters'],
    ['STAR_WARS_DELETE_CHARACTERS_FILES', '05-delete-characters'],
    ['STAR_WARS_LIFECYCLE_FILES', '06-lifecycle'],
    ['STAR_WARS_FILTER_AND_REDUCER_FILES', '07-filters-and-reducers'],
    ['STAR_WARS_ERROR_FILES', '08-errors'],
    ['STAR_WARS_ASYNC_INPUT_FILES', '09-async-input'],
    ['STAR_WARS_DELAY_FILES', '10-delay'],
    ['STAR_WARS_ENCRYPT_AND_PERSIST_FILES', '11-encrypt-and-persist'],
    ['STAR_WARS_STATE_INTROSPECTION_FILES', '12-state-introspection'],
    ['STAR_WARS_TAB_SYNC_FILES', '13-tab-sync'],
    ['STAR_WARS_DISTINCT_UNTIL_CHANGED_FILES', '14-distinct-until-changed'],
    ['STAR_WARS_STEPWISE_FILES', '15-stepwise']
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
