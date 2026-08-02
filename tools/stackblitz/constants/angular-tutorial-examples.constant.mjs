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
    ['display-character', 'display-character-example'],
    ['display-characters', 'display-characters-example'],
    ['add-edit-characters', 'add-edit-characters-example'],
    ['delete-characters', 'delete-characters-example'],
    ['lifecycle', 'lifecycle-tutorial-example'],
    ['filters-and-reducers', 'filters-and-reducers-tutorial-example'],
    ['errors', 'errors-tutorial-example'],
    ['async-input', 'async-input-tutorial-example'],
    ['delay', 'delay-tutorial-example'],
    ['encrypt-and-persist', 'encrypt-and-persist-tutorial-example'],
    ['state-introspection', 'state-introspection-tutorial-example'],
    ['tab-sync', 'tab-sync-tutorial-example']
  ].map(([directoryName, name]) => ({
    language: 'angular',
    directory: path.join(
      projectRoot,
      'apps/docs-app/app/docs/tutorial/angular/examples',
      directoryName
    ),
    name
  }));
