import { ActiveUserType } from '@app/contracts';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Parameter decorator
export const ActiveUser = createParamDecorator(
  (field: keyof ActiveUserType | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user: ActiveUserType = request.user;
    return field ? user?.[field] : user;
  },
);
