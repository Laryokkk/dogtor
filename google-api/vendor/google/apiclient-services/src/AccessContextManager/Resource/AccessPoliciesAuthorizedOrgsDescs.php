<?php
/*
 * Copyright 2014 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

namespace Google\Service\AccessContextManager\Resource;

use Google\Service\AccessContextManager\AuthorizedOrgsDesc;
use Google\Service\AccessContextManager\ListAuthorizedOrgsDescsResponse;
use Google\Service\AccessContextManager\Operation;

/**
 * The "authorizedOrgsDescs" collection of methods.
 * Typical usage is:
 *  <code>
 *   $accesscontextmanagerService = new Google\Service\AccessContextManager(...);
 *   $authorizedOrgsDescs = $accesscontextmanagerService->authorizedOrgsDescs;
 *  </code>
 */
class AccessPoliciesAuthorizedOrgsDescs extends \Google\Service\Resource
{
  /**
   * Creates a authorized orgs desc. The long-running operation from this RPC has
   * a successful status after the authorized orgs desc propagates to long-lasting
   * storage. If a authorized orgs desc contains errors, an error response is
   * returned for the first error encountered. The name of this
   * `AuthorizedOrgsDesc` will be assigned during creation.
   * (authorizedOrgsDescs.create)
   *
   * @param string $parent Required. Resource name for the access policy which
   * owns this Authorized Orgs Desc. Format: `accessPolicies/{policy_id}`
   * @param AuthorizedOrgsDesc $postBody
   * @param array $optParams Optional parameters.
   * @return Operation
   */
  public function create($parent, AuthorizedOrgsDesc $postBody, $optParams = [])
  {
    $params = ['parent' => $parent, 'postBody' => $postBody];
    $params = array_merge($params, $optParams);
    return $this->call('create', [$params], Operation::class);
  }
  /**
   * Deletes a authorized orgs desc based on the resource name. The long-running
   * operation from this RPC has a successful status after the authorized orgs
   * desc is removed from long-lasting storage. (authorizedOrgsDescs.delete)
   *
   * @param string $name Required. Resource name for the Authorized Orgs Desc.
   * Format:
   * `accessPolicies/{policy_id}/authorizedOrgsDesc/{authorized_orgs_desc_id}`
   * @param array $optParams Optional parameters.
   * @return Operation
   */
  public function delete($name, $optParams = [])
  {
    $params = ['name' => $name];
    $params = array_merge($params, $optParams);
    return $this->call('delete', [$params], Operation::class);
  }
  /**
   * Gets a authorized orgs desc based on the resource name.
   * (authorizedOrgsDescs.get)
   *
   * @param string $name Required. Resource name for the Authorized Orgs Desc.
   * Format:
   * `accessPolicies/{policy_id}/authorizedOrgsDescs/{authorized_orgs_descs_id}`
   * @param array $optParams Optional parameters.
   * @return AuthorizedOrgsDesc
   */
  public function get($name, $optParams = [])
  {
    $params = ['name' => $name];
    $params = array_merge($params, $optParams);
    return $this->call('get', [$params], AuthorizedOrgsDesc::class);
  }
  /**
   * Lists all authorized orgs descs for an access policy.
   * (authorizedOrgsDescs.listAccessPoliciesAuthorizedOrgsDescs)
   *
   * @param string $parent Required. Resource name for the access policy to list
   * Authorized Orgs Desc from. Format: `accessPolicies/{policy_id}`
   * @param array $optParams Optional parameters.
   *
   * @opt_param int pageSize Number of Authorized Orgs Descs to include in the
   * list. Default 100.
   * @opt_param string pageToken Next page token for the next batch of Authorized
   * Orgs Desc instances. Defaults to the first page of results.
   * @return ListAuthorizedOrgsDescsResponse
   */
  public function listAccessPoliciesAuthorizedOrgsDescs($parent, $optParams = [])
  {
    $params = ['parent' => $parent];
    $params = array_merge($params, $optParams);
    return $this->call('list', [$params], ListAuthorizedOrgsDescsResponse::class);
  }
  /**
   * Updates a authorized orgs desc. The long-running operation from this RPC has
   * a successful status after the authorized orgs desc propagates to long-lasting
   * storage. If a authorized orgs desc contains errors, an error response is
   * returned for the first error encountered. Only the organization list in
   * `AuthorizedOrgsDesc` can be updated. The name, authorization_type, asset_type
   * and authorization_direction cannot be updated. (authorizedOrgsDescs.patch)
   *
   * @param string $name Assigned by the server during creation. The last segment
   * has an arbitrary length and has only URI unreserved characters (as defined by
   * [RFC 3986 Section 2.3](https://tools.ietf.org/html/rfc3986#section-2.3)).
   * Should not be specified by the client during creation. Example:
   * "accessPolicies/122256/authorizedOrgs/b3-BhcX_Ud5N"
   * @param AuthorizedOrgsDesc $postBody
   * @param array $optParams Optional parameters.
   *
   * @opt_param string updateMask Required. Mask to control which fields get
   * updated. Must be non-empty.
   * @return Operation
   */
  public function patch($name, AuthorizedOrgsDesc $postBody, $optParams = [])
  {
    $params = ['name' => $name, 'postBody' => $postBody];
    $params = array_merge($params, $optParams);
    return $this->call('patch', [$params], Operation::class);
  }
}

// Adding a class alias for backwards compatibility with the previous class name.
class_alias(AccessPoliciesAuthorizedOrgsDescs::class, 'Google_Service_AccessContextManager_Resource_AccessPoliciesAuthorizedOrgsDescs');
