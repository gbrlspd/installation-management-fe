import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { parseCookies } from 'nookies';

/* This function once called on a page allows only unauthenticated users to access it */
export function unauthenticatedPage<P>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);

    if (cookies['@installationmanagement.token']) {
      return {
        redirect: {
          destination: '/companies',
          permanent: false,
        },
      };
    }

    return await fn(ctx);
  };
}
