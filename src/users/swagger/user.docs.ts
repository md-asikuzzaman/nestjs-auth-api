import { applyDecorators } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function GetMeDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get current user profile',
      description: 'Returns the authenticated user profile.',
    }),
    ApiOkResponse({
      description: 'User profile retrieved successfully.',
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized. Missing or invalid access token.',
    }),
  );
}

export function UpdateMeDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update current user profile',
      description: 'Updates the authenticated user profile.',
    }),
    ApiOkResponse({
      description: 'User profile updated successfully.',
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized. Missing or invalid access token.',
    }),
  );
}

export function ChangePasswordDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Change user password',
      description: 'Changes the password of the authenticated user.',
    }),
    ApiOkResponse({
      description: 'Password changed successfully.',
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized. Missing or invalid access token.',
    }),
  );
}
