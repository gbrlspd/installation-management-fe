import { AuthTokenError } from '@/services/errors/AuthTokenError';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { parseCookies, destroyCookie } from 'nookies';

/* This function once called on a page allows only authenticated users to access it */
export function authenticatedPage<P>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    const token = cookies['@installationmanagement.token'];

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    try {
      return await fn(ctx);
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, '@installationmanagement.token');

        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }
    }
  };
}
