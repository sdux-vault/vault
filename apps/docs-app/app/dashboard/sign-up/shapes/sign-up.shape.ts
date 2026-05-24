/**
 * SignUpShape
 *
 * @description Payload sent to the signup API endpoint
 */
export interface SignUpShape {
  /**
   * organizationName
   *
   * @description Name of the organization being created
   */
  organizationName: string;

  /**
   * fullName
   *
   * @description Full name of the administrator user
   */
  fullName: string;

  /**
   * email
   *
   * @description Email address of the administrator user
   */
  email: string;

  /**
   * password
   *
   * @description Password for the administrator user
   */
  password: string;

  /**
   * domain
   *
   * @description Primary licensed domain
   */
  domain: string;
}
