import { authenticatedPage } from '@/utils/authenticatedPage';
import { GetServerSideProps } from 'next';

export default function Dashboard() {
  return (
    <div>
      <h1>Teste</h1>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = authenticatedPage(async (ctx) => {
  return {
    props: {},
  };
});
