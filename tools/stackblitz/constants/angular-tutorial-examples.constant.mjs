import path from 'node:path';

/**
 *
 * Format is directoryName, name
 *
 * directoryName is the name of the folder in apps/docs-app/app/docs/tutorial/angular/examples
 * name is the name of the StackBlitz project to be generated
 *
 * @param {string} projectRoot - The root path of the project
 * @returns {Array<{language: string, directory: string, name: string}>} - An array of configured examples  
 */
export const AngularTutorialExamplesConstants = (projectRoot) =>
  [
    ['02-display-character', 'display-character-example'],
    ['03-display-characters', 'display-characters-example'],
    ['04-add-edit-characters', 'add-edit-characters-example'],
    ['05-delete-characters', 'delete-characters-example'],
    ['06-lifecycle', 'lifecycle-tutorial-example'],
    ['07-filters-and-reducers', 'filters-and-reducers-tutorial-example'],
    ['08-errors', 'errors-tutorial-example'],
    ['09-async-input', 'async-input-tutorial-example'],
    ['10-delay', 'delay-tutorial-example'],
    ['11-encrypt-and-persist', 'encrypt-and-persist-tutorial-example'],
    ['12-state-introspection', 'state-introspection-tutorial-example'],
    ['13-tab-sync', 'tab-sync-tutorial-example'],
    ['stepwise', 'stepwise-tutorial-example'],
    ['distinct-until-changed', 'distinct-until-changed-tutorial-example']
  ].map(([directoryName, name]) => ({
    language: 'angular',
    directory: path.join(
      projectRoot,
      'apps/docs-app/app/docs/tutorial/angular/examples',
      directoryName
    ),
    name
  }));
