import { SetMetadata } from '@nestjs/common';

// factory decorator function
export const AllowAnonymous = () => {
  // decorator function return
  return SetMetadata('isPublic', true);
};
// That returned decorator function is executed at definition time (not at runtime request handling), and it attaches the key/value metadata (isPublic: true) to the method or class’s execution context.
