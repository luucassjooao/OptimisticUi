import { useUsers } from '@/app/hooks/useUsers';
import { Avatar, AvatarFallback, AvatarImage } from './ui/Avatar';
import { Switch } from './ui/Switch';
import { Skeleton } from './ui/Skeleton';
import { useUpdateUser } from '@/app/hooks/useUpdateUser';
import { cn } from '@/app/libs/utils';
// import { useMutationState } from '@tanstack/react-query';
// import { CREATE_USER_MUTATION_KEY } from '@/app/hooks/useCreateUser';
// import { IUser } from '@/app/types/IUser';

export function UsersList() {
  const {users, isLoading} = useUsers();
  const { updateUser } = useUpdateUser();

  // const pendingUsers = useMutationState({
  //   filters: {
  //     status: 'pending',
  //     mutationKey: CREATE_USER_MUTATION_KEY
  //   },
  //   select: mutation => mutation.state.variables as Omit<IUser, 'id'>,
  // });

  async function handleBlockCheckedChange(blocked: boolean, id: string) {
    await updateUser({ blocked, id });
  }

  return (
    <div className='space-y-4' >
      {isLoading && (
          <Skeleton className='h-[74px] ' />
      )}
      {users.map((user) => (
        <div
          key={user.id}
          className={cn(
            'border p-4 rounded-md4 flex items-center justify-between',
            user.status === 'pending' && 'opacity-70',
            user.status === 'error' && 'border-destructive bg-destructive/20'
          )}
        >
          <div className='flex items-center gap-4' >
            <Avatar>
              <AvatarImage src={`https://github.com/${user.username}.png`} />
              <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>

            <div>
              <strong className='text-lg block leading-4'>{user.name}</strong>
              <strong className='text-muted-foreground' >@{user.username}</strong>
            </div>
          </div>

          <Switch
            checked={user.blocked}
            onCheckedChange={(blocked) => handleBlockCheckedChange(blocked, user.id)}
            disabled={user.status === ('pending' || 'error')}
          />
        </div>
      ))}
      {/* {pendingUsers.map((user) => (
        <div
        key={Math.random()}
        className='border p-4 rounded-md4 flex items-center justify-between'
        >
          <div className='flex items-center gap-4' >
            <Avatar>
              <AvatarImage src={`https://github.com/${user.username}.png`} />
              <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>

            <div>
              <strong className='text-lg block leading-4'>{user.name}</strong>
              <strong className='text-muted-foreground' >@{user.username}</strong>
            </div>
          </div>

          <Switch
            checked={user.blocked}
            disabled
          />
        </div>
      ))} */}
    </div>
  );
}
