import { useRouter } from 'next/router';
import { Button } from '@/components/admin/ui/button';
import { Icons } from '@/components/icons';

export default function GithubSignInButton() {
  const router = useRouter();
  const callbackUrl = typeof router.query.callbackUrl === 'string' ? router.query.callbackUrl : null;

  return (
    <Button
      className='w-full'
      variant='outline'
      type='button'
      onClick={() => console.log('continue with github clicked')}
    >
      <Icons.github className='mr-2 h-4 w-4' />
      Continue with Github
    </Button>
  );
}
